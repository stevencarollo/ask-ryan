"""Load processed content into Supabase database."""
import json
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DatabaseLoader:
    """Load content chunks into Supabase."""

    def __init__(self, db=None):
        """Initialize loader with optional Supabase client."""
        self.db = db
        self.stats = {
            "content_inserted": 0,
            "chunks_inserted": 0,
            "errors": 0
        }

    def load_content_batch(self, content_items: List[Dict]) -> int:
        """
        Load content metadata to database.

        Args:
            content_items: List of content dictionaries

        Returns:
            Number of items inserted
        """
        if not self.db:
            logger.warning("No database configured - skipping content insert")
            return 0

        inserted = 0

        for item in content_items:
            try:
                record = {
                    "source": item.get("source", "unknown"),
                    "source_id": item.get("source_id", ""),
                    "title": item.get("title", ""),
                    "excerpt": item.get("text", "")[:2000],
                    "full_url": item.get("url", ""),
                    "source_type": item.get("source", "unknown"),
                    "platform": item.get("metadata", {}).get("platform", "unknown")
                }

                self.db.table("content").upsert(record).execute()
                inserted += 1
                self.stats["content_inserted"] += 1

            except Exception as e:
                logger.error(f"Error inserting content: {e}")
                self.stats["errors"] += 1

        return inserted

    def load_chunks_batch(self, chunks: List[Dict]) -> int:
        """
        Load chunks with embeddings to database.

        Args:
            chunks: List of chunk dictionaries with embeddings

        Returns:
            Number of chunks inserted
        """
        if not self.db:
            logger.warning("No database configured - skipping chunks insert")
            return 0

        inserted = 0

        for chunk in chunks:
            try:
                record = {
                    "content_id": chunk.get("content_id"),
                    "chunk_index": chunk.get("chunk_index", 0),
                    "text": chunk.get("text", ""),
                    "embedding": chunk.get("embedding"),
                    "word_count": len(chunk.get("text", "").split()),
                    "topics": chunk.get("topics", []),
                    "topic_confidence": chunk.get("topic_confidence", 0),
                    "quality_score": chunk.get("quality_score", 50)
                }

                self.db.table("chunks").insert(record).execute()
                inserted += 1
                self.stats["chunks_inserted"] += 1

            except Exception as e:
                logger.error(f"Error inserting chunk: {e}")
                self.stats["errors"] += 1

        return inserted

    def get_stats(self) -> Dict:
        """Get load statistics."""
        return {
            **self.stats,
            "total_inserted": self.stats["content_inserted"] + self.stats["chunks_inserted"]
        }


class CSVExporter:
    """Export chunks to CSV for manual inspection/import."""

    @staticmethod
    def export_chunks(chunks: List[Dict], filename: str = "chunks_export.csv") -> str:
        """
        Export chunks to CSV format.

        Args:
            chunks: List of chunks
            filename: Output filename

        Returns:
            Filename written
        """
        import csv

        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=[
                'source_id', 'chunk_index', 'text', 'topics',
                'quality_score', 'word_count', 'source'
            ])

            writer.writeheader()

            for chunk in chunks:
                writer.writerow({
                    'source_id': chunk.get('source_id', ''),
                    'chunk_index': chunk.get('chunk_index', 0),
                    'text': chunk.get('text', '')[:500],  # Truncate for CSV
                    'topics': '|'.join(chunk.get('topics', [])),
                    'quality_score': chunk.get('quality_score', 0),
                    'word_count': len(chunk.get('text', '').split()),
                    'source': chunk.get('source', '')
                })

        logger.info(f"Exported {len(chunks)} chunks to {filename}")
        return filename


if __name__ == "__main__":
    print("\n" + "="*60)
    print("DATABASE LOADER - Supabase Upload")
    print("="*60)

    # Example usage (without real DB)
    print("\nExample usage:")
    print("  loader = DatabaseLoader(db)")
    print("  loader.load_content_batch(content_items)")
    print("  loader.load_chunks_batch(chunks)")
    print("  print(loader.get_stats())")

    print("\nCSV Export:")
    print("  exporter = CSVExporter()")
    print("  exporter.export_chunks(chunks)")
