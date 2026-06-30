-- Ryan Serhant Response Tool - Scaled Database Schema V2
-- For Supabase with pgvector

CREATE EXTENSION IF NOT EXISTS vector;

-- Content sources tracking
CREATE TABLE IF NOT EXISTS content_sources (
  id BIGSERIAL PRIMARY KEY,
  source_type TEXT NOT NULL,  -- 'youtube', 'book', 'blog', 'course', 'podcast'
  source_name TEXT NOT NULL,
  total_items INT DEFAULT 0,
  total_words INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW(),
  UNIQUE(source_type, source_name)
);

-- Main content table
CREATE TABLE IF NOT EXISTS content (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  source_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  full_url TEXT,
  source_type TEXT,
  platform TEXT,
  author TEXT DEFAULT 'Ryan Serhant',
  published_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chunks table with embeddings
CREATE TABLE IF NOT EXISTS chunks (
  id BIGSERIAL PRIMARY KEY,
  content_id BIGINT REFERENCES content(id) ON DELETE CASCADE,
  chunk_index INT NOT NULL,
  text TEXT NOT NULL,
  embedding vector(1536),
  word_count INT,
  topics TEXT[],  -- Array of topic tags
  topic_confidence FLOAT,
  quality_score INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Topics index for filtering
CREATE TABLE IF NOT EXISTS topics (
  id BIGSERIAL PRIMARY KEY,
  topic_name TEXT UNIQUE NOT NULL,
  description TEXT,
  keyword_patterns TEXT[],
  chunk_count INT DEFAULT 0
);

-- Query history for analytics
CREATE TABLE IF NOT EXISTS query_history (
  id BIGSERIAL PRIMARY KEY,
  query_text TEXT NOT NULL,
  retrieved_chunks INT,
  response_latency_ms INT,
  user_ip TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_source ON content(source);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(source_type);
CREATE INDEX IF NOT EXISTS idx_chunks_content ON chunks(content_id);
CREATE INDEX IF NOT EXISTS idx_chunks_topics ON chunks USING GIN(topics);
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_query_created ON query_history(created_at);

-- Vector search RPC function
CREATE OR REPLACE FUNCTION search_chunks(
  query_embedding vector(1536),
  similarity_threshold FLOAT DEFAULT 0.1,
  match_count INT DEFAULT 5,
  topic_filter TEXT[] DEFAULT NULL::TEXT[]
)
RETURNS TABLE (
  chunk_id BIGINT,
  content_id BIGINT,
  chunk_index INT,
  text TEXT,
  similarity FLOAT,
  source TEXT,
  title TEXT,
  url TEXT,
  topics TEXT[],
  quality_score INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.content_id,
    c.chunk_index,
    c.text,
    (1 - (c.embedding <=> query_embedding))::FLOAT as similarity,
    ct.source,
    ct.title,
    ct.full_url,
    c.topics,
    c.quality_score
  FROM chunks c
  JOIN content ct ON c.content_id = ct.id
  WHERE
    (1 - (c.embedding <=> query_embedding)) > similarity_threshold
    AND (topic_filter IS NULL OR c.topics && topic_filter)
  ORDER BY c.embedding <=> query_embedding ASC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- Analytics function
CREATE OR REPLACE FUNCTION get_content_stats()
RETURNS TABLE (
  total_content INT,
  total_chunks INT,
  total_words INT,
  avg_quality_score FLOAT,
  top_topics TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT ct.id)::INT,
    COUNT(DISTINCT c.id)::INT,
    COALESCE(SUM(c.word_count), 0)::INT,
    ROUND(AVG(c.quality_score)::NUMERIC, 2)::FLOAT,
    ARRAY_AGG(DISTINCT topic ORDER BY topic)
  FROM content ct
  FULL OUTER JOIN chunks c ON ct.id = c.content_id
  CROSS JOIN LATERAL UNNEST(c.topics) AS topic
  GROUP BY 1;  -- Dummy grouping
END;
$$ LANGUAGE plpgsql;

-- Popular topics view
CREATE OR REPLACE VIEW popular_topics AS
SELECT
  UNNEST(topics) as topic,
  COUNT(*) as chunk_count,
  ROUND(AVG(quality_score)::NUMERIC, 2)::FLOAT as avg_quality
FROM chunks
WHERE topics IS NOT NULL
GROUP BY topic
ORDER BY chunk_count DESC;

-- Content quality view
CREATE OR REPLACE VIEW content_quality_report AS
SELECT
  ct.source,
  ct.platform,
  COUNT(DISTINCT c.id) as total_chunks,
  ROUND(AVG(c.quality_score)::NUMERIC, 2)::FLOAT as avg_quality,
  MIN(c.quality_score) as min_quality,
  MAX(c.quality_score) as max_quality
FROM content ct
LEFT JOIN chunks c ON ct.id = c.content_id
GROUP BY ct.source, ct.platform
ORDER BY avg_quality DESC;
