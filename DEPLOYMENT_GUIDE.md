# Deploy Ask Ryan to the Web — Complete Guide

## 🚀 Overview

Your Ryan Serhant AI coaching tool is ready to go live. This guide walks you through deploying to the web for **FREE** with:

- **Frontend**: Vercel (Static hosting)
- **Backend**: Railway or Render (API hosting)
- **Database**: Supabase (PostgreSQL with pgvector)
- **Domain**: Custom domain (optional)

**Total Cost: $0/month**

---

## Step 1: Prepare Your Code for Deployment

### 1a. Create .env File (Never commit to git!)

```bash
GROQ_API_KEY=gsk_your_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_key_here
```

**Never commit `.env` to git.** Add to `.gitignore`:

```
.env
.env.local
*.pyc
__pycache__/
```

### 1b. Verify requirements.txt

```txt
fastapi==0.104.1
uvicorn==0.24.0
python-dotenv==1.0.0
python-multipart==0.0.6
groq==0.4.1
anthropic==0.7.1
yt-dlp>=2026.1.0
requests>=2.31.0
PyPDF2>=3.0.1
python-docx>=0.8.11
beautifulsoup4>=4.12.2
supabase==1.4.0
pandas>=2.0.0
numpy>=1.24.0
```

---

## Step 2: Deploy Frontend to Vercel (2 min)

### Option A: Deploy from GitHub (Recommended)

**2a. Push to GitHub**
```bash
cd C:\Users\Steve Carollo.MiniReem\Downloads\ryan-serhant-tool
git init
git add .
git commit -m "Initial commit: Ryan Serhant AI coaching tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ask-ryan
git push -u origin main
```

**2b. Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `ask-ryan` repo
5. Vercel auto-detects it's a static site
6. Click "Deploy"

**Result**: Your landing page is live at `ask-ryan.vercel.app`

### Option B: Manual Upload

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Drag and drop these files:
   - `landing.html`
   - `frontend.html`
   - (Any CSS/JS files)

---

## Step 3: Deploy Backend to Railway (5 min)

### 3a. Prepare Backend

Create a `Procfile` in your project root:
```
web: uvicorn backend.demo_server:app --host 0.0.0.0 --port $PORT
```

Create `runtime.txt`:
```
python-3.11.0
```

### 3b. Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Choose your `ask-ryan` repo
6. Railway auto-detects Python + installs dependencies

### 3c. Set Environment Variables

In Railway Dashboard:
1. Click your project
2. Go to "Variables"
3. Add:
   - `GROQ_API_KEY` = `gsk_your_key`
   - `SUPABASE_URL` = `https://your-project.supabase.co`
   - `SUPABASE_KEY` = `your_key`

**Railway Auto-generates URL**: `ask-ryan-staging-production.up.railway.app`

---

## Step 4: Connect Frontend to Backend

Update your frontend URLs:

**In `landing.html` (line with "Try Now" button):**
```html
<a href="https://api.askryan.com/chat" class="cta-button">Try Now</a>
<!-- or for Railway: -->
<a href="https://ask-ryan-staging-production.up.railway.app/chat" class="cta-button">Try Now</a>
```

**In `frontend.html` (around line 240):**
```javascript
const API_URL = 'https://ask-ryan-staging-production.up.railway.app';
// or
const API_URL = 'https://api.askryan.com';
```

---

## Step 5: Set Up Custom Domain (Optional)

### 5a. Buy Domain

Popular options:
- Namecheap: $8-12/year
- Google Domains: $12/year
- Vercel Domains: Built-in

### 5b. Connect to Vercel

**For landing page** (`askryan.com` → Vercel):

1. In Vercel Dashboard
2. Go to Project Settings → Domains
3. Add your domain
4. Update DNS records (Vercel shows the exact records)

**For backend API** (`api.askryan.com` → Railway):

1. In Railway Dashboard
2. Go to project settings
3. Add custom domain
4. Update DNS CNAME record to Railway's provided URL

### 5c. DNS Records

If using Namecheap/Google Domains, add:

```
Type: A
Name: @
Value: (from Vercel)

Type: CNAME
Name: api
Value: (from Railway)

Type: CNAME
Name: www
Value: askryan.com (or your domain)
```

---

## Step 6: Update Frontend API Calls

Once your backend is deployed, update `frontend.html`:

```javascript
// Line ~240, replace:
const API_URL = 'http://localhost:8000';

// With your production URL:
const API_URL = 'https://api.askryan.com'; // or your Railway URL
```

Also update the button links in `landing.html`:

```html
<!-- Old -->
<a href="/frontend.html" class="cta-button">Start Coaching →</a>

<!-- New (for deployed version) -->
<a href="https://api.askryan.com/chat" class="cta-button">Start Coaching →</a>
```

---

## Step 7: Enable CORS (Already Done!)

Your `demo_server.py` already has this:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

This means your Vercel frontend can call your Railway backend. ✅

---

## Step 8: Test Everything

### Local Testing
```bash
# Terminal 1: Start backend
cd C:\Users\Steve Carollo.MiniReem\Downloads\ryan-serhant-tool
python backend/demo_server.py

# Terminal 2: Open browser
# Landing page: http://localhost:8000
# Chat: http://localhost:8000/chat
# API: http://localhost:8000/api/query
```

### After Deployment

1. **Test landing page**
   - Visit: `https://askryan.vercel.app`
   - Check: Navigation works, buttons visible

2. **Test chat interface**
   - Visit: `https://api.askryan.com/chat`
   - Ask a question
   - Verify API response appears

3. **Test API directly**
   ```bash
   curl -X POST https://api.askryan.com/api/query \
     -H "Content-Type: application/json" \
     -d '{"query":"How do I close deals?"}'
   ```

---

## Step 9: Monitor & Maintain

### Check Logs

**Vercel**: Dashboard → Deployments → Logs
**Railway**: Dashboard → Deployments → Logs

### Monitor API Health

Add this to your monitoring:
```bash
# Check if backend is running
curl https://api.askryan.com/api/health

# Should return:
# {"status":"healthy","timestamp":"...","service":"Ryan Serhant Response Tool"}
```

### Auto-Deploy from Git

Both Vercel and Railway auto-deploy when you push to `main` branch:

```bash
git add .
git commit -m "Update landing page"
git push origin main
# Vercel + Railway auto-deploy! ✅
```

---

## Troubleshooting

### ❌ "CORS Error" or "Failed to fetch"

**Problem**: Frontend can't reach backend
**Solution**: Check API_URL in `frontend.html` matches your Railway URL

```javascript
// ✅ Correct
const API_URL = 'https://ask-ryan-staging-production.up.railway.app';

// ❌ Wrong
const API_URL = 'http://localhost:8000';
```

### ❌ "404 Not Found" on landing page

**Problem**: Vercel can't find `landing.html`
**Solution**: Verify file is in repo root

```bash
ls landing.html  # Should exist
```

### ❌ "500 Error" on API

**Problem**: Backend crashed or missing environment variable
**Solution**: Check Railway logs

1. Go to Railway Dashboard
2. Click your project
3. Go to "Deployments" → Latest → "Logs"
4. Look for error messages

### ❌ "GROQ_API_KEY not found"

**Problem**: Environment variable not set
**Solution**: Add to Railway Variables

1. Railway Dashboard → Your Project → Variables
2. Add: `GROQ_API_KEY` = `gsk_your_key`
3. Trigger redeploy: `git push`

---

## Domain Options & Pricing

| Domain | Price | Setup |
|--------|-------|-------|
| **askryan.com** | $12/year | Namecheap |
| **askaryan.ai** | $50/year | Namecheap |
| **ryancoach.app** | $15/year | Google Domains |
| **coaching.pro** | $20/year | Namecheap |

**Recommended**: `askryan.com` (short, memorable, affordable)

---

## Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| **Vercel** | FREE | 50GB/month bandwidth |
| **Railway** | FREE | 10GB/month usage (plenty) |
| **Supabase** | FREE | 500MB storage |
| **Domain** | $12/year | Optional (askryan.com) |
| **Groq API** | FREE | 14k tokens/min free tier |
| **Total** | **$0-$1/month** | ✅ Forever free |

---

## Next Steps

1. ✅ Prepare `.env` file locally (never commit)
2. ✅ Push code to GitHub
3. ✅ Deploy frontend to Vercel
4. ✅ Deploy backend to Railway
5. ✅ Update API URLs in frontend
6. ✅ Test everything works
7. ✅ (Optional) Buy custom domain
8. ✅ Share link with agents!

---

## Share Your Tool

Once live, share with real estate agents:

**Short URL**: `https://askryan.com`

**Marketing copy**:
> Ask Ryan — Get free AI coaching from Ryan Serhant's proven frameworks. No credit card, no signup, no cost. Just ask.

---

## Support

- **Vercel Help**: vercel.com/docs
- **Railway Help**: railway.app/docs
- **Groq Help**: console.groq.com/docs

---

**You're live! 🚀** Congrats on launching Ask Ryan!
