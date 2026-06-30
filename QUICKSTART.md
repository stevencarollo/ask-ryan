# 🚀 Quick Start - Ryan Serhant Response Tool

**Get the tool running in 2 minutes.**

## On Windows

### Step 1: Start the Backend

Double-click `START.bat` in the project folder.

You'll see:
```
========================================
Backend is starting on http://localhost:8000
========================================

API Status:  http://localhost:8000/health
Query Endpoint: http://localhost:8000/query

Frontend: Open frontend.html in your browser
```

### Step 2: Open the Frontend

Open `frontend.html` in your browser. Drag it to your browser or:
1. Right-click `frontend.html`
2. Select "Open with" → Your browser

### Step 3: Ask Questions!

Type in a question like:
- "How do I close more real estate deals?"
- "What's your best sales script?"
- "How should I handle price objections?"

Click **"Ask Ryan"** and get a response in his voice with citations.

---

## On Mac/Linux

### Step 1: Open Terminal

```bash
cd /path/to/ryan-serhant-tool
```

### Step 2: Start Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn api:app --reload --port 8000
```

### Step 3: Open Frontend

In another terminal:
```bash
# Open in default browser
open ../frontend.html

# OR manually navigate to:
# file:///path/to/ryan-serhant-tool/frontend.html
```

### Step 4: Ask Questions!

Same as Windows - type questions and click "Ask Ryan".

---

## No Installation Needed (Demo Mode)

The tool comes with sample content built-in:
- 7 chapters from "Sell It Like Serhant"
- 2 Ryan Serhant interview transcripts
- Sales frameworks and strategies

**You don't need to set up a database or API keys** to get started.

---

## Troubleshooting

### "Port 8000 already in use"

Change the port in START.bat or terminal:
```bash
python -m uvicorn api:app --port 8001 --reload
```

Then update `API_URL` in `frontend.html` to `http://localhost:8001`

### "Python not found"

Make sure Python 3.11+ is installed:
```bash
python --version
# or
python3 --version
```

### Frontend can't reach backend

1. Check backend is running: Visit http://localhost:8000/health
2. Wait 5 seconds for backend to start
3. Refresh browser (Ctrl+R)

---

## Next: Scale It Up

### Add Claude API Key (Better Responses)

1. Get a key from claude.ai or anthropic.com
2. Create `.env` file in the `backend/` folder:
   ```
   CLAUDE_API_KEY=sk-ant-...your-key...
   ```
3. Restart backend

Now responses will be even more authentic Ryan Serhant style.

### Add Your Own Content

Edit `backend/collect/book_parser.py` to add more chapters/content, then call:
```bash
python main.py collect
python main.py process
```

---

## What's Happening Under the Hood?

1. **Frontend** → You type a question in `frontend.html`
2. **API Call** → Question sent to `http://localhost:8000/query`
3. **Search** → System finds 5 most relevant Ryan content pieces
4. **Generate** → Claude creates a response in Ryan's voice
5. **Display** → Response + citations shown in browser

All in ~2 seconds! ⚡

---

## Stopping the Tool

**Windows:** Close the command window (or Ctrl+C)
**Mac/Linux:** Press Ctrl+C in terminal

---

**Questions?** See README.md for full documentation.

**Ready?** Start the backend and begin asking! 🎯
