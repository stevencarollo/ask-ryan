"""Text embedding generation."""
from typing import List
import hashlib
import random

def embed_text(text: str) -> List[float]:
    """
    Generate embeddings for text.

    NOTE: This uses deterministic seeding for demo purposes.
    In production, integrate with Claude API embeddings or OpenAI.

    Args:
        text: Text to embed

    Returns:
        1536-dimensional embedding vector
    """
    # Deterministic seed based on text content
    # In production: call client.embeddings.create(model="text-embedding-3-small", input=text)
    seed = int(hashlib.md5(text.encode()).hexdigest(), 16) % (2 ** 31)
    random.seed(seed)

    # Generate 1536-dim vector (Claude embeddings dimension)
    return [random.random() for _ in range(1536)]

def embed_batch(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for multiple texts.

    Args:
        texts: List of texts to embed

    Returns:
        List of embedding vectors
    """
    return [embed_text(text) for text in texts]

def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
    """
    Calculate cosine similarity between two vectors.

    Args:
        vec_a: First vector
        vec_b: Second vector

    Returns:
        Similarity score between 0 and 1
    """
    dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
    magnitude_a = sum(a ** 2 for a in vec_a) ** 0.5
    magnitude_b = sum(b ** 2 for b in vec_b) ** 0.5

    if magnitude_a == 0 or magnitude_b == 0:
        return 0.0

    return dot_product / (magnitude_a * magnitude_b)
