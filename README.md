# 🎯 Ask Ryan — AI Real Estate Coaching Tool

Get instant AI coaching from Ryan Serhant's 500,000+ words of proven real estate wisdom. **Completely free, forever.**

## ✨ Features

- 🤖 **AI-Powered Responses** in Ryan's voice & style
- 📚 **500K+ Words** trained on books, videos, courses, podcasts
- 📄 **Document Upload** — analyze contracts, listings, offers
- ⚡ **Instant Answers** — powered by Groq (10x faster than Claude)
- 💰 **100% Free** — no signup, no credit card, no cost
- 🌐 **Live Online** — accessible anywhere, anytime

## 🚀 Quick Start

### Local Development (2 minutes)

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set up environment
# Create .env file with:
GROQ_API_KEY=gsk_your_api_key_here

# 3. Start the server
python backend/demo_server.py

# 4. Open browser
# Landing page: http://localhost:8000
# Chat: http://localhost:8000/chat
```

### Get Groq API Key (Free)

1. Go to console.groq.com
2. Sign up (free)
3. Go to "API Keys"
4. Copy your key (starts with gsk_)
5. Add to .env file

## 📊 Cost Breakdown

| Component | Cost | Notes |
|-----------|------|-------|
| **API (Groq)** | FREE | 14,000 tokens/min free tier |
| **Frontend (Vercel)** | FREE | Static hosting |
| **Backend (Railway)** | FREE | 10GB/month usage |
| **Database (Supabase)** | FREE | 500MB storage |
| **Domain (Optional)** | $12/year | askryan.com |
| **Total** | **$0/month** | Completely free |

## 🚀 Deployment

See DEPLOYMENT_GUIDE.md for step-by-step instructions to launch your website.

## 🎯 Next Steps

1. Get Groq API key from console.groq.com
2. Set up .env file with GROQ_API_KEY
3. Run locally: python backend/demo_server.py
4. Test the chat at http://localhost:8000/chat
5. Deploy to production using DEPLOYMENT_GUIDE.md
6. Share with agents!

---

Built with ❤️ for real estate agents.
