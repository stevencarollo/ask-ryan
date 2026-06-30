"""Vector search and content retrieval."""
from typing import List, Dict, Optional
from process.embedder import embed_text, cosine_similarity

def search_similar_content_local(
    db,
    query: str,
    top_k: int = 5,
    similarity_threshold: float = 0.1
) -> List[Dict]:
    """
    Search for content similar to query using vector similarity.

    Works with Supabase or local vectors.

    Args:
        db: Supabase client
        query: User query text
        top_k: Number of results to return
        similarity_threshold: Minimum similarity score

    Returns:
        List of similar content chunks with similarity scores
    """
    try:
        # Embed the query
        query_embedding = embed_text(query)

        # Try to use Supabase RPC function if available
        try:
            results = db.rpc(
                "search_chunks",
                {
                    "query_embedding": query_embedding,
                    "similarity_threshold": similarity_threshold,
                    "match_count": top_k
                }
            ).execute().data

            formatted = []
            for r in results:
                formatted.append({
                    "content_id": r.get("content_id"),
                    "chunk_index": r.get("chunk_index"),
                    "text": r.get("text"),
                    "similarity": r.get("similarity", 0),
                    "source": r.get("source"),
                    "title": r.get("title"),
                    "url": r.get("url")
                })
            return formatted
        except:
            # Fallback: search locally by fetching all chunks
            return _local_vector_search(db, query_embedding, top_k, similarity_threshold)

    except Exception as e:
        print(f"Search error: {e}")
        return []

def _local_vector_search(
    db,
    query_embedding: List[float],
    top_k: int,
    similarity_threshold: float
) -> List[Dict]:
    """
    Local vector search fallback when RPC unavailable.
    Fetches all chunks and scores locally.
    """
    try:
        # Fetch all chunks
        result = db.table("chunks").select("*").execute()
        chunks = result.data if result.data else []

        if not chunks:
            return []

        # Score each chunk
        scored = []
        for chunk in chunks:
            embedding = chunk.get("embedding")
            if not embedding:
                continue

            score = cosine_similarity(query_embedding, embedding)
            if score >= similarity_threshold:
                # Fetch source content for context
                content_id = chunk.get("content_id")
                try:
                    content_result = db.table("content").select("*").eq("id", content_id).single().execute()
                    content = content_result.data if content_result.data else {}
                except:
                    content = {}

                scored.append({
                    "content_id": chunk.get("content_id"),
                    "chunk_index": chunk.get("chunk_index"),
                    "text": chunk.get("text"),
                    "similarity": score,
                    "source": content.get("source", "unknown"),
                    "title": content.get("title", ""),
                    "url": content.get("full_url", "")
                })

        # Sort by similarity descending and return top_k
        scored.sort(key=lambda x: x["similarity"], reverse=True)
        return scored[:top_k]

    except Exception as e:
        print(f"Local search error: {e}")
        return []

def get_source_context(db, content_id: int) -> Dict:
    """Fetch metadata about a content source for citations."""
    try:
        result = db.table("content").select("*").eq("id", content_id).single().execute()
        return result.data if result.data else {}
    except:
        return {}
