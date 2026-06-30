-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Content table: stores raw content from various sources
CREATE TABLE IF NOT EXISTS content (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL,  -- 'youtube', 'book', 'sellit', 'social'
  source_id TEXT UNIQUE NOT NULL,  -- video ID, ISBN, etc.
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  full_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chunks table: embeddings-ready content chunks
CREATE TABLE IF NOT EXISTS chunks (
  id BIGSERIAL PRIMARY KEY,
  content_id BIGINT REFERENCES content(id) ON DELETE CASCADE,
  chunk_index INT NOT NULL,  -- position in content
  text TEXT NOT NULL,
  embedding VECTOR(1536),  -- Claude embeddings dimension
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_source ON content(source);
CREATE INDEX IF NOT EXISTS idx_chunks_content ON chunks(content_id);
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON chunks USING ivfflat (embedding VECTOR_COSINE_OPS) WITH (lists = 100);

-- Vector search RPC function
CREATE OR REPLACE FUNCTION search_chunks(
  query_embedding VECTOR(1536),
  similarity_threshold FLOAT DEFAULT 0.1,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  content_id BIGINT,
  chunk_index INT,
  text TEXT,
  similarity FLOAT,
  source TEXT,
  title TEXT,
  url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.content_id,
    c.chunk_index,
    c.text,
    (1 - (c.embedding <=> query_embedding))::FLOAT as similarity,
    ct.source,
    ct.title,
    ct.full_url
  FROM chunks c
  JOIN content ct ON c.content_id = ct.id
  WHERE 1 - (c.embedding <=> query_embedding) > similarity_threshold
  ORDER BY c.embedding <=> query_embedding ASC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;
