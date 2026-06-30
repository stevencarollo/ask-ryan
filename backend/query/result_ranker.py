"""Task 13-14: Topic filtering and citation ranking."""
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TopicFilter:
    """Task 13: Filter results by topic interests."""

    TOPIC_KEYWORDS = {
        "sales_fundamentals": ["seven stages", "prospecting", "qualifying"],
        "objection_handling": ["objection", "overcome", "concern"],
        "negotiation": ["negotiate", "price", "terms"],
        "closing": ["close", "ask for", "commitment"],
        "personal_brand": ["brand", "hook", "memorable"],
        "follow_up": ["follow up", "relationship", "referral"],
    }

    @classmethod
    def filter_by_topics(cls,
                         chunks: List[Dict],
                         desired_topics: List[str]) -> List[Dict]:
        """Filter chunks to only include desired topics."""
        if not desired_topics:
            return chunks

        filtered = []

        for chunk in chunks:
            chunk_topics = set(chunk.get("topics", []))

            if chunk_topics & set(desired_topics):
                filtered.append(chunk)

        logger.info(f"Topic filter: {len(chunks)} → {len(filtered)} chunks")
        return filtered

    @classmethod
    def extract_topics_from_query(cls, query: str) -> List[str]:
        """Extract likely topics from user query."""
        query_lower = query.lower()
        found_topics = []

        for topic, keywords in cls.TOPIC_KEYWORDS.items():
            if any(kw in query_lower for kw in keywords):
                found_topics.append(topic)

        return found_topics


class CitationRanker:
    """Task 14: Rank citations by quality and relevance."""

    def __init__(self):
        """Initialize ranker."""
        self.weights = {
            "quality_score": 0.3,
            "relevance": 0.4,
            "recency": 0.2,
            "authority": 0.1
        }

    def rank_citations(self, chunks: List[Dict]) -> List[Dict]:
        """
        Rank citations by multiple factors.

        Args:
            chunks: List of retrieved chunks

        Returns:
            Chunks sorted by citation quality score
        """
        ranked = []

        for chunk in chunks:
            score = self._calculate_citation_score(chunk)
            chunk_copy = chunk.copy()
            chunk_copy["citation_score"] = score
            ranked.append(chunk_copy)

        ranked.sort(key=lambda x: x["citation_score"], reverse=True)
        logger.info(f"Ranked {len(ranked)} citations")
        return ranked

    def _calculate_citation_score(self, chunk: Dict) -> float:
        """Calculate composite citation score (0-100)."""
        scores = {
            "quality_score": chunk.get("quality_score", 50),
            "relevance": self._get_relevance_score(chunk),
            "recency": self._get_recency_score(chunk),
            "authority": self._get_authority_score(chunk)
        }

        weighted_score = sum(
            scores[key] * self.weights[key]
            for key in self.weights
        )

        return min(100, weighted_score)

    def _get_relevance_score(self, chunk: Dict) -> float:
        """Calculate relevance score (0-100)."""
        # Higher if has multiple topics
        topics = chunk.get("topics", [])
        topic_confidence = chunk.get("topic_confidence", 0)

        relevance = (len(topics) / 12 * 50) + (topic_confidence * 50)
        return min(100, relevance)

    def _get_recency_score(self, chunk: Dict) -> float:
        """Calculate recency score (0-100)."""
        # All chunks equally recent (no timestamp)
        return 80.0

    def _get_authority_score(self, chunk: Dict) -> float:
        """Calculate authority score based on source (0-100)."""
        source = chunk.get("source", "unknown").lower()

        scores = {
            "book": 95,
            "course": 90,
            "podcast": 85,
            "blog": 75,
            "youtube": 80,
            "unknown": 50
        }

        return scores.get(source, 50)

    def get_top_citations(self, chunks: List[Dict],
                         top_k: int = 3) -> List[Dict]:
        """Get top N citations."""
        ranked = self.rank_citations(chunks)
        return ranked[:top_k]
