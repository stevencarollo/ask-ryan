"""Advanced multi-strategy retriever for semantic + keyword + topic search."""
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AdvancedRetriever:
    """Multi-strategy search combining vector, keyword, and topic filtering."""

    def __init__(self, db=None):
        self.db = db

    def search(self,
               query: str,
               strategy: str = "hybrid",
               top_k: int = 5,
               topic_filters: Optional[List[str]] = None,
               min_quality: int = 50) -> List[Dict]:
        """
        Search using specified strategy.

        Args:
            query: User query
            strategy: 'vector', 'keyword', 'topic', or 'hybrid'
            top_k: Number of results
            topic_filters: Optional topic constraints
            min_quality: Minimum quality score

        Returns:
            Ranked list of relevant chunks
        """
        if strategy == "vector":
            return self._vector_search(query, top_k, topic_filters, min_quality)
        elif strategy == "keyword":
            return self._keyword_search(query, top_k, min_quality)
        elif strategy == "topic":
            return self._topic_search(query, topic_filters, top_k, min_quality)
        else:  # hybrid
            return self._hybrid_search(query, topic_filters, top_k, min_quality)

    def _vector_search(self, query: str, top_k: int,
                       topic_filters: Optional[List[str]],
                       min_quality: int) -> List[Dict]:
        """Semantic vector search using embeddings."""
        if not self.db:
            logger.warning("No database - using fallback results")
            return []

        from process.embedder import embed_text

        try:
            query_embedding = embed_text(query)

            results = self.db.rpc(
                "search_chunks",
                {
                    "query_embedding": query_embedding,
                    "similarity_threshold": 0.1,
                    "match_count": top_k,
                    "topic_filter": topic_filters
                }
            ).execute()

            # Filter by quality
            filtered = [r for r in (results.data or [])
                       if r.get("quality_score", 0) >= min_quality]

            logger.info(f"Vector search: {len(filtered)} results (similarity > 0.1)")
            return filtered

        except Exception as e:
            logger.error(f"Vector search error: {e}")
            return []

    def _keyword_search(self, query: str, top_k: int,
                        min_quality: int) -> List[Dict]:
        """Full-text keyword search."""
        if not self.db:
            return []

        try:
            keywords = query.lower().split()

            # Build search condition
            search_text = " | ".join(keywords)

            results = self.db.table("chunks").select(
                "id,chunk_index,text,topics,quality_score,source"
            ).filter(
                "text.fts", f"@@. '{search_text}'"
            ).limit(top_k).execute()

            filtered = [r for r in (results.data or [])
                       if r.get("quality_score", 0) >= min_quality]

            logger.info(f"Keyword search: {len(filtered)} results")
            return filtered

        except Exception as e:
            logger.error(f"Keyword search error: {e}")
            return []

    def _topic_search(self, query: str, topic_filters: Optional[List[str]],
                      top_k: int, min_quality: int) -> List[Dict]:
        """Topic-based filtering for discovery."""
        if not self.db or not topic_filters:
            return []

        try:
            results = self.db.table("chunks").select(
                "id,chunk_index,text,topics,quality_score,source"
            ).contains("topics", topic_filters).filter(
                "quality_score", "gte", min_quality
            ).limit(top_k).execute()

            logger.info(f"Topic search: {len(results.data or [])} results")
            return results.data or []

        except Exception as e:
            logger.error(f"Topic search error: {e}")
            return []

    def _hybrid_search(self, query: str,
                       topic_filters: Optional[List[str]],
                       top_k: int, min_quality: int) -> List[Dict]:
        """Combine vector + keyword + topic for best results."""
        # Vector search (primary)
        vector_results = self._vector_search(query, top_k, topic_filters, min_quality)

        # Keyword search (secondary)
        keyword_results = self._keyword_search(query, top_k // 2, min_quality)

        # Combine and dedupe (prefer vector results)
        combined = vector_results.copy()
        seen_ids = {r.get("id") for r in combined}

        for r in keyword_results:
            if r.get("id") not in seen_ids:
                combined.append(r)

        logger.info(f"Hybrid search: {len(combined)} unique results")
        return combined[:top_k]

    def get_related_topics(self, query: str) -> List[str]:
        """Extract relevant topics from query."""
        topics = [
            "sales_fundamentals", "objection_handling", "negotiation",
            "closing", "prospecting", "personal_brand", "time_management",
            "team_building", "follow_up", "scripts", "mindset", "technology"
        ]

        query_lower = query.lower()
        relevant = [t for t in topics
                   if any(keyword in query_lower for keyword in t.split("_"))]

        return relevant if relevant else []
