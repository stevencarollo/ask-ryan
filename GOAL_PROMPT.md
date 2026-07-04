# The Roundtable — Multi-Day Autonomous Build Prompt (v3)

Paste everything below the line into a fresh Claude Code session opened in
C:\Users\Steve Carollo.MiniReem\Downloads\ryan-serhant-tool — or run it via /goal.
It is self-resuming: if the session dies or compacts, paste it again and work continues.

---

GOAL: You are the lead engineer, researcher, and designer of "The Roundtable" — a live, free AI coaching platform for real estate agents (34 selectable expert advisors, document/photo review, bilingual English/Spanish). Over the next hours-to-days, transform it from a strong v1 into a research-backed, multi-channel product agents rave about. Work autonomously: decide, build, verify live, document, repeat. Never stop to ask a question you can answer with a reasonable default. Budget: $0/month — free tiers only, no credit cards, ever.

============ SELF-RESUMING OPERATING SYSTEM ============
FIRST ACTION every session: read STATE.md in the project root.
- If it doesn't exist, create it: a checklist of every milestone below, each with [ ] / [~] / [x] status and a one-line "next step" note.
- Find the first [~] (in-progress) or [ ] (todo) item. Continue from its "next step".
- After EVERY completed work unit: update STATE.md (status + next step), append a BUILD_LOG.md entry (what/why/how verified), commit, push.
This makes progress durable across context resets. STATE.md is the source of truth — trust it over memory.

WORK LOOP (every milestone): build → test locally with real calls (python/curl) → commit descriptive message → push (auto-deploys Vercel+Render) → wait ~4 min → verify LIVE (curl the production URL; /api/diag for backend health) → mark [x] in STATE.md → next.

HARD RULES
1. The live site must never break. All changes backward compatible; if a deploy fails, fixing it preempts everything.
2. Every AI feature degrades gracefully (friendly message on rate-limit/downtime, never a stack trace).
3. Free-tier discipline: Groq ~12K TPM text / 30K TPM vision — retry with sleep on 429; cap OCR pages; trim contexts.
4. Never commit secrets. .env/.env.txt are gitignored. GROQ_API_KEY lives in local .env + Render Environment tab.
5. Research integrity: only include claims/frameworks/scripts corroborated by sources; never invent quotes; note "public content, not affiliated" positioning everywhere user-facing.
6. Anything requiring payment (e.g., Twilio credits): build it fully but gated behind env vars; document in BUILD_LOG.md.

============ SYSTEM MAP (verified — do not rediscover) ============
- Frontend: Vercel https://ask-ryan.vercel.app — index.html/landing.html (luxury Cinzel+gold design, SVG icons), frontend.html (chat: 9 advisor groups / 34 checkboxes, conversation memory, uploads).
- Backend: FastAPI backend/demo_server.py on Render free https://ask-ryan-nb3w.onrender.com (sleeps after 15 min idle, ~50s cold start). GitHub stevencarollo/ask-ryan, push-to-main auto-deploys both.
- Brain: backend/experts_kb.py — 34 advisors (style + deep dossier). Two-tier prompting: ≤8 selected advisors (DEEP_PANEL_MAX) → full dossiers; more → style lines. Spanish capability in base prompt.
- AI: Groq free. Text: llama-3.3-70b-versatile. Vision/OCR: meta-llama/llama-4-scout-17b-16e-instruct (PyMuPDF renders scanned PDFs → vision transcribes, 429-retry built in).
- Endpoints: /api/query {query, history, context, experts[]} · /api/upload (multipart + experts JSON) · /api/experts · /api/health · /api/diag.
- Claude Skill: roundtable-skill/ folder → roundtable-skill.zip served by Vercel at /roundtable-skill.zip. REGENERATE the zip whenever experts_kb.py or the script library changes.
- Solved landmines (do not regress): groq pip ≥0.13 (0.4.1 crashes vs httpx≥0.28); supabase stays OUT of requirements.txt; Vercel needs index.html + .vercelignore excluding backend/; this shell's heredocs mangle backslashes — write python scripts to files instead of inline heredocs when strings contain backslashes.

============ MILESTONE 1 — DEEP RESEARCH BRAIN (highest value; expect this to take the longest) ============
Goal: every advisor answers like someone who has actually consumed their content library.
For EACH of the 34 advisors (work group by group; commit after each group):
 a. RESEARCH via WebSearch/WebFetch: their YouTube channel and most-viewed topics, podcast appearances, books (chapter-level ideas), keynotes, interviews, articles. Extract: named frameworks + mechanics; word-for-word scripts they teach publicly; numbers/formulas (cadences, conversion math, MAO variants, staging ROI); contrarian positions; signature vocabulary; 5-8 example questions they uniquely answer well. Corroborate before including; skip what you can't verify.
 b. WRITE backend/kb/<id>.md (500-1500 words): Philosophy / Named Frameworks / Scripts & Language / Numbers & Formulas / Mistakes They Call Out / Example Questions.
 c. FOLD BACK into experts_kb.py: upgrade that advisor's `deep` dossier (≤300 words; measure that an 8-seat panel prompt stays ≲8K tokens).
 d. RETRIEVAL: implement a light keyword/section retrieval layer in the server — topical queries (probate, FSBO, staging, BRRRR, español, NOD...) pull the 2-3 most relevant kb sections into context even on large panels. Pure Python string matching; no paid services.
 e. SPANISH LIBRARY: backend/kb/espanol_scripts.md — bilingual script library (cold call, FSBO, expired, door knock, probate condolence, NOD urgency, listing opener) — English AND natural US-Latino Spanish versions, plus ITIN/DPA lending notes and cultural-fluency guidance. Wire into retrieval.
 f. QUALITY GATES: per group, 3 realistic queries through a focused panel — pass only if answers cite frameworks/scripts that exist in the kb files. Log pass/fail in BUILD_LOG.md.
 g. REGENERATE roundtable-skill.zip with enriched dossiers + references/scripts.md; verify the live download.

============ MILESTONE 2 — EMBEDDABLE WIDGET ============
GET /widget.js from the backend: one <script> tag gives any agent's website a floating gold/charcoal Roundtable chat bubble. Shadow-DOM styles, compact advisor picker, session memory, file upload, mobile responsive, zero dependencies. embed-demo.html + an "Embed on your site" landing section with the copy-paste snippet.

============ MILESTONE 3 — CHAT EXPERIENCE ============
frontend.html becomes a true chat thread: alternating bubbles, visible history, markdown rendering, typing indicator, auto-scroll, Enter-to-send, per-response copy button, download-conversation (.txt). Preserve the Cinzel/gold design language and every existing behavior.

============ MILESTONE 4 — SMS COACH (Twilio-ready, $0 until keys added) ============
POST /api/sms: Twilio-compatible webhook (form-encoded From/Body → TwiML), per-phone memory (24h expiry), responses <1500 chars (split as needed), commands RESET / EXPERTS / PANEL <group> / ESPANOL. Signature validation gated behind TWILIO_AUTH_TOKEN. TWILIO_SETUP.md for Steve (trial = free number + ~$15 credit, ~$0.008/SMS after). Test with simulated Twilio POSTs.

============ MILESTONE 5 — UNIVERSAL FILE INTELLIGENCE ============
Add .pptx, .rtf, .webp/.heic (Pillow→vision), .eml/.msg, .json; verify multi-sheet Excel; support MULTIPLE files in one request (comparisons). Auto-detect document INTENT (prelim, contract, lead list, flyer, headshot, listing photo, email thread, rehab bid) → specialized analysis prompt per type → detected type shown in UI and returned in metadata.

============ MILESTONE 6 — MARKETING STUDIO ============
POST /api/create + a "Create" tab: property details or uploaded listing/photos → print-ready self-contained HTML flyer (3 styles: Luxury Gold / Modern Minimal / Just Listed bold) + MLS, Instagram, and email listing descriptions + open-house invites + just-listed/just-sold captions — every text deliverable in English AND Spanish.

============ MILESTONE 7 — STAGING REPORTS ============
Interior photos → room-by-room staging plan at $0 / $500 / $2,000 tiers with paint/lighting calls and "what buyers will object to in this photo." Exteriors → curb-appeal punch list. Multi-photo → whole-house staging report as a downloadable formatted HTML file.

============ MILESTONE 8 — HARDENING & FINAL QA ============
Per-IP rate limiting (protect the Groq quota), rotating request log, expanded /api/diag covering every subsystem, landing sections for widget/SMS/Studio. Full regression: every endpoint live, every file type uploaded, complete conversations in English and Spanish across 3 different panels. Final BUILD_LOG.md summary: what shipped, hand-test checklist for Steve, credential-gated items.

DEFINITION OF DONE: STATE.md shows all milestones [x]; every feature verified on the production URLs; kb/ library exists for all 34 advisors with quality gates passed; the Claude skill zip reflects the enriched brain; BUILD_LOG.md tells the whole story; total spend $0.
