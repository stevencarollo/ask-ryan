"""Generate Ryan Serhant-style responses from retrieved content."""
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

RYAN_SYSTEM_PROMPT = """You are Ryan Serhant, a top real estate agent and entrepreneur.
Answer questions in your authentic voice: direct, actionable, practical, and energetic.
Reference the provided content snippets when relevant.
Keep responses focused, concise, and immediately useful to real estate agents."""


class ResponseSynthesizer:
    """Synthesize multi-source responses in Ryan's voice."""

    def __init__(self, api_client=None):
        """Initialize with optional Claude API client."""
        self.api_client = api_client

    def synthesize(self,
                   query: str,
                   retrieved_chunks: List[Dict],
                   response_style: str = "practical") -> Dict:
        """
        Synthesize response from multiple content chunks.

        Args:
            query: User query
            retrieved_chunks: Retrieved relevant chunks
            response_style: 'practical', 'motivational', 'technical'

        Returns:
            Dict with response, citations, and metadata
        """
        if not retrieved_chunks:
            return self._fallback_response(query)

        # Build context from chunks
        context = self._build_context(retrieved_chunks)

        # Generate response
        response_text = self._generate_response(query, context, response_style)

        # Extract and rank citations
        citations = self._build_citations(retrieved_chunks, response_text)

        return {
            "response": response_text,
            "citations": citations,
            "source_count": len(set(c.get("source") for c in retrieved_chunks)),
            "confidence_score": self._calculate_confidence(retrieved_chunks)
        }

    def _build_context(self, chunks: List[Dict]) -> str:
        """Build context string from chunks."""
        context_parts = []

        for chunk in chunks[:5]:  # Top 5 chunks
            text = chunk.get("text", "")
            source = chunk.get("source", "Unknown")
            quality = chunk.get("quality_score", 0)

            context_parts.append(
                f"[{source} - Quality {quality}/100]\n{text}\n"
            )

        return "\n---\n".join(context_parts)

    def _generate_response(self,
                          query: str,
                          context: str,
                          response_style: str) -> str:
        """Generate response using Claude or fallback."""
        if self.api_client:
            try:
                return self._claude_response(query, context, response_style)
            except Exception as e:
                logger.error(f"Claude API error: {e}")
                return self._fallback_synthesis(query, context, response_style)
        else:
            return self._fallback_synthesis(query, context, response_style)

    def _claude_response(self,
                        query: str,
                        context: str,
                        response_style: str) -> str:
        """Call Claude API for response generation."""
        style_prompt = {
            "practical": "Be actionable and specific. Give concrete steps.",
            "motivational": "Be inspiring and confidence-building. Motivate action.",
            "technical": "Be detailed and comprehensive. Explain the mechanics."
        }.get(response_style, "Be direct and helpful.")

        prompt = f"""{style_prompt}

Question: {query}

Relevant content to reference:
{context}

Respond as Ryan Serhant would, incorporating the content naturally. Keep it under 300 words."""

        response = self.api_client.messages.create(
            model="claude-opus-4-1-20250805",
            max_tokens=300,
            messages=[
                {"role": "user", "content": prompt}
            ],
            system=RYAN_SYSTEM_PROMPT
        )

        return response.content[0].text

    def _fallback_synthesis(self,
                           query: str,
                           context: str,
                           response_style: str) -> str:
        """Fallback synthesis without API."""
        # Extract key points from context
        lines = context.split("\n")
        key_points = [l.strip() for l in lines
                     if l.strip() and len(l.strip()) > 20][:3]

        # Build response
        response = f"Here's what you need to know about {query}:\n\n"

        if key_points:
            for i, point in enumerate(key_points, 1):
                response += f"• {point}\n"

        response += "\nThe key: take action immediately. Don't overthink it."
        return response

    def _build_citations(self,
                        chunks: List[Dict],
                        response_text: str) -> List[Dict]:
        """Build citations from retrieved chunks."""
        citations = []

        for i, chunk in enumerate(chunks[:3], 1):  # Top 3 citations
            citation = {
                "id": i,
                "source": chunk.get("source", "Unknown"),
                "title": chunk.get("title", ""),
                "url": chunk.get("url", ""),
                "excerpt": chunk.get("text", "")[:150] + "...",
                "relevance_score": chunk.get("quality_score", 0) / 100
            }
            citations.append(citation)

        return citations

    def _calculate_confidence(self, chunks: List[Dict]) -> float:
        """Calculate confidence score (0-1)."""
        if not chunks:
            return 0.0

        avg_quality = sum(c.get("quality_score", 0) for c in chunks) / len(chunks)
        return min(1.0, avg_quality / 100)

    def _fallback_response(self, query: str) -> Dict:
        """Response when no content found."""
        return {
            "response": f"I don't have specific content about '{query}', but I'd suggest focusing on what actually works: prospecting consistently, listening to objections, and following up relentlessly.",
            "citations": [],
            "source_count": 0,
            "confidence_score": 0.0
        }
