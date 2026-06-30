"""Content deduplication and quality scoring."""
from typing import List, Dict, Tuple
import logging
from difflib import SequenceMatcher

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ContentDeduplicator:
    """Detect and remove duplicate/similar content chunks."""

    def __init__(self, similarity_threshold: float = 0.85):
        """
        Initialize deduplicator.

        Args:
            similarity_threshold: Threshold for considering chunks duplicate (0-1)
        """
        self.similarity_threshold = similarity_threshold
        self.stats = {
            "total_chunks": 0,
            "duplicates_removed": 0,
            "unique_chunks": 0
        }

    def deduplicate(self, chunks: List[Dict]) -> Tuple[List[Dict], Dict]:
        """
        Deduplicate similar chunks using Jaccard similarity.

        Args:
            chunks: List of chunk dictionaries with 'text' field

        Returns:
            Tuple of (deduplicated_chunks, statistics)
        """
        self.stats["total_chunks"] = len(chunks)
        logger.info(f"Deduplicating {len(chunks)} chunks (threshold: {self.similarity_threshold})")

        # Track which chunks to keep
        keep_indices = set(range(len(chunks)))
        removed_pairs = []

        # Compare all chunks
        for i in range(len(chunks)):
            if i not in keep_indices:
                continue

            for j in range(i + 1, len(chunks)):
                if j not in keep_indices:
                    continue

                # Calculate similarity
                similarity = self._jaccard_similarity(
                    chunks[i]["text"],
                    chunks[j]["text"]
                )

                # If too similar, mark for removal
                if similarity >= self.similarity_threshold:
                    keep_indices.discard(j)
                    removed_pairs.append({
                        "removed_index": j,
                        "duplicate_of": i,
                        "similarity": similarity
                    })
                    logger.debug(f"Removing chunk {j} (similar to {i}, {similarity:.2%})")

        # Build deduplicated list
        deduplicated = [chunks[i] for i in sorted(keep_indices)]

        self.stats["duplicates_removed"] = len(chunks) - len(deduplicated)
        self.stats["unique_chunks"] = len(deduplicated)

        logger.info(f"Deduplication complete: {len(deduplicated)} unique chunks "
                   f"({self.stats['duplicates_removed']} removed, "
                   f"{100 * self.stats['duplicates_removed'] / len(chunks):.1f}%)")

        return deduplicated, {
            **self.stats,
            "removed_pairs": removed_pairs
        }

    def _jaccard_similarity(self, text1: str, text2: str) -> float:
        """
        Calculate Jaccard similarity between two texts.

        Higher = more similar. Range: 0-1

        Args:
            text1: First text
            text2: Second text

        Returns:
            Similarity score (0-1)
        """
        # Tokenize into words
        set1 = set(text1.lower().split())
        set2 = set(text2.lower().split())

        if not set1 or not set2:
            return 0.0

        # Jaccard = intersection / union
        intersection = len(set1 & set2)
        union = len(set1 | set2)

        return intersection / union if union > 0 else 0.0

    def score_quality(self, chunk: Dict) -> Dict:
        """
        Score the quality of a chunk.

        Args:
            chunk: Chunk dictionary

        Returns:
            Quality score (0-100) with breakdown
        """
        text = chunk.get("text", "")
        scores = {}

        # Length score (prefer 200-2000 words)
        word_count = len(text.split())
        if 200 <= word_count <= 2000:
            scores["length"] = 100
        elif 100 <= word_count < 200 or 2000 < word_count <= 3000:
            scores["length"] = 75
        else:
            scores["length"] = 50

        # Readability score (look for sentence structure)
        sentences = text.count(". ") + text.count("! ") + text.count("? ")
        if word_count > 0 and sentences > 0:
            avg_sentence_length = word_count / sentences
            if 10 <= avg_sentence_length <= 25:
                scores["readability"] = 100
            else:
                scores["readability"] = 75
        else:
            scores["readability"] = 50

        # Uniqueness (whether source is unique)
        unique_source_types = len(set([
            chunk.get("source", "unknown"),
            chunk.get("metadata", {}).get("platform", "unknown")
        ]))
        scores["uniqueness"] = 100 if unique_source_types > 1 else 75

        # Metadata completeness
        has_url = bool(chunk.get("url"))
        has_source = bool(chunk.get("source"))
        completeness = sum([has_url, has_source]) / 2 * 100
        scores["metadata"] = completeness

        # Overall score (weighted average)
        overall = (
            scores.get("length", 50) * 0.25 +
            scores.get("readability", 50) * 0.25 +
            scores.get("uniqueness", 50) * 0.25 +
            scores.get("metadata", 50) * 0.25
        )

        return {
            "overall_score": int(overall),
            "breakdown": scores,
            "quality_tier": self._get_quality_tier(overall)
        }

    def _get_quality_tier(self, score: float) -> str:
        """Get quality tier from score."""
        if score >= 90:
            return "excellent"
        elif score >= 75:
            return "good"
        elif score >= 60:
            return "fair"
        else:
            return "poor"


# CLI Usage
if __name__ == "__main__":
    import json

    print("\n" + "="*60)
    print("DEDUPLICATOR - Content Quality")
    print("="*60)

    # Mock chunks for testing
    test_chunks = [
        {"text": "The Seven Stages of Selling are: prospecting, qualifying, presenting, objection handling, closing, follow-up, referrals.", "source": "book"},
        {"text": "The 7 Stages: prospecting, qualifying, presenting, overcoming objections, closing, following up, referrals.", "source": "course"},
        {"text": "Always remember to follow up after closing. This is when you earn the referral.", "source": "podcast"},
        {"text": "Following up after closing is crucial for getting referrals and repeat business.", "source": "youtube"},
    ]

    deduplicator = ContentDeduplicator(similarity_threshold=0.85)

    # Deduplicate
    deduplicated, stats = deduplicator.deduplicate(test_chunks)

    print(f"\nDeduplication Results:")
    print(f"  Original: {stats['total_chunks']}")
    print(f"  Unique: {stats['unique_chunks']}")
    print(f"  Removed: {stats['duplicates_removed']} ({100 * stats['duplicates_removed'] / stats['total_chunks']:.1f}%)")

    # Score quality
    print(f"\nQuality Scores:")
    for idx, chunk in enumerate(deduplicated, 1):
        quality = deduplicator.score_quality(chunk)
        print(f"  Chunk {idx}: {quality['overall_score']} ({quality['quality_tier']})")
