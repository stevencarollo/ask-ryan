"""Content chunking for embeddings."""
from typing import List

def chunk_content(text: str, chunk_size: int = 512, overlap: int = 100) -> List[str]:
    """
    Split text into overlapping chunks suitable for embedding.

    Rough token estimation: 1 token ≈ 1.3 words

    Args:
        text: Full content to chunk
        chunk_size: Target tokens per chunk
        overlap: Token overlap between chunks

    Returns:
        List of text chunks
    """
    # Convert tokens to words (1 token ≈ 1.3 words)
    word_chunk_size = max(int(chunk_size / 1.3), 10)
    word_overlap = max(int(overlap / 1.3), 5)

    words = text.split()

    if len(words) < word_chunk_size:
        return [text] if text.strip() else []

    chunks = []
    i = 0

    while i < len(words):
        # Get chunk of words
        end_idx = min(i + word_chunk_size, len(words))
        chunk_words = words[i:end_idx]
        chunk_text = " ".join(chunk_words)

        if chunk_text.strip():
            chunks.append(chunk_text)

        # Move forward with overlap
        i += word_chunk_size - word_overlap

    return chunks

def split_by_sentences(text: str, max_chars: int = 2000) -> List[str]:
    """
    Split text by sentences, keeping chunks under max_chars.

    Useful for content that doesn't need fixed-size chunks.

    Args:
        text: Content to split
        max_chars: Maximum characters per chunk

    Returns:
        List of sentence-based chunks
    """
    # Simple sentence split on periods
    sentences = text.replace("! ", ". ").replace("? ", ". ").split(". ")

    chunks = []
    current_chunk = []
    current_size = 0

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        # Add period back
        sentence_with_period = sentence + ". " if not sentence.endswith(".") else sentence + " "
        size = len(sentence_with_period)

        # Check if adding this sentence would exceed limit
        if current_size + size > max_chars and current_chunk:
            # Save current chunk
            chunks.append("".join(current_chunk).strip())
            current_chunk = []
            current_size = 0

        current_chunk.append(sentence_with_period)
        current_size += size

    # Add final chunk
    if current_chunk:
        chunks.append("".join(current_chunk).strip())

    return chunks
