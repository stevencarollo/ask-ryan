# Ryan Serhant Response Tool - Complete Deployment Guide

## 📋 Quick Start (Development)

```bash
# Clone/navigate to repo
cd ryan-serhant-tool

# Install dependencies
pip install -r requirements.txt

# Run backend
python backend/main.py api --port 8000

# Open frontend
# In browser: file:///path/to/frontend.html
```

## 🚀 Production Deployment

### Option 1: Vercel (Recommended - Frontend)

```bash
# Deploy frontend to Vercel
vercel --prod

# Backend needs separate hosting (see options below)
```

### Option 2: Docker (Full Stack)

```bash
# Build image
docker build -t ryan-serhant-tool .

# Run container
docker run -p 8000:8000 -e CLAUDE_API_KEY=$CLAUDE_API_KEY ryan-serhant-tool

# Docker Compose for Supabase + Backend
docker-compose up -d
```

### Option 3: Heroku

```bash
# Login and create app
heroku login
heroku create ryan-serhant-tool

# Set environment variables
heroku config:set CLAUDE_API_KEY=$CLAUDE_API_KEY
heroku config:set SUPABASE_URL=$SUPABASE_URL
heroku config:set SUPABASE_KEY=$SUPABASE_KEY

# Deploy
git push heroku main
```

## 🗄️ Database Setup (Supabase)

1. **Create Supabase project**
   - Go to supabase.com
   - Create new project
   - Note: Project URL, API key, Database URL

2. **Initialize schema**
   ```bash
   # Connect via psql
   psql postgresql://[user]:[password]@[host]/postgres
   
   # Run schema
   \i database/schema_v2.sql
   ```

3. **Environment variables**
   ```bash
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
   SUPABASE_DB_URL=postgresql://user:password@host/dbname
   ```

## 🔧 Configuration

### Backend (backend/config.py)

```python
# API Configuration
API_PORT = 8000
API_HOST = "0.0.0.0"
API_DEBUG = False

# Database
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Claude API
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")
CLAUDE_MODEL = "claude-opus-4-1-20250805"

# Content Settings
MAX_CHUNK_SIZE = 2000
CHUNK_OVERLAP = 512
SIMILARITY_THRESHOLD = 0.1
TOP_K_RESULTS = 5
```

### Frontend (frontend.html)

```javascript
const API_URL = "https://your-backend.com/api";
const WS_URL = "wss://your-backend.com/ws";
```

## 📊 Admin Dashboard

Access at: `http://localhost:8000/admin/dashboard`

Features:
- Content statistics
- System health monitoring
- Processing pipeline status
- Query analytics
- Quick actions (ingest, sync, backup)

## 🔌 API Endpoints

```
GET    /api/health              - System status
GET    /api/status              - Detailed metrics
POST   /api/query               - Execute query
  {
    "query": "how to close deals",
    "top_k": 5,
    "strategy": "hybrid"
  }

POST   /api/load-content        - Ingest new content
GET    /api/topics              - Available topics
POST   /api/admin/ingest        - Admin: ingest content
GET    /api/admin/logs          - Admin: system logs
```

## 📦 Content Ingestion Pipeline

```
1. Collect (youtube, blog, course, book, podcast)
   ↓
2. Parse & Normalize
   ↓
3. Chunk (512 tokens, overlap=256)
   ↓
4. Deduplicate (Jaccard similarity > 0.85)
   ↓
5. Enrich (topics, metadata)
   ↓
6. Generate embeddings
   ↓
7. Upload to Supabase
   ↓
8. Index vectors
```

## 🎯 Advanced Retrieval Strategies

**Hybrid Search** (Default)
- Combines vector + keyword + topic search
- Best overall quality

**Vector Search**
- Pure semantic similarity
- Fast, works best with clear questions

**Keyword Search**
- Full-text matching
- Useful for specific terms

**Topic Filter**
- Constrain to specific topics
- Example: `sales_fundamentals`, `objection_handling`

## 📈 Scaling to 500K+ Words

The architecture supports:
- **150+ videos** (YouTube)
- **Multiple books** (complete texts)
- **50+ blog posts**
- **Courses** with 50+ lessons
- **Podcast transcripts** (10+ episodes)

**Performance targets:**
- Ingestion: 50K words/min
- Processing: 10K chunks/min
- Query latency: <500ms (P95)
- Concurrent queries: 100+

## 🔐 Security Best Practices

- [ ] Set `API_DEBUG = False` in production
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for trusted domains
- [ ] Rate limit API endpoints (100 req/min per IP)
- [ ] Validate all user input
- [ ] Use HTTPS in production
- [ ] Rotate API keys regularly

## 📝 Monitoring & Alerts

Monitor these metrics:
- API response latency (target: <300ms)
- Database query time (target: <100ms)
- Cache hit rate (target: >30%)
- Error rate (target: <1%)

Alerts triggered when:
- Latency > 1000ms
- Error rate > 5%
- Database timeout > 30s
- Cache hit rate < 20%

Access monitoring at: `http://localhost:8000/admin/monitoring`

## 🚨 Troubleshooting

**High latency?**
- Check database connection
- Verify embeddings are cached
- Scale up worker processes

**Low cache hit rate?**
- More diverse queries → normal
- Check cache configuration
- Increase cache size if available

**Embedding generation errors?**
- Verify Claude API key
- Check rate limits
- Use fallback embedding mode

**Database connection failures?**
- Verify Supabase credentials
- Check network connectivity
- Run health check: `GET /api/health`

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Claude API Guide](https://claude.ai/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [Project README](README.md)

## ✅ Pre-Launch Checklist

- [ ] All content ingested and processed
- [ ] Database seeded with vectors
- [ ] API endpoints tested
- [ ] Frontend loads without errors
- [ ] Admin dashboard accessible
- [ ] Monitoring configured
- [ ] Backup system in place
- [ ] API keys secured
- [ ] Error handling tested
- [ ] Load testing passed
- [ ] Documentation complete
- [ ] Team trained

## 🎉 You're Ready!

Your Ryan Serhant Response Tool is now deployed and ready to serve real estate agents with AI-powered coaching in Ryan's voice.

Questions? Check the troubleshooting section or review the logs at `/admin/logs`.
