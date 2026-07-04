# The Roundtable — Master Build Prompt v2 (Deep Research Edition)

Paste everything below into a fresh Claude Code session opened in this folder for a long autonomous build session.

---

GOAL: Take "The Roundtable" (C:\Users\Steve Carollo.MiniReem\Downloads\ryan-serhant-tool) — a live AI real-estate coaching platform — and (A) build a genuinely DEEP research-backed knowledge brain for all 34 advisors, (B) expand it into an embeddable, multi-channel platform. Work autonomously for hours. Do not stop to ask questions — decide, document, keep building. Budget: $0/month (free tiers only).

=== CURRENT SYSTEM (verified truth — do not rediscover) ===
- Brand: "The Roundtable" — high-end gold/charcoal design (Cinzel + Inter, #C9A85C gold, #0B0B0D ink), landing.html/index.html (luxury landing with SVG iconography), frontend.html (chat app: 9 advisor groups, 34 checkboxes, conversation memory, file upload).
- Knowledge: backend/experts_kb.py — 34 advisors, each with style line + deep dossier. Two-tier prompting: panels ≤8 advisors (DEEP_PANEL_MAX) inject full dossiers; larger panels get style lines.
- Claude Skill: roundtable-skill/ folder → roundtable-skill.zip (served at /roundtable-skill.zip via Vercel). REGENERATE the zip whenever experts_kb.py changes — the generator pattern lives in git history (skill folder: roundtable-coach/SKILL.md + references/experts.md built from EXPERTS dict).
- Frontend: Vercel (https://ask-ryan.vercel.app). Backend: FastAPI on Render free (https://ask-ryan-nb3w.onrender.com), backend/demo_server.py, GitHub stevencarollo/ask-ryan, auto-deploy on push to main. Render cold-starts ~50s after 15 idle min.
- AI: Groq free — text llama-3.3-70b-versatile, vision/OCR meta-llama/llama-4-scout-17b-16e-instruct (PyMuPDF renders scanned PDFs → vision transcribes). GROQ_API_KEY in local .env AND Render Environment. NEVER commit keys.
- Endpoints: /api/query (query, history, context, experts[]), /api/upload (+ experts JSON form field), /api/experts, /api/health, /api/diag.
- Landmines solved — do not regress: groq pip ≥0.13 (0.4.1 breaks vs httpx≥0.28); Groq ~12K TPM text / 30K TPM vision — retry+sleep on 429; supabase stays out of requirements.txt; Vercel needs index.html + .vercelignore excluding backend/; Bash heredocs mangle backslashes — write scripts to files or use forward slashes.

=== OPERATING RULES ===
1. Phase discipline: build → test locally with real calls → commit → push → verify LIVE (curl Render + /api/diag) → next phase.
2. Backward compatible always; the live chat must never break.
3. Graceful degradation on every AI path (friendly message, never a stack trace).
4. Free-tier discipline: cap pages, trim contexts, backoff on 429.
5. Maintain BUILD_LOG.md: per phase — what was built, decisions, verification, what Steve should hand-test.

=== PHASE R — DEEP RESEARCH PROGRAM (the centerpiece — spend the most time here) ===
Build a real research-backed brain for EVERY advisor, the way the original Ryan Serhant corpus was approached. For EACH of the 34 advisors, run a research pass using WebSearch/WebFetch:

R1. RESEARCH each advisor (batch by group; ~10-20 min each):
   - Search their YouTube channel topics, most-viewed video titles and summaries, podcast appearances and episode themes, books and chapter-level content, signature keynote material, interview transcripts, and published articles.
   - Extract: (a) named frameworks with their actual mechanics, (b) word-for-word scripts and dialogues they teach publicly, (c) key numbers/formulas (touch cadences, conversion math, MAO variants, staging ROI claims), (d) their contrarian positions and what they argue AGAINST, (e) signature phrases and vocabulary, (f) 5-8 "ask me about" example questions this advisor uniquely answers well.
   - VERIFY: prefer multiple sources per claim; skip anything you cannot corroborate; never invent quotes.

R2. WRITE one knowledge file per advisor: backend/kb/<id>.md (500-1500 words each) with sections: Philosophy / Named Frameworks / Scripts & Language / Numbers & Formulas / Common Mistakes They Call Out / Example Questions. These are the durable research artifacts.

R3. FOLD BACK: distill each kb file into an upgraded `deep` dossier in experts_kb.py (keep each ≤300 words so an 8-seat panel stays within ~8K prompt tokens — MEASURE with a token estimate and trim). The kb/*.md files are the library; the dossiers are the working memory.

R4. RETRIEVAL UPGRADE: add a lightweight retrieval layer — when a query names a topic (probate, FSBO, staging, BRRRR, español...), the server pulls the 2-3 most relevant kb file SECTIONS into context even on large panels (simple keyword/section-header matching in Python; no embeddings service needed, keep it free and fast).

R5. SPANISH LIBRARY: build backend/kb/espanol_scripts.md — full bilingual script library (cold call, FSBO, expired, door knock, probate condolence, NOD urgency, listing presentation openers), each script in English AND natural US-Latino Spanish, plus cultural-fluency and ITIN/DPA lending notes. Wire it into retrieval for any Spanish-context query.

R6. REGENERATE the Claude skill zip with the enriched dossiers AND a new references/scripts.md; verify /roundtable-skill.zip serves the new version.

R7. QUALITY GATE: for each group, run 3 realistic test queries through a focused panel and confirm the answers now cite frameworks/scripts that ONLY appear in the researched kb files. Log pass/fail per group in BUILD_LOG.md.

=== PHASE 1 — Embeddable Widget ===
widget.js served from the backend (GET /widget.js): one <script> tag → floating gold/charcoal chat bubble on any agent website. Chat panel, compact advisor selection, session memory, file upload, shadow-DOM styles, zero dependencies, mobile responsive. embed-demo.html + "Embed on your site" landing section with the snippet.

=== PHASE 2 — Chat Experience Upgrade ===
True chat thread in frontend.html: alternating bubbles, visible history, markdown rendering, typing indicator, auto-scroll, Enter-to-send, per-response copy, download-conversation (.txt). Keep the Cinzel/gold luxury design language and all existing logic.

=== PHASE 3 — Twilio SMS Coach ===
POST /api/sms Twilio webhook (form-encoded From/Body → TwiML), per-phone memory (24h expiry), <1500-char responses, commands RESET / EXPERTS / PANEL <group> / ESPANOL. Gate behind TWILIO_AUTH_TOKEN with signature validation. TWILIO_SETUP.md for Steve (trial = free number + ~$15 credit; ~$0.008/SMS after — costs nothing until credentials are added).

=== PHASE 4 — Universal File Intelligence ===
Add .pptx, .rtf, .webp/.heic (Pillow→vision), .eml/.msg, .json; verify multi-sheet Excel; MULTIPLE files per request. Auto-detect document INTENT (prelim, contract, lead list, flyer, headshot, listing photo, email thread, rehab bid) → specialized analysis prompt per type; return detected type in metadata; show it in the UI.

=== PHASE 5 — Flyer & Marketing Studio ===
POST /api/create + "Create" tab: property details or uploaded listing/photos → downloadable print-ready self-contained HTML flyer (3 styles: Luxury Gold, Modern Minimal, Just Listed bold) + MLS/Instagram/email descriptions + open-house invites + captions — every text output offered in English AND Spanish.

=== PHASE 6 — Design & Staging Deep-Dive ===
Interior photos → room-by-room staging plans at $0/$500/$2,000 tiers, paint/lighting calls, "what buyers will object to." Exteriors → curb-appeal punch list. Multi-photo → whole-house staging report as downloadable HTML.

=== PHASE 7 — Polish & Ship ===
Landing sections for widget/SMS/Studio; per-IP rate limiting; rotating request log; expanded /api/diag. Full regression: every endpoint live, every file type, full conversations in English and Spanish across 3 panels. Final BUILD_LOG.md + hand-test checklist + credential-gated items list.

FINAL DELIVERABLE: research-backed brains for all 34 advisors (kb/ library + enriched dossiers + retrieval), refreshed Claude skill zip, every platform phase live on the existing URLs, BUILD_LOG.md, zero dollars spent.
