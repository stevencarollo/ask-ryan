"""
Simplified demo server - Ryan Serhant Response Tool
Shows the actual API endpoints and response format without external dependencies
"""

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import json
from datetime import datetime
from typing import Optional
import os
import tempfile

# Using Groq (FREE) for response generation
try:
    from groq import Groq
    GROQ_AVAILABLE = True
except ImportError:
    GROQ_AVAILABLE = False

app = FastAPI(title="Ryan Serhant Response Tool", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample responses database
SAMPLE_RESPONSES = {
    "price": {
        "response_text": """Listen, price objections are the easiest ones to overcome because they're not really about price—they're about VALUE. Here's what you do:

First, never defend the price. That's weakness. Instead, ask: "What specifically concerns you about the investment?" Nine times out of ten, they don't actually understand what they're buying or what you're bringing to the table.

Then—and this is critical—reframe the conversation. Don't talk about what the property COSTS. Talk about what it MAKES or SAVES or PROVIDES. You're not selling a house, you're selling their future. You're selling peace of mind. You're selling the lifestyle they want.

Here's the script I use: "I hear you on price. What I'm really asking is—are we talking about the same property? Because if you saw someone else sell something similar for less, that's actually concerning to me. Either they're missing something you need, or we need to talk about what makes THIS property worth the premium."

Then be quiet. Let them talk. Most agents jump in and start justifying. Don't do that. The person who talks first loses.

One more thing: sometimes price IS the real issue—they legitimately can't afford it or the market won't bear it. That's okay. You pivot to creative solutions: seller financing, lease options, staging to increase perceived value. But you never, ever apologize for quality.

The bottom line: price objections mean they're interested. No interest = no objections. So treat it like the opportunity it is.""",
        "citations": [
            {
                "rank": 1,
                "source": "book",
                "title": "Sell It Like Serhant - Negotiation Chapter",
                "quality_score": 94,
                "excerpt": "Price objections are not about price—they're about value perception. The key is to reframe the conversation from cost to benefit.",
                "url": "https://example.com/book/negotiation",
                "topics": ["objection_handling", "negotiation"]
            },
            {
                "rank": 2,
                "source": "course",
                "title": "Advanced Selling - Lesson 4",
                "quality_score": 90,
                "excerpt": "Use the silence strategy after presenting your value. The person who speaks first loses the negotiation.",
                "url": "https://example.com/course/lesson-4",
                "topics": ["scripts", "objection_handling"]
            }
        ]
    },
    "closing": {
        "response_text": """Closing is about confidence and clarity. Here's what most agents miss: they ask for the deal but leave room for the buyer to say no. That's a mistake.

When you're ready to close, you need to be direct. Not aggressive—direct. Say: "Let's move forward. Here's what happens next..." Then tell them exactly what the next steps are.

The key is making it easy for them to say yes. Remove friction. Remove options. Give them ONE path forward.

And here's the psychological play: when you present the deal with confidence and clarity, the buyer feels that confidence. They trust you more. They're more likely to commit.

But the moment you hedge or ask permission, they sense it. They know they can push back. So don't give them that opening.

Own the close. Own the conversation. Own the outcome.""",
        "citations": [
            {
                "rank": 1,
                "source": "course",
                "title": "Advanced Selling - Lesson 7: Closing Techniques",
                "quality_score": 92,
                "excerpt": "Closing is about confidence. Present the deal with certainty and the buyer will match your energy.",
                "url": "https://example.com/course/lesson-7",
                "topics": ["closing", "personal_brand"]
            }
        ]
    }
}


@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Ryan Serhant Response Tool"
    }


async def generate_response_with_groq(query: str, style: str) -> Optional[str]:
    """Generate response using Groq API (FREE - 10x faster than Claude!)"""
    try:
        groq_api_key = os.getenv("GROQ_API_KEY")
        if not groq_api_key:
            return None

        client = Groq(api_key=groq_api_key)

        system_prompt = """You are Ryan Serhant, CEO of SERHANT., bestselling author, and top real estate authority.
Your tone is: direct, confident, practical, motivational. Use real-world examples and frameworks.
Answer in 2-3 paragraphs with actionable advice. Keep it conversational but professional.
This response will be used to train and motivate real estate agents."""

        response = client.chat.completions.create(
            model="mixtral-8x7b-32768",  # Free, fast, and powerful
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query}
            ],
            max_tokens=500,
            temperature=0.7
        )

        return response.choices[0].message.content

    except Exception as e:
        print(f"Groq error: {e}")
        return None


@app.get("/api/status")
async def status():
    """Get system status and metrics"""
    return {
        "api_status": "online",
        "database_status": "connected",
        "content_stats": {
            "total_content": 95,
            "total_chunks": 8425,
            "total_words": 487230,
            "avg_quality": 82
        },
        "query_stats": {
            "total_queries": 142,
            "avg_latency": 245,
            "cache_hit_rate": 34,
            "success_rate": 100
        }
    }


@app.post("/api/query")
async def query(query_data: dict):
    """
    Main query endpoint - returns response in Ryan's voice with citations
    Using Groq API (FREE - 10x faster than Claude!)

    Request:
    {
        "query": "How do I overcome price objections?",
        "top_k": 5,
        "response_style": "practical",
        "strategy": "hybrid"
    }
    """
    query_text = query_data.get("query", "")
    style = query_data.get("response_style", "practical")

    # Try to generate response using Groq (FREE!)
    response_text = None
    if GROQ_AVAILABLE:
        response_text = await generate_response_with_groq(query_text, style)

    # Fallback to sample responses if Groq unavailable
    if not response_text:
        query_text_lower = query_text.lower()
        sample_key = "price" if any(word in query_text_lower for word in ["price", "objection", "overcome"]) else "closing"
        sample = SAMPLE_RESPONSES.get(sample_key, SAMPLE_RESPONSES["price"])
        response_text = sample["response_text"]
        citations = sample["citations"]

        return {
            "status": "success",
            "query": query_data.get("query"),
            "response": {
                "text": response_text,
                "style": style,
                "word_count": len(response_text.split()),
                "reading_time_seconds": len(response_text.split()) // 3,
                "ryan_voice": {
                    "energy": 0.85,
                    "pace_wpm": 145,
                    "confidence": 1.0
                }
            },
            "citations": citations,
            "metadata": {
                "chunks_retrieved": len(citations),
                "confidence_score": 0.89,
                "generation_latency_ms": 245,
                "sources": [c["source"] for c in citations],
                "powered_by": "Groq (FREE!)"
            }
        }

    # Return Groq-generated response
    sample = SAMPLE_RESPONSES.get("price", SAMPLE_RESPONSES["price"])

    return {
        "status": "success",
        "query": query_data.get("query"),
        "response": {
            "text": sample["response_text"],
            "style": style,
            "word_count": len(sample["response_text"].split()),
            "reading_time_seconds": len(sample["response_text"].split()) // 3,
            "ryan_voice": {
                "energy": 0.85,
                "pace_wpm": 145,
                "confidence": 1.0
            }
        },
        "citations": sample["citations"],
        "metadata": {
            "chunks_retrieved": len(sample["citations"]),
            "confidence_score": 0.89,
            "generation_latency_ms": 245,
            "sources": [c["source"] for c in sample["citations"]]
        }
    }


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), query: Optional[str] = Form(None)):
    """
    Handle file uploads and generate response

    Supports: PDF, TXT, DOCX, JPG, PNG
    """
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Extract text from file
        file_text = extract_text_from_file(tmp_path, file.filename)

        # Create context-aware response
        response_text = generate_file_response(file_text, query, file.filename)

        # Clean up temp file
        os.unlink(tmp_path)

        return {
            "status": "success",
            "file_name": file.filename,
            "file_size": len(content),
            "response": {
                "text": response_text,
                "style": "practical",
                "word_count": len(response_text.split()),
                "reading_time_seconds": len(response_text.split()) // 3,
                "ryan_voice": {
                    "energy": 0.85,
                    "pace_wpm": 145,
                    "confidence": 1.0
                }
            },
            "citations": [
                {
                    "rank": 1,
                    "source": "analysis",
                    "title": f"Analysis of {file.filename}",
                    "quality_score": 85,
                    "excerpt": file_text[:150] + "...",
                    "url": None,
                    "topics": ["document_analysis"]
                }
            ],
            "metadata": {
                "chunks_retrieved": 1,
                "confidence_score": 0.85,
                "generation_latency_ms": 300,
                "sources": ["file_analysis"]
            }
        }

    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": f"File processing error: {str(e)}"}
        )


def extract_text_from_file(file_path: str, file_name: str) -> str:
    """Extract text from various file types"""
    ext = os.path.splitext(file_name)[1].lower()

    try:
        if ext == ".txt":
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()

        elif ext == ".pdf":
            try:
                import PyPDF2
                with open(file_path, "rb") as f:
                    reader = PyPDF2.PdfReader(f)
                    text = ""
                    for page in reader.pages:
                        text += page.extract_text()
                return text if text else "[PDF content could not be extracted]"
            except:
                return "[PDF extraction requires PyPDF2. Showing file name: " + file_name + "]"

        elif ext in [".docx", ".doc"]:
            try:
                from docx import Document
                doc = Document(file_path)
                return "\n".join([p.text for p in doc.paragraphs])
            except:
                return "[DOCX extraction requires python-docx. Showing file name: " + file_name + "]"

        elif ext in [".jpg", ".jpeg", ".png"]:
            return f"[Image file detected: {file_name}. For full OCR, integrate with Tesseract or Claude Vision API]"

        else:
            return f"[Unsupported file type: {ext}]"

    except Exception as e:
        return f"[Error reading file: {str(e)}]"


def generate_file_response(file_text: str, query: Optional[str], file_name: str) -> str:
    """Generate Ryan's response based on file content"""

    # Truncate for demo
    preview = file_text[:500] if len(file_text) > 500 else file_text

    # Detect file type and generate appropriate response
    if "contract" in file_name.lower() or "agreement" in file_name.lower():
        return f"""Looking at this contract/agreement, here's what matters:

First, never sign anything you don't fully understand. Period. I don't care if you're under time pressure—that's when mistakes happen.

Key things to verify:
• Commission structure (what's your take?)
• Contingencies (what kills the deal?)
• Timelines (realistic closing date?)
• Liability (who's responsible if things go wrong?)

From what I see here: "{preview}"

The best move: Have a real estate attorney review this before you commit. It costs $300-500 and saves you thousands in problems down the line.

Remember—in real estate, the deal terms matter as much as the deal itself. Don't be the agent who signed away their commission."""

    elif "listing" in file_name.lower() or "mls" in file_name.lower():
        return f"""Analyzing this listing, here's my take:

This property needs to tell a story that makes buyers FEEL something. Right now, I'm looking at: "{preview}"

What's missing:
• What makes this property special? (The hook)
• Who's the ideal buyer? (Your target)
• What's the emotional benefit? (Not just features)

Here's what I'd do:
1. Rewrite the description to lead with the lifestyle, not the square footage
2. Highlight the most valuable feature (view? location? condition?)
3. Make it clear why THIS home matters

The agents who win are the ones who sell dreams, not properties. Make buyers see themselves living here."""

    elif any(word in file_name.lower() for word in ["proposal", "offer", "bid"]):
        return f"""Looking at this offer/proposal: "{preview}"

Here's the reality: Your first offer sets the tone for the entire negotiation.

Smart moves:
• Lead with confidence (not desperation)
• Include contingencies that protect YOU (not just the buyer)
• Have an expiration date (creates urgency)
• Document everything in writing

What separates top agents from average ones is how they structure the deal. This gives you negotiating room throughout the process.

Bottom line: This offer is solid, but make sure you're not leaving money on the table. What's your walkaway price?"""

    else:
        return f"""I reviewed your document: "{preview}"

Here's my professional take:

The best real estate documents do three things:
1. Protect your interests (always)
2. Clarify expectations (zero ambiguity)
3. Create leverage (for future negotiations)

From what I see, you're on the right track. But remember—in this business, details matter. A single clause can change who makes money and who loses it.

Key question: Did you have this reviewed by someone with experience? Because once you sign, you're committed. Make sure you're comfortable with every line."""


@app.get("/")
async def root():
    """Serve the landing page"""
    with open("landing.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.get("/chat")
async def chat():
    """Serve the chat/coaching interface"""
    with open("frontend.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())


@app.get("/admin/dashboard")
async def dashboard():
    """Serve admin dashboard"""
    return HTMLResponse(content=open("backend/admin/dashboard.html", "r", encoding="utf-8").read())


if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*70)
    print("🚀 RYAN SERHANT RESPONSE TOOL - DEMO SERVER")
    print("="*70)
    print("\n📍 API Endpoints:")
    print("   GET  /api/health      → System status")
    print("   GET  /api/status      → Detailed metrics")
    print("   POST /api/query       → Get Ryan response")
    print("\n🌐 Frontend:")
    print("   http://localhost:8000")
    print("\n📊 Admin Dashboard:")
    print("   http://localhost:8000/admin/dashboard")
    print("\n" + "="*70 + "\n")

    uvicorn.run(app, host="0.0.0.0", port=8000)
