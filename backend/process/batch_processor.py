"""Batch processing pipeline for 500K+ words at scale."""
import json
import time
from typing import List, Dict, Optional, Callable
from multiprocessing import Pool, cpu_count
from pathlib import Path
import logging

from process.chunker import chunk_content
from process.embedder import embed_batch

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class BatchProcessor:
    """Process large content collections efficiently."""

    def __init__(self, batch_size: int = 100, num_workers: Optional[int] = None):
        """
        Initialize batch processor.

        Args:
            batch_size: Number of items per batch
            num_workers: Number of parallel workers (default: CPU count - 1)
        """
        self.batch_size = batch_size
        self.num_workers = num_workers or max(1, cpu_count() - 1)
        self.stats = {
            "total_items": 0,
            "processed_items": 0,
            "failed_items": 0,
            "total_chunks": 0,
            "total_words": 0,
            "start_time": None,
            "end_time": None
        }

    def process_content_batch(
        self,
        content_items: List[Dict],
        checkpoint_file: Optional[str] = None,
        resume_from_checkpoint: bool = False
    ) -> Dict:
        """
        Process a batch of content items through full pipeline.

        Args:
            content_items: List of content dictionaries
            checkpoint_file: Path to save checkpoints
            resume_from_checkpoint: Resume from previous run

        Returns:
            Processing results dictionary
        """
        self.stats["total_items"] = len(content_items)
        self.stats["start_time"] = time.time()

        logger.info(f"Starting batch processing: {len(content_items)} items")
        logger.info(f"Using {self.num_workers} workers")

        # Load checkpoint if resuming
        processed_ids = set()
        if resume_from_checkpoint and checkpoint_file:
            processed_ids = self._load_checkpoint(checkpoint_file)
            logger.info(f"Resuming from checkpoint: {len(processed_ids)} already processed")

        # Process in batches
        results = {
            "processed_items": [],
            "failed_items": [],
            "chunk_count": 0,
            "word_count": 0
        }

        for batch_start in range(0, len(content_items), self.batch_size):
            batch_end = min(batch_start + self.batch_size, len(content_items))
            batch = content_items[batch_start:batch_end]

            logger.info(f"\nProcessing batch {batch_start//self.batch_size + 1}/{(len(content_items) + self.batch_size - 1)//self.batch_size}")

            # Filter out already processed items
            batch_to_process = [
                item for item in batch
                if item.get("source_id") not in processed_ids
            ]

            if not batch_to_process:
                logger.info("  → All items in batch already processed")
                continue

            # Process batch
            batch_results = self._process_batch(batch_to_process)

            results["processed_items"].extend(batch_results["processed"])
            results["failed_items"].extend(batch_results["failed"])
            results["chunk_count"] += batch_results["chunk_count"]
            results["word_count"] += batch_results["word_count"]

            # Update stats
            self.stats["processed_items"] += len(batch_results["processed"])
            self.stats["failed_items"] += len(batch_results["failed"])
            self.stats["total_chunks"] += batch_results["chunk_count"]
            self.stats["total_words"] += batch_results["word_count"]

            # Save checkpoint
            if checkpoint_file:
                processed_ids.update([item["source_id"] for item in batch_results["processed"]])
                self._save_checkpoint(checkpoint_file, processed_ids)

            # Rate limiting between batches
            time.sleep(0.5)

        self.stats["end_time"] = time.time()

        self._print_summary(results)

        return results

    def _process_batch(self, items: List[Dict]) -> Dict:
        """
        Process a single batch of items.

        Args:
            items: Batch of content items

        Returns:
            Processing results
        """
        processed = []
        failed = []
        total_chunks = 0
        total_words = 0

        for item in items:
            try:
                # Extract content
                text = item.get("text", "")
                if not text:
                    failed.append({
                        "item": item,
                        "error": "No text content"
                    })
                    continue

                # Chunk content
                chunks = chunk_content(text)
                if not chunks:
                    failed.append({
                        "item": item,
                        "error": "Failed to chunk content"
                    })
                    continue

                # Create chunk records with metadata
                chunk_records = []
                for idx, chunk_text in enumerate(chunks):
                    chunk_records.append({
                        "source_id": item.get("source_id"),
                        "chunk_index": idx,
                        "text": chunk_text,
                        "source": item.get("source"),
                        "title": item.get("title"),
                        "url": item.get("url"),
                        "metadata": item.get("metadata", {}),
                        "word_count": len(chunk_text.split())
                    })

                total_chunks += len(chunk_records)
                total_words += len(text.split())

                processed.append({
                    "source_id": item.get("source_id"),
                    "chunks": chunk_records,
                    "chunk_count": len(chunk_records),
                    "text_length": len(text)
                })

            except Exception as e:
                logger.error(f"Error processing {item.get('source_id')}: {e}")
                failed.append({
                    "item": item,
                    "error": str(e)
                })

        return {
            "processed": processed,
            "failed": failed,
            "chunk_count": total_chunks,
            "word_count": total_words
        }

    def _save_checkpoint(self, filepath: str, processed_ids: set):
        """Save progress checkpoint."""
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, "w") as f:
            json.dump(list(processed_ids), f)

    def _load_checkpoint(self, filepath: str) -> set:
        """Load progress checkpoint."""
        if not Path(filepath).exists():
            return set()
        with open(filepath, "r") as f:
            return set(json.load(f))

    def _print_summary(self, results: Dict):
        """Print processing summary."""
        print(f"\n{'='*60}")
        print("BATCH PROCESSING COMPLETE")
        print(f"{'='*60}")
        print(f"Total Items: {self.stats['total_items']}")
        print(f"Successfully Processed: {self.stats['processed_items']}")
        print(f"Failed: {self.stats['failed_items']}")
        print(f"Total Chunks Created: {results['chunk_count']}")
        print(f"Total Words Processed: {results['word_count']:,}")
        print(f"Time Elapsed: {self.stats['end_time'] - self.stats['start_time']:.1f}s")
        print(f"{'='*60}")

    def export_results(self, results: Dict, output_file: str = "batch_results.json"):
        """Export processing results."""
        with open(output_file, "w") as f:
            json.dump(results, f, indent=2)
        logger.info(f"Results exported to {output_file}")

    def export_stats(self, output_file: str = "batch_stats.json"):
        """Export processing statistics."""
        stats = {
            **self.stats,
            "duration_seconds": self.stats["end_time"] - self.stats["start_time"] if self.stats["end_time"] else None,
            "success_rate": f"{(self.stats['processed_items'] / self.stats['total_items'] * 100):.1f}%" if self.stats['total_items'] > 0 else "N/A"
        }
        with open(output_file, "w") as f:
            json.dump(stats, f, indent=2)
        logger.info(f"Stats exported to {output_file}")


class ContentDeduplicator:
    """Detect and merge duplicate/similar content."""

    def __init__(self, similarity_threshold: float = 0.95):
        """
        Initialize deduplicator.

        Args:
            similarity_threshold: Threshold for considering content duplicate (0-1)
        """
        self.similarity_threshold = similarity_threshold

    def deduplicate(self, chunks: List[Dict]) -> List[Dict]:
        """
        Deduplicate similar chunks.

        Args:
            chunks: List of chunk dictionaries

        Returns:
            Deduplicated list
        """
        # Placeholder for actual deduplication logic
        # Could use approximate matching (fuzzy), LSH, or embedding similarity
        logger.info(f"Deduplicating {len(chunks)} chunks (threshold: {self.similarity_threshold})")

        # For now, just return as-is
        # TODO: Implement Jaccard similarity or embedding-based dedup
        return chunks


# CLI
if __name__ == "__main__":
    import sys

    # Example usage
    processor = BatchProcessor(batch_size=50, num_workers=4)

    # Mock content (replace with actual)
    mock_content = [
        {
            "source_id": f"test_{i}",
            "title": f"Test Content {i}",
            "text": "sample text " * 500,  # ~500 words
            "source": "test",
            "url": "http://example.com"
        }
        for i in range(10)
    ]

    # Process
    results = processor.process_content_batch(
        mock_content,
        checkpoint_file="checkpoints/batch_progress.json"
    )

    # Export
    processor.export_results(results)
    processor.export_stats()
