# 🚀 Launch Checklist — Ask Ryan

Everything you need to go live with your AI coaching tool.

## ✅ Pre-Launch (Local Testing)

- [ ] Have Groq API key (from console.groq.com)
- [ ] Created .env file with GROQ_API_KEY
- [ ] .env added to .gitignore (never commit!)
- [ ] Run `pip install -r requirements.txt`
- [ ] Start server: `python backend/demo_server.py`
- [ ] Test landing page: http://localhost:8000
- [ ] Test chat: http://localhost:8000/chat
- [ ] Ask a test question and get response
- [ ] Upload a test document
- [ ] All tests pass ✅

## ✅ GitHub Setup

- [ ] Create GitHub repo (`ask-ryan`)
- [ ] Push your code to GitHub
- [ ] Verify all files are there (except .env)
- [ ] .gitignore includes `.env`

## ✅ Frontend Deployment (Vercel)

- [ ] Go to vercel.com
- [ ] Sign in with GitHub
- [ ] Import `ask-ryan` repository
- [ ] Accept defaults (Vercel auto-detects static site)
- [ ] Click "Deploy"
- [ ] Wait for deployment (2 min)
- [ ] Get frontend URL: `https://ask-ryan.vercel.app`
- [ ] Visit URL and see landing page ✅

## ✅ Backend Deployment (Railway)

- [ ] Create `Procfile` in project root (already done)
- [ ] Create `runtime.txt` with Python version (already done)
- [ ] Go to railway.app
- [ ] Sign in with GitHub
- [ ] Create new project from your repo
- [ ] Railway auto-installs dependencies
- [ ] Go to "Variables" tab
- [ ] Add environment variables:
  - GROQ_API_KEY = gsk_...
  - (Optional: SUPABASE_URL, SUPABASE_KEY)
- [ ] Wait for deployment (3-5 min)
- [ ] Get backend URL: `https://ask-ryan-xxx.railway.app`
- [ ] Test API: curl `https://ask-ryan-xxx.railway.app/api/health`
- [ ] Should return `{"status":"healthy"...}` ✅

## ✅ Connect Frontend to Backend

- [ ] Open `landing.html` in your editor
- [ ] Update button link:
  ```html
  <a href="https://ask-ryan-xxx.railway.app/chat" class="cta-button">
  ```
- [ ] Open `frontend.html`
- [ ] Update API_URL (line ~240):
  ```javascript
  const API_URL = 'https://ask-ryan-xxx.railway.app';
  ```
- [ ] Save both files
- [ ] Push changes to GitHub:
  ```bash
  git add .
  git commit -m "Update API URLs for production"
  git push origin main
  ```
- [ ] Vercel auto-deploys (wait 1 min)
- [ ] Railway auto-redeploys (wait 1 min)

## ✅ Test Production

- [ ] Visit landing page: `https://ask-ryan.vercel.app`
- [ ] Click "Start Coaching" button
- [ ] Should redirect to chat interface
- [ ] Ask a test question
- [ ] Should see Ryan's response ✅
- [ ] Try uploading a document
- [ ] Should process and respond ✅
- [ ] Check API directly:
  ```bash
  curl https://ask-ryan-xxx.railway.app/api/health
  ```

## ✅ Custom Domain (Optional)

- [ ] Choose domain name (askryan.com recommended)
- [ ] Go to namecheap.com or google.com/domains
- [ ] Buy domain ($12-15/year)
- [ ] Go to Vercel dashboard
- [ ] Project Settings → Domains
- [ ] Add your domain
- [ ] Vercel shows DNS records
- [ ] Update DNS records at your registrar
- [ ] Wait for DNS propagation (15 min - 2 hours)
- [ ] Test domain: https://askryan.com ✅

## ✅ Share with the World

- [ ] Create short link: bit.ly/askryan
- [ ] Marketing copy ready:
  > "Ask Ryan — Free AI coaching from Ryan Serhant. Get instant responses to your real estate questions. No credit card. No cost. Ever."
- [ ] Share on:
  - [ ] LinkedIn
  - [ ] Email to agents
  - [ ] Real estate Facebook groups
  - [ ] WhatsApp/Slack groups
  - [ ] Agent network

## ✅ Post-Launch Monitoring

- [ ] Set up health monitoring
- [ ] Check logs if any issues
- [ ] Monitor API response times
- [ ] Collect user feedback
- [ ] Make improvements based on feedback

---

## 📋 Quick Reference

### Local URLs
- Landing: http://localhost:8000
- Chat: http://localhost:8000/chat
- API: http://localhost:8000/api/query

### Production URLs
- Frontend: https://ask-ryan.vercel.app
- Backend: https://ask-ryan-xxx.railway.app
- Custom: https://askryan.com (if set up)

### Commands
```bash
# Start server locally
python backend/demo_server.py

# Test API
curl https://api.askryan.com/api/health

# Deploy changes
git add .
git commit -m "Your message"
git push origin main
# (Auto-deploys to Vercel + Railway)
```

---

## 🎯 Estimated Timeline

| Step | Time |
|------|------|
| Setup .env | 2 min |
| Test locally | 5 min |
| Push to GitHub | 2 min |
| Deploy frontend | 3 min |
| Deploy backend | 5 min |
| Connect frontend | 2 min |
| Test production | 5 min |
| **Total** | **~25 minutes** |

## ⚠️ Common Issues & Fixes

### "CORS Error" when clicking "Start Coaching"
→ Update API_URL in frontend.html to match your Railway URL

### "API error: 404"
→ Check that backend is running and API_URL is correct

### "GROQ_API_KEY not found"
→ Add environment variable to Railway dashboard

### Landing page loads but "Try Now" doesn't work
→ Check link in landing.html points to correct chat URL

## 📞 Need Help?

1. Check DEPLOYMENT_GUIDE.md for detailed instructions
2. Check Railway/Vercel logs for errors
3. Test API with curl:
   ```bash
   curl -X POST https://your-api-url/api/query \
     -H "Content-Type: application/json" \
     -d '{"query":"Test question"}'
   ```

---

**Ready? Follow this checklist in order and you'll be live in 30 minutes!** 🚀
