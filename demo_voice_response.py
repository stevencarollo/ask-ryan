#!/usr/bin/env python3
"""
Live Demo: Voice Response Generator
Run this to see exactly what Ryan's responses look like and how the system works
"""

import json
from datetime import datetime
from typing import List, Dict


class DemoResponseGenerator:
    """Demo response generator with sample data"""

    # Sample retrieved chunks (what the retriever finds)
    SAMPLE_CHUNKS = [
        {
            "id": 1,
            "source": "book",
            "title": "Sell It Like Serhant - Negotiation Chapter",
            "text": "Price objections are not about price—they're about value perception. The key is to reframe the conversation from cost to benefit. Ask qualifying questions rather than defending the price point.",
            "url": "https://example.com/book/negotiation",
            "quality_score": 94,
            "topics": ["objection_handling", "negotiation"]
        },
        {
            "id": 2,
            "source": "course",
            "title": "Advanced Selling - Lesson 4: Objection Framework",
            "text": "Use the silence strategy after presenting your value. The agent who speaks first after stating price loses the negotiation. Let the client respond. Their next words tell you what they really care about.",
            "url": "https://example.com/course/lesson-4",
            "quality_score": 90,
            "topics": ["scripts", "objection_handling"]
        },
        {
            "id": 3,
            "source": "podcast",
            "title": "Masters of Scale Episode 12",
            "text": "The best negotiators reframe objections as opportunities. When someone says 'too expensive,' they're really saying 'I don't see the value yet.' That's your cue to educate, not to discount.",
            "url": "https://example.com/podcast/ep12",
            "quality_score": 88,
            "topics": ["negotiation"]
        }
    ]

    # Sample Ryan-style response (what Claude would generate)
    SAMPLE_RESPONSE = """Listen, price objections are the easiest ones to overcome because they're not
really about price—they're about VALUE. Here's what you do:

First, never defend the price. That's weakness. Instead, ask: "What specifically
concerns you about the investment?" Nine times out of ten, they don't actually
understand what they're buying or what you're bringing to the table.

Then—and this is critical—reframe the conversation. Don't talk about what the
property COSTS. Talk about what it MAKES or SAVES or PROVIDES. You're not selling
a house, you're selling their future. You're selling peace of mind. You're selling
the lifestyle they want.

Here's the script I use: "I hear you on price. What I'm really asking is—are we
talking about the same property? Because if you saw someone else sell something
similar for less, that's actually concerning to me. Either they're missing
something you need, or we need to talk about what makes THIS property worth the
premium."

Then be quiet. Let them talk. Most agents jump in and start justifying. Don't do
that. The person who talks first loses.

One more thing: sometimes price IS the real issue—they legitimately can't afford
it or the market won't bear it. That's okay. You pivot to creative solutions:
seller financing, lease options, staging to increase perceived value. But you
never, ever apologize for quality.

The bottom line: price objections mean they're interested. No interest = no
objections. So treat it like the opportunity it is."""

    def generate(self, query: str, style: str = "practical") -> Dict:
        """Generate complete response with citations"""

        start_time = datetime.now()

        # 1. Simulate retrieval
        retrieved_chunks = self.SAMPLE_CHUNKS

        # 2. Generate response (in real system: Claude API)
        response_text = self.SAMPLE_RESPONSE

        # 3. Build citations (ranked)
        citations = self._build_citations(retrieved_chunks)

        # 4. Calculate metadata
        elapsed_ms = int((datetime.now() - start_time).total_seconds() * 1000)

        return {
            "status": "success",
            "query": query,
            "response": {
                "text": response_text,
                "style": style,
                "word_count": len(response_text.split()),
                "reading_time_seconds": len(response_text.split()) // 3,
                "ryan_voice": {
                    "energy": 0.85,
                    "pace_wpm": 145,
                    "confidence": 1.0
                }
            },
            "citations": citations,
            "metadata": {
                "chunks_retrieved": len(retrieved_chunks),
                "confidence_score": 0.89,
                "generation_latency_ms": elapsed_ms,
                "sources": [c["source"] for c in retrieved_chunks]
            }
        }

    def _build_citations(self, chunks: List[Dict]) -> List[Dict]:
        """Rank and format citations"""
        citations = []

        for i, chunk in enumerate(chunks[:3], 1):
            citation = {
                "rank": i,
                "source": chunk["source"],
                "title": chunk["title"],
                "quality_score": chunk["quality_score"],
                "excerpt": chunk["text"][:120] + "...",
                "url": chunk["url"],
                "topics": chunk["topics"]
            }
            citations.append(citation)

        return citations


def print_section(title: str):
    """Print formatted section header"""
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70)


def print_response(result: Dict):
    """Pretty print the response"""

    print_section("RYAN'S ANSWER")
    print(result["response"]["text"])

    print("\n\n📊 RESPONSE STATS")
    print(f"   Word Count: {result['response']['word_count']}")
    print(f"   Reading Time: {result['response']['reading_time_seconds']} seconds")
    print(f"   Confidence: {int(result['metadata']['confidence_score']*100)}%")
    print(f"   Generation Time: {result['metadata']['generation_latency_ms']}ms")

    print_section("CITATIONS (Ranked by Quality)")

    for citation in result["citations"]:
        print(f"\n📌 Citation {citation['rank']}: {citation['title']}")
        print(f"   Source: {citation['source'].upper()}")
        print(f"   Quality: {citation['quality_score']}/100")
        print(f"   Topics: {', '.join(citation['topics'])}")
        print(f"   {citation['excerpt']}")
        print(f"   🔗 {citation['url']}")

    print("\n\n🎤 VOICE CHARACTERISTICS")
    voice = result["response"]["ryan_voice"]
    print(f"   Energy Level: {int(voice['energy']*100)}/100")
    print(f"   Pace: {voice['pace_wpm']} words per minute")
    print(f"   Confidence: {int(voice['confidence']*100)}/100")
    print(f"   Tone: Direct, energetic, commanding")
    print(f"   Accent: New York")

    print_section("API RESPONSE (JSON)")
    print(json.dumps(result, indent=2))


def main():
    """Run demo"""

    print("\n" + "🎉 " * 20)
    print("RYAN SERHANT RESPONSE TOOL - LIVE DEMO")
    print("🎉 " * 20)

    generator = DemoResponseGenerator()

    # Demo query
    query = "How do I overcome objections when clients say the price is too high?"

    print(f"\n❓ QUERY: {query}")
    print(f"\n⏳ Generating response in Ryan's voice...\n")

    # Generate response
    result = generator.generate(query, style="practical")

    # Display
    print_response(result)

    print_section("READY TO TRY?")
    print("""
To see this live with your own queries:

1. Start the backend:
   python backend/main.py api --port 8000

2. Open the frontend:
   http://localhost:8000/

3. Enter your question in the search box

4. Get instant responses in Ryan's voice with citations!

The response above is exactly what you'll see—complete with:
✓ Ryan-style answer (practical, direct, actionable)
✓ Ranked citations showing the sources
✓ Voice characteristics for audio
✓ Confidence score
✓ Generation time
    """)


if __name__ == "__main__":
    main()
