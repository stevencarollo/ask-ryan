"""Enrich chunks with metadata and topic tags."""
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MetadataEnricher:
    """Add rich metadata and topic tags to content chunks."""

    # Topic keywords for classification
    TOPICS = {
        "sales_fundamentals": ["seven stages", "prospecting", "qualifying", "presenting"],
        "objection_handling": ["objection", "overcome", "concern", "hesitation"],
        "negotiation": ["negotiate", "price", "terms", "agreement", "deal"],
        "closing": ["close", "closing", "ask for", "commitment", "sign"],
        "prospecting": ["prospect", "lead", "outreach", "call", "contact"],
        "personal_brand": ["brand", "hook", "different", "memorable", "unique"],
        "time_management": ["time", "schedule", "block", "priority", "delegate"],
        "team_building": ["team", "scale", "hire", "duplicate", "system"],
        "follow_up": ["follow up", "relationship", "referral", "maintain"],
        "scripts": ["script", "framework", "template", "words", "say"],
        "mindset": ["mindset", "belief", "confidence", "motivation", "discipline"],
        "technology": ["technology", "tool", "platform", "software", "digital"],
    }

    @classmethod
    def enrich_chunk(cls, chunk: Dict) -> Dict:
        """
        Enrich a single chunk with metadata and topics.

        Args:
            chunk: Chunk dictionary

        Returns:
            Enriched chunk with metadata and topics
        """
        enriched = chunk.copy()

        # Extract topics
        text_lower = chunk.get("text", "").lower()
        topics = []

        for topic, keywords in cls.TOPICS.items():
            if any(keyword in text_lower for keyword in keywords):
                topics.append(topic)

        # Calculate confidence
        topic_confidence = len(topics) / len(cls.TOPICS) if cls.TOPICS else 0

        # Enrich metadata
        enriched["topics"] = list(set(topics))  # Remove duplicates
        enriched["topic_confidence"] = min(1.0, topic_confidence)

        # Add extraction metadata
        enriched["metadata"] = enriched.get("metadata", {})
        enriched["metadata"]["topics"] = enriched["topics"]
        enriched["metadata"]["confidence_score"] = enriched["topic_confidence"]
        enriched["metadata"]["enriched_at"] = "2026-06-30"

        # Add useful metrics
        text = chunk.get("text", "")
        enriched["metrics"] = {
            "word_count": len(text.split()),
            "sentence_count": text.count(". ") + text.count("! ") + text.count("? "),
            "paragraph_count": text.count("\n\n") + 1,
            "key_concepts": cls._extract_key_concepts(text)
        }

        return enriched

    @classmethod
    def enrich_batch(cls, chunks: List[Dict]) -> List[Dict]:
        """Enrich multiple chunks."""
        enriched = [cls.enrich_chunk(chunk) for chunk in chunks]
        logger.info(f"Enriched {len(enriched)} chunks with metadata and topics")
        return enriched

    @staticmethod
    def _extract_key_concepts(text: str) -> List[str]:
        """Extract potential key concepts (capitalized phrases)."""
        concepts = []

        # Look for capitalized phrases
        words = text.split()
        for i, word in enumerate(words):
            if word and word[0].isupper() and len(word) > 3:
                if i + 1 < len(words) and words[i + 1][0].isupper():
                    concepts.append(f"{word} {words[i + 1]}")

        return list(set(concepts))[:5]  # Top 5 unique concepts


if __name__ == "__main__":
    import json

    print("\n" + "="*60)
    print("METADATA ENRICHER - Topic Classification")
    print("="*60)

    test_chunk = {
        "text": "The Seven Stages of Selling are prospecting, qualifying, presenting, overcoming objections, closing, following up, and referrals.",
        "source": "book",
        "title": "The Seven Stages"
    }

    enricher = MetadataEnricher()
    enriched = enricher.enrich_chunk(test_chunk)

    print(f"\nOriginal chunk: {test_chunk['text'][:60]}...")
    print(f"\nEnriched metadata:")
    print(f"  Topics: {enriched['topics']}")
    print(f"  Confidence: {enriched['topic_confidence']:.1%}")
    print(f"  Word Count: {enriched['metrics']['word_count']}")
    print(f"  Key Concepts: {enriched['metrics']['key_concepts']}")
