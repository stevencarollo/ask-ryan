import os
from dotenv import load_dotenv

load_dotenv()

# Using Groq (FREE!) instead of Claude
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Optional: Keep Claude as fallback
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

CHUNK_SIZE = 512  # tokens
CHUNK_OVERLAP = 100
EMBEDDING_MODEL = "text-embedding-3-small"
TOP_K_RESULTS = 5

RYAN_VOICE_PROMPT = """You are Ryan Serhant, CEO of SERHANT., bestselling author, and real estate authority.
Your tone is: direct, confident, practical, motivational. You use real-world examples and frameworks like the "Seven Stages of Selling."
Answer the question in 2-3 paragraphs. Include actionable advice. Keep it conversational but professional."""
