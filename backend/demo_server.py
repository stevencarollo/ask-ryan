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


RYAN_SYSTEM_PROMPT = """You are Ryan Serhant, CEO of SERHANT., bestselling author of "Sell It Like Serhant," and one of the top real estate coaches in the world. You are personally mentoring the agent talking to you.

YOUR VOICE:
- Direct, confident, warm. You talk like a friend who happens to be a killer closer.
- You use short punchy sentences. You ask questions back. You reference specifics.
- You NEVER give generic advice. Every response is tailored to exactly what they showed you or asked you.
- You use frameworks when useful (Finder/Keeper/Doer, the Serhant follow-up system, "sell the lifestyle not the square footage") but only when they actually fit.

WHAT YOU CAN REVIEW — and how:
- PRELIMINARY TITLE REPORTS / PROPERTY PROFILES: Walk through what you see. Flag liens, deeds of trust, easements, tax status, vesting issues, ownership history. Tell them what to verify before listing or writing an offer, and what talking points this gives them with the seller.
- LISTING PRESENTATIONS & FLYERS: Critique like a marketer. Headline, hero image, story, call to action, what's missing, what to cut. Be specific about THEIR content.
- HEADSHOTS & PHOTOS: Give honest branding feedback — lighting, wardrobe, expression, background, what it signals to a luxury vs. first-time buyer.
- CALL SCRIPTS: Rewrite lines. Show them the exact words. Point out where they'd lose the person on the phone.
- EMAILS & TEXTS: Rewrite for punch. Subject lines, first sentence hooks, clear ask.
- LEAD LISTS / SPREADSHEETS: Look at the actual segments and data. Suggest an attack plan — who to call first, what angle per segment.
- CONTRACTS/OFFERS: Flag the business terms that matter (you're not their lawyer — say so once, briefly).

RULES:
1. ALWAYS anchor to the actual content given to you. Quote it, name names, cite the address, reference the specific lien or the specific headline. Prove you read it.
2. If they gave you a document AND a question, answer THEIR question first, using the document.
3. If the document is partial or garbled, work with what IS there — never complain about formatting.
4. End with either one sharp question back to them or one concrete next action. Not both, not a list of five.
5. Never say "As an AI." You are Ryan in this conversation.
6. Length: match the task. A headshot critique might be 150 words. A prelim review might be 500. Don't pad."""


async def generate_response_with_groq(query: str, style: str, context: Optional[str] = None,
                                      history: Optional[list] = None) -> Optional[str]:
    """Generate response using Groq API (FREE - 10x faster than Claude!)

    history: prior conversation turns [{role: 'user'|'assistant', content: str}, ...]
    so Ryan remembers the thread and any document already discussed."""
    try:
        groq_api_key = os.getenv("GROQ_API_KEY")
        if not groq_api_key:
            return None

        client = Groq(api_key=groq_api_key)

        if context:
            user_content = f"""Here is the document/content I want you to review:

---BEGIN DOCUMENT---
{context}
---END DOCUMENT---

My question/request: {query if query else 'Review this and give me your take — what matters, what to watch out for, and what I should do with it.'}"""
        else:
            user_content = query

        messages = [{"role": "system", "content": RYAN_SYSTEM_PROMPT}]
        # Replay prior turns (validated + capped) so follow-up replies keep full context
        if history:
            for turn in history[-12:]:
                role = turn.get("role")
                content = str(turn.get("content", ""))[:8000]
                if role in ("user", "assistant") and content:
                    messages.append({"role": role, "content": content})
        messages.append({"role": "user", "content": user_content})

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # Free, fast, and powerful
            messages=messages,
            max_tokens=1200,
            temperature=0.7
        )

        return response.choices[0].message.content

    except Exception as e:
        print(f"Groq error: {e}")
        return None


# Groq's FREE vision model - used for OCR on scanned PDFs and real photo reviews
VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"


def _groq_client() -> Optional["Groq"]:
    key = os.getenv("GROQ_API_KEY")
    if not key or not GROQ_AVAILABLE:
        return None
    return Groq(api_key=key)


def ocr_pdf_with_groq_vision(file_path: str, max_pages: int = 8) -> str:
    """OCR a scanned (image-only) PDF: render pages to images with PyMuPDF,
    transcribe each with Groq's free vision model. $0 cost."""
    import base64
    try:
        import fitz  # PyMuPDF
    except ImportError:
        return ""
    client = _groq_client()
    if client is None:
        return ""
    try:
        doc = fitz.open(file_path)
    except Exception:
        return ""
    import time
    total = doc.page_count
    pages = min(total, max_pages)
    out = []
    for i in range(pages):
        pix = doc[i].get_pixmap(dpi=100)
        b64 = base64.b64encode(pix.tobytes("png")).decode()
        # Free tier = 30k tokens/min on the vision model; retry with a pause on 429s
        for attempt in range(3):
            try:
                r = client.chat.completions.create(
                    model=VISION_MODEL,
                    messages=[{
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "Transcribe ALL text visible in this document page, exactly as written. Render tables as plain text rows. Output ONLY the transcription, no commentary."},
                            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
                        ],
                    }],
                    max_tokens=2000,
                    temperature=0,
                )
                out.append(f"--- Page {i + 1} ---\n{r.choices[0].message.content}")
                break
            except Exception as e:
                if "rate_limit" in str(e) and attempt < 2:
                    time.sleep(8)
                    continue
                print(f"Vision OCR error on page {i + 1}: {e}")
                break
    doc.close()
    text = "\n\n".join(out)
    if total > pages and text:
        text += f"\n\n[Note: this document has {total} pages; the first {pages} were read.]"
    return text


def analyze_image_with_groq(file_path: str, query: Optional[str], file_name: str) -> Optional[str]:
    """Ryan actually LOOKS at an uploaded photo (headshot, flyer, listing photo)
    and critiques it using the vision model."""
    import base64
    client = _groq_client()
    if client is None:
        return None
    ext = os.path.splitext(file_name)[1].lower().lstrip(".")
    mime = "jpeg" if ext in ("jpg", "jpeg") else "png"
    try:
        with open(file_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        user_text = query or "Review this image and give me your honest take - what works, what doesn't, and what I should change."
        r = client.chat.completions.create(
            model=VISION_MODEL,
            messages=[
                {"role": "system", "content": RYAN_SYSTEM_PROMPT},
                {"role": "user", "content": [
                    {"type": "text", "text": f"(Uploaded image: {file_name})\n\n{user_text}"},
                    {"type": "image_url", "image_url": {"url": f"data:image/{mime};base64,{b64}"}},
                ]},
            ],
            max_tokens=1000,
            temperature=0.7,
        )
        return r.choices[0].message.content
    except Exception as e:
        print(f"Vision analyze error: {e}")
        return None


@app.get("/api/diag")
async def diag():
    """Diagnostic: is the Groq key loaded and working on this server?"""
    key = os.getenv("GROQ_API_KEY", "")
    info = {
        "groq_sdk_installed": GROQ_AVAILABLE,
        "key_present": bool(key),
        "key_fingerprint": (key[:7] + "..." + key[-4:]) if key else None,
        "key_length": len(key),
        "groq_ping": None,
    }
    try:
        client = _groq_client()
        if client:
            r = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": "say ok"}],
                max_tokens=4,
            )
            info["groq_ping"] = "OK: " + (r.choices[0].message.content or "")
        else:
            info["groq_ping"] = "no client (missing key or sdk)"
    except Exception as e:
        info["groq_ping"] = f"ERROR: {str(e)[:250]}"
    return info


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
    history = query_data.get("history") or []
    context = query_data.get("context")  # document text carried across the conversation
    if context:
        context = str(context)[:16000]

    # Try to generate response using Groq (FREE!)
    response_text = None
    if GROQ_AVAILABLE:
        response_text = await generate_response_with_groq(query_text, style, context=context, history=history)

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

    # Return the REAL Groq-generated response
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
        "citations": [],
        "metadata": {
            "chunks_retrieved": 0,
            "confidence_score": 0.92,
            "generation_latency_ms": 245,
            "sources": ["ryan_serhant_ai"],
            "powered_by": "Groq (FREE!)"
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

        ext = os.path.splitext(file.filename)[1].lower()
        response_text = None
        file_text = ""

        # Photos (headshots, flyers, listing shots): Ryan looks at the ACTUAL image
        if ext in [".jpg", ".jpeg", ".png"]:
            response_text = analyze_image_with_groq(tmp_path, query, file.filename)
            file_text = f"[Image reviewed: {file.filename}]"

        # Documents: extract text (with vision-OCR fallback for scanned PDFs)
        if not response_text:
            file_text = extract_text_from_file(tmp_path, file.filename)
            doc_context = f"[File name: {file.filename}]\n\n{file_text[:24000]}"
            if GROQ_AVAILABLE:
                response_text = await generate_response_with_groq(query or "", "practical", context=doc_context)

        # Last-resort fallback only if Groq is unavailable
        if not response_text:
            response_text = generate_file_response(file_text, query, file.filename)

        # Clean up temp file
        os.unlink(tmp_path)

        return {
            "status": "success",
            "file_name": file.filename,
            "file_size": len(content),
            "extracted_text": file_text[:16000],
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
            text = ""
            try:
                import PyPDF2
                with open(file_path, "rb") as f:
                    reader = PyPDF2.PdfReader(f)
                    for page in reader.pages:
                        text += page.extract_text() or ""
            except Exception:
                pass
            # Scanned PDF (no text layer)? OCR it with the free Groq vision model.
            if len(text.strip()) < 200:
                ocr_text = ocr_pdf_with_groq_vision(file_path)
                if ocr_text.strip():
                    return ocr_text
            return text if text.strip() else "[PDF content could not be extracted]"

        elif ext in [".docx", ".doc"]:
            try:
                from docx import Document
                doc = Document(file_path)
                return "\n".join([p.text for p in doc.paragraphs])
            except:
                return "[DOCX extraction requires python-docx. Showing file name: " + file_name + "]"

        elif ext in [".xlsx", ".xls"]:
            try:
                import openpyxl
                wb = openpyxl.load_workbook(file_path)
                text = ""
                for sheet in wb.sheetnames:
                    ws = wb[sheet]
                    text += f"\n--- Sheet: {sheet} ---\n"
                    for row in ws.iter_rows(values_only=True):
                        text += " | ".join([str(cell) if cell is not None else "" for cell in row]) + "\n"
                return text if text.strip() else "[Excel file is empty]"
            except:
                return "[Excel extraction requires openpyxl. Showing file name: " + file_name + "]"

        elif ext == ".csv":
            try:
                import csv
                with open(file_path, "r", encoding="utf-8") as f:
                    reader = csv.reader(f)
                    text = ""
                    for row in reader:
                        text += " | ".join(row) + "\n"
                return text if text.strip() else "[CSV file is empty]"
            except:
                return "[CSV extraction failed. Showing file name: " + file_name + "]"

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
