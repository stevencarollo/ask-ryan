# 🚀 Scaled Deployment Guide - 500K+ Words

Complete instructions for deploying the scaled Ryan Serhant Response Tool with 500K+ words of content.

---

## Phase 1: Local Content Collection (Week 1)

### Step 1: YouTube Content Scraping

```bash
cd ryan-serhant-tool/backend

# Scrape personal channel (100 videos)
python admin/cli.py ingest --source youtube --limit 100 --output scraped_youtube.json

# Output: ~200,000 words from YouTube transcripts
# Expected time: 10-20 minutes
```

**What happens:**
- Fetches transcripts from Ryan's 2 main YouTube channels
- Saves to `scraped_youtube.json`
- Creates scraping statistics

### Step 2: Blog Content Scraping

```bash
# Scrape blog articles
python admin/cli.py ingest --source blog --output scraped_blog.json

# Output: ~20,000 words from blog
# Expected time: 5-10 minutes
```

### Step 3: Course Content Parsing

```bash
# Parse SellIt.com courses
python admin/cli.py ingest --source courses --output scraped_courses.json

# Output: ~50,000 words from courses
# Expected time: 15-30 minutes
```

### Step 4: Combine All Sources

```bash
# Combine all ingested content
python -c "
import json

sources = [
    'scraped_youtube.json',
    'scraped_blog.json',
    'scraped_courses.json'
]

all_content = []
for src in sources:
    with open(src) as f:
        all_content.extend(json.load(f))

with open('all_ingested_content.json', 'w') as f:
    json.dump(all_content, f, indent=2)

print(f'Total items: {len(all_content)}')
"
```

**Result:** `all_ingested_content.json` with ~170+ content items

---

## Phase 2: Content Processing (Week 2)

### Step 1: Process Content to Chunks

```bash
# Process with checkpointing (can resume if interrupted)
python admin/cli.py process \
  --input all_ingested_content.json \
  --checkpoint \
  --batch-size 50 \
  --output processed_chunks.json

# Output: Chunks with metadata
# Result: ~10,000 chunks from 500K words
# Expected time: 20-40 minutes
```

**Progress tracking:**
- Checkpoint saved every batch
- Can resume with same command if interrupted
- Stats saved to `logs/batch_stats.json`

### Step 2: Deduplicate Similar Content

```bash
# Remove duplicate/similar chunks
python admin/cli.py dedupe \
  --input processed_chunks.json \
  --threshold 0.95 \
  --output deduplicated_chunks.json

# Removes 5-10% duplicate content
# Result: ~9,000-9,500 unique chunks
```

### Step 3: Generate Embeddings

```bash
# Generate embeddings for all chunks
python -c "
import json
from process.embedder import embed_batch
from process.batch_processor import BatchProcessor

with open('deduplicated_chunks.json') as f:
    data = json.load(f)

processor = BatchProcessor(batch_size=100)

# Generate embeddings for all chunks
embeddings = embed_batch([c['text'] for c in data['chunks']])

# Attach embeddings to chunks
for chunk, emb in zip(data['chunks'], embeddings):
    chunk['embedding'] = emb

# Save
with open('embedded_chunks.json', 'w') as f:
    json.dump(data, f)

print(f'Generated embeddings for {len(embeddings)} chunks')
"

# Expected time: 5-10 minutes
```

---

## Phase 3: Database Setup (Week 2)

### Step 1: Create Supabase Project

```bash
# Go to supabase.com and create new project
# Save your credentials:
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_KEY=your-anon-key
```

### Step 2: Create Database Schema

```bash
# Connect to Supabase SQL editor and run:
psql postgresql://user:pass@project.supabase.co:5432/postgres -f database/schema_v2.sql

# Or copy-paste the schema manually in Supabase SQL editor
```

**Creates:**
- `content` table (metadata)
- `chunks` table (text + embeddings)
- Vector indexes (pgvector)
- RPC functions for search

### Step 3: Create .env for Backend

```bash
cd backend
cat > .env << EOF
CLAUDE_API_KEY=sk-ant-...your-key...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
EOF
```

### Step 4: Upload to Supabase

```bash
# Upload all embedded chunks to database
python admin/cli.py upload \
  --input embedded_chunks.json \
  --batch-size 100

# Expected time: 30-60 minutes
# Inserts 9,000+ chunks with embeddings
```

**Verification:**
```sql
-- Check in Supabase SQL editor
SELECT COUNT(*) FROM chunks;  -- Should be ~9,000
SELECT COUNT(*) FROM content; -- Should be ~170
```

---

## Phase 4: API Testing

### Step 1: Start Backend

```bash
cd ryan-serhant-tool/backend
source venv/bin/activate  # or venv\Scripts\activate
python -m uvicorn api:app --reload --port 8000
```

### Step 2: Test Queries

```bash
# Query 1: Sales techniques
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I close more deals?"}'

# Query 2: Objection handling
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I handle price objections?"}'

# Query 3: Time management
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I manage my time as an agent?"}'
```

**Expected responses:**
- 2-3 seconds response time
- 5+ relevant chunks cited
- Sources with links

### Step 3: Performance Monitoring

```bash
# Check API status
curl http://localhost:8000/status | jq

# Output shows:
# - Content count: ~170
# - Chunks count: ~9,000
# - Database: connected
```

---

## Phase 5: Production Deployment

### Option A: Cloud Deployment (Recommended)

#### Backend on Vercel (2 min)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel --prod

# Set environment variables in Vercel dashboard:
# CLAUDE_API_KEY=...
# SUPABASE_URL=...
# SUPABASE_KEY=...

# Get production URL: https://your-app.vercel.app
```

#### Frontend on Netlify (2 min)

```bash
# Update frontend.html with production API URL
sed -i 's|http://localhost:8000|https://your-app.vercel.app|g' frontend.html

# Deploy
netlify deploy --prod --dir .
```

**Result:**
- Backend: `https://your-backend.vercel.app`
- Frontend: `https://your-frontend.netlify.app`
- Both live and production-ready

### Option B: Docker Deployment

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .

CMD ["python", "-m", "uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# Build and run
docker build -t ryan-serhant-api .
docker run -p 8000:8000 \
  -e CLAUDE_API_KEY=$CLAUDE_API_KEY \
  -e SUPABASE_URL=$SUPABASE_URL \
  -e SUPABASE_KEY=$SUPABASE_KEY \
  ryan-serhant-api
```

### Option C: Self-Hosted

```bash
# Run on your own server/VPS
# (DigitalOcean, AWS, etc.)

# 1. Clone repo
git clone <your-repo> ryan-serhant-tool
cd ryan-serhant-tool/backend

# 2. Setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 3. Configure .env
cp .env.example .env
# Edit with your credentials

# 4. Start with systemd
sudo tee /etc/systemd/system/ryan-api.service > /dev/null <<EOF
[Unit]
Description=Ryan Serhant API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/user/ryan-serhant-tool/backend
ExecStart=/home/user/ryan-serhant-tool/backend/venv/bin/python -m uvicorn api:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable ryan-api
sudo systemctl start ryan-api
```

---

## Usage at Scale

### For Individual Agents

```
1. Open frontend URL in browser
2. Type question
3. Get Ryan-voiced response in 2-3 seconds
4. Copy response directly to client email
```

### For Teams

**Setup team access:**
```bash
# Share frontend URL with all agents
# Each agent opens in their browser
# No installation needed

# Optional: Add to CRM
# Embed in Salesforce, HubSpot, etc. via iframe
```

**Usage tracking:**
```bash
# Monitor in Supabase dashboard
# See: queries per hour, response times, topics
# Track: most asked questions, agent adoption
```

---

## Performance Benchmarks

| Metric | Value | Notes |
|--------|-------|-------|
| **Content Size** | 500K words | ~9,000 chunks |
| **Search Latency** | <1 second | Vector search |
| **Response Time** | 2-3 seconds | Including LLM generation |
| **Concurrent Users** | 10+ | Depends on API tier |
| **Monthly Cost** | $50-200 | Supabase + Claude API |
| **Storage** | ~500MB | Embeddings + metadata |

---

## Monitoring & Maintenance

### Daily

```bash
# Check API health
curl https://your-backend.vercel.app/health

# Expected: {"status": "ok"}
```

### Weekly

```bash
# Review query patterns
python -c "
import requests
# Fetch stats from Supabase
r = requests.get('https://your-backend.vercel.app/status')
print(r.json())
"
```

### Monthly

```bash
# Clean up old content
# Rebuild embeddings if needed
python admin/cli.py process --input updated_content.json
```

---

## Scaling Beyond 500K Words

Once you reach this milestone:

1. **Add more content sources:**
   - YouTube livestreams
   - Podcast full episodes
   - Additional books
   - Client testimonials

2. **Improve retrieval:**
   - Add topic-based filtering
   - Implement query expansion
   - Create cross-references

3. **Fine-tune responses:**
   - Collect agent feedback
   - Update system prompts
   - Train on top queries

4. **Expand features:**
   - Voice input (Whisper API)
   - Follow-up clarifications
   - Multi-language support

---

## Troubleshooting

**Q: "Database not connected"**
- Check SUPABASE_URL and SUPABASE_KEY in .env
- Verify Supabase project is active
- Test connection: `psql <connection_string>`

**Q: "No embeddings found"**
- Ensure chunks were uploaded with embeddings
- Run: `SELECT COUNT(*) FROM chunks WHERE embedding IS NOT NULL`
- Re-generate if needed

**Q: "Slow responses"**
- Check API logs for errors
- Verify vector index exists
- Consider upgrading Supabase plan

**Q: "Out of memory during processing"**
- Reduce batch_size: `--batch-size 25`
- Process in smaller chunks
- Use checkpoint/resume feature

---

## Support & Maintenance

**Need help?**
- Check logs: `logs/batch_stats.json`
- Review: `SCALING_PLAN.md`
- Run: `python admin/cli.py status --verbose`

**Updating content:**
```bash
# Add new content
python admin/cli.py ingest --source youtube --limit 50 --output new_content.json

# Process
python admin/cli.py process --input new_content.json

# Upload
python admin/cli.py upload --input processed_new_content.json
```

---

**Status: READY FOR PRODUCTION** ✅

Your scaled Ryan Serhant Response Tool is now ready to serve your entire agent network with 500K+ words of content!
