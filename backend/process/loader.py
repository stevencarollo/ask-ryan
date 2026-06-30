"""Load and embed content into Supabase."""
from typing import List, Dict, Optional
import json
from process.chunker import chunk_content
from process.embedder import embed_batch

def upload_to_supabase(db, content_items: List[Dict]) -> int:
    """
    Upload raw content items to Supabase content table.

    Args:
        db: Supabase client
        content_items: List of content dictionaries

    Returns:
        Count of inserted rows
    """
    if not content_items:
        return 0

    inserted = 0
    for item in content_items:
        try:
            # Prepare record
            record = {
                "source": item.get("source", "unknown"),
                "source_id": item.get("source_id", f"unknown_{inserted}"),
                "title": item.get("title", "Untitled"),
                "excerpt": item.get("text", "")[:2000],  # First 2000 chars
                "full_url": item.get("url", "")
            }

            # Upsert (insert or update if source_id exists)
            db.table("content").upsert(record).execute()
            inserted += 1
        except Exception as e:
            print(f"  Error uploading content: {e}")
            continue

    return inserted

def chunk_and_embed_content(db, max_items: Optional[int] = None) -> int:
    """
    Fetch content from database, chunk, embed, and store in chunks table.

    Args:
        db: Supabase client
        max_items: Limit number of content items to process

    Returns:
        Count of chunks created
    """
    try:
        # Fetch all content
        result = db.table("content").select("*").execute()
        content_rows = result.data if result.data else []

        if max_items:
            content_rows = content_rows[:max_items]

        print(f"Processing {len(content_rows)} content items...")

        total_chunks = 0
        for row_idx, row in enumerate(content_rows, 1):
            content_id = row["id"]
            text = row.get("excerpt", "")

            if not text:
                continue

            # Chunk content
            chunks = chunk_content(text)
            if not chunks:
                continue

            # Embed chunks
            embeddings = embed_batch(chunks)

            # Prepare chunk records
            chunk_records = []
            for i, chunk_text in enumerate(chunks):
                chunk_records.append({
                    "content_id": content_id,
                    "chunk_index": i,
                    "text": chunk_text,
                    "embedding": embeddings[i]
                })

            # Insert chunks
            for record in chunk_records:
                try:
                    db.table("chunks").insert(record).execute()
                    total_chunks += 1
                except Exception as e:
                    print(f"    Error inserting chunk: {e}")
                    continue

            if row_idx % 5 == 0:
                print(f"  ✓ Processed {row_idx}/{len(content_rows)}")

        print(f"Created {total_chunks} chunks")
        return total_chunks

    except Exception as e:
        print(f"Error processing content: {e}")
        return 0

def clear_chunks(db) -> int:
    """Clear all chunks from database (for re-processing)."""
    try:
        result = db.table("chunks").delete().neq("id", 0).execute()
        return len(result.data) if result.data else 0
    except Exception as e:
        print(f"Error clearing chunks: {e}")
        return 0
