"""Ryan Serhant voice generation using Groq API (FREE)."""
from typing import List, Dict
from groq import Groq
from config import GROQ_API_KEY, RYAN_VOICE_PROMPT

client = Groq(api_key=GROQ_API_KEY)

def generate_ryan_response(query: str, context_chunks: List[Dict]) -> str:
    """
    Generate a response in Ryan Serhant's voice using retrieved content as context.

    Args:
        query: User's question
        context_chunks: List of relevant content chunks with metadata

    Returns:
        Ryan-styled response text
    """
    if not context_chunks:
        return "I don't have enough content to answer that question yet. Build out the knowledge base with more Ryan Serhant content!"

    # Build context string from chunks
    context_text = "\n\n".join([
        f"[{chunk.get('source', 'content').upper()}] {chunk['text']}"
        for chunk in context_chunks[:5]  # Use top 5
    ])

    # Construct the prompt
    prompt = f"""{RYAN_VOICE_PROMPT}

---

Context from my teachings and content:
{context_text}

---

Question from an agent: {query}

Now answer as Ryan Serhant would:"""

    try:
        # Call Groq API (FREE - 10x faster than Claude!)
        if not GROQ_API_KEY:
            return _generate_fallback_response(query, context_chunks)

        response = client.chat.completions.create(
            model="mixtral-8x7b-32768",  # Fastest & best free model
            max_tokens=800,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        print(f"Groq API error: {e}")
        # Fallback: synthesize from context chunks
        return _generate_fallback_response(query, context_chunks)

def _generate_fallback_response(query: str, context_chunks: List[Dict]) -> str:
    """
    Generate a response by directly synthesizing from context chunks.
    Used when Claude API is unavailable.
    """
    response_parts = []

    # Add relevant excerpts
    response_parts.append("Based on Ryan Serhant's teachings:")
    response_parts.append("")

    for chunk in context_chunks[:3]:
        text = chunk.get("text", "").strip()
        if text:
            # Take first 2 sentences max
            sentences = text.split(". ")[:2]
            excerpt = ". ".join(sentences) + "."
            response_parts.append(f"• {excerpt}")

    response_parts.append("")
    response_parts.append("The key takeaway: Stay consistent, be authentic, and focus on what matters most to your clients.")

    return "\n".join(response_parts)

def format_response_with_citations(
    response_text: str,
    source_chunks: List[Dict]
) -> Dict:
    """
    Format response with citations back to source content.

    Args:
        response_text: Generated response
        source_chunks: List of source chunks used

    Returns:
        Dict with response and citations
    """
    citations = []
    seen_sources = set()

    for chunk in source_chunks:
        source_key = (chunk.get("source"), chunk.get("title"))
        if source_key not in seen_sources:
            citations.append({
                "source": chunk.get("source", "unknown"),
                "title": chunk.get("title", "Ryan Serhant Content"),
                "url": chunk.get("url", "")
            })
            seen_sources.add(source_key)

    return {
        "response": response_text,
        "citations": citations
    }

def get_system_prompt() -> str:
    """Get the Ryan Serhant system prompt."""
    return RYAN_VOICE_PROMPT
