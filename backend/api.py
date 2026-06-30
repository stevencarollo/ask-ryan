"""FastAPI backend for Ryan Serhant Response Tool."""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json

from query.retriever import search_similar_content_local
from query.voice_engine import generate_ryan_response, format_response_with_citations
from collect.youtube_scraper import get_sample_transcripts
from collect.book_parser import get_sample_book_content
from process.loader import upload_to_supabase, chunk_and_embed_content

# Initialize FastAPI app
app = FastAPI(
    title="Ryan Serhant Response Tool",
    description="Ask questions and get answers in Ryan Serhant's voice",
    version="0.1.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Citation(BaseModel):
    source: str
    title: str
    url: str

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    response: str
    citations: List[Citation]

class LoadRequest(BaseModel):
    source: Optional[str] = None  # 'youtube', 'book', or None for all

class LoadResponse(BaseModel):
    status: str
    content_count: int
    chunks_count: int

# Global database connection (initialize lazily)
_db = None

def get_db():
    """Get Supabase database connection."""
    global _db
    if _db is None:
        try:
            from supabase import create_client
            from config import SUPABASE_URL, SUPABASE_KEY

            if not SUPABASE_URL or not SUPABASE_KEY:
                print("⚠ Supabase credentials not configured - using sample data only")
                return None

            _db = create_client(SUPABASE_URL, SUPABASE_KEY)
        except Exception as e:
            print(f"⚠ Failed to connect to Supabase: {e}")
            return None
    return _db

# Routes

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "app": "Ryan Serhant Response Tool",
        "version": "0.1.0"
    }

@app.post("/query", response_model=QueryResponse)
async def handle_query(request: QueryRequest):
    """
    Main endpoint: Answer a question in Ryan Serhant's voice.
    """
    if not request.question or not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    try:
        db = get_db()

        # Retrieve similar content
        if db:
            chunks = search_similar_content_local(db, request.question, top_k=5)
        else:
            # Use sample data if no database
            print("Using sample data for demonstration")
            chunks = _get_sample_chunks(request.question)

        if not chunks:
            return QueryResponse(
                response="I don't have relevant content to answer that question yet. Please load more Ryan Serhant content into the system.",
                citations=[]
            )

        # Generate Ryan-voiced response
        response_text = generate_ryan_response(request.question, chunks)

        # Format with citations
        result = format_response_with_citations(response_text, chunks)

        return QueryResponse(
            response=result["response"],
            citations=[Citation(**c) for c in result["citations"]]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")

@app.post("/load-content", response_model=LoadResponse)
async def load_content(request: LoadRequest):
    """
    Load content into the system.

    Sources:
    - 'youtube': YouTube transcripts
    - 'book': Book excerpts
    - None: All available
    """
    db = get_db()
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")

    try:
        content_items = []
        source_filter = request.source

        # Collect content
        if not source_filter or source_filter == "youtube":
            print("Loading YouTube transcripts...")
            from collect.youtube_scraper import scrape_ryan_channels
            yt_content = scrape_ryan_channels(max_videos=5)
            content_items.extend(yt_content)

        if not source_filter or source_filter == "book":
            print("Loading book content...")
            from collect.book_parser import extract_book_content
            book_content = extract_book_content()
            content_items.extend(book_content)

        # Upload to database
        content_count = upload_to_supabase(db, content_items)
        print(f"Uploaded {content_count} content items")

        # Process and embed
        chunks_count = chunk_and_embed_content(db, max_items=content_count)
        print(f"Created {chunks_count} chunks")

        return LoadResponse(
            status="success",
            content_count=content_count,
            chunks_count=chunks_count
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Load error: {str(e)}")

@app.get("/status")
async def get_status():
    """Get system status and configuration."""
    db = get_db()
    db_connected = db is not None

    status = {
        "app": "Ryan Serhant Response Tool",
        "database": "connected" if db_connected else "not configured",
        "features": {
            "query": "available",
            "load_content": "available if database connected",
            "embeddings": "enabled"
        }
    }

    if db and db_connected:
        try:
            # Get content count
            result = db.table("content").select("id", count="exact").execute()
            status["content_count"] = result.count if hasattr(result, "count") else 0

            # Get chunk count
            result = db.table("chunks").select("id", count="exact").execute()
            status["chunks_count"] = result.count if hasattr(result, "count") else 0
        except:
            status["content_count"] = 0
            status["chunks_count"] = 0

    return status

# Helper functions

def _get_sample_chunks(query: str) -> List[dict]:
    """Get sample chunks for demonstration when database unavailable."""
    # Return sample content that's relevant to common questions
    book_samples = get_sample_book_content()
    yt_samples = get_sample_transcripts()

    samples = []
    for item in book_samples + yt_samples:
        samples.append({
            "text": item.get("text", ""),
            "source": item.get("source", ""),
            "title": item.get("title", ""),
            "url": item.get("url", ""),
            "similarity": 0.7  # Demo score
        })

    return samples[:5]

# Entry point
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
