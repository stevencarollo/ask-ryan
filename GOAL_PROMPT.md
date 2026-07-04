# The Roundtable — Master Build Prompt

Paste everything below into a fresh Claude Code session opened in this folder to run a long autonomous build.

---

GOAL: Evolve "The Roundtable" (C:\Users\Steve Carollo.MiniReem\Downloads\ryan-serhant-tool) from a working AI coaching chat into a complete, embeddable, multi-channel AI advisory platform for real estate agents. Work autonomously phase by phase. Do not stop to ask questions — make the best decision, document it, and keep building. Total budget: $0/month (free tiers only, no paid APIs, no credit cards).

=== CURRENT SYSTEM (verified truth — do not rediscover) ===
- Brand: "The Roundtable" — AI coach blending 34 selectable expert influences across 9 groups (sales, coaching, marketing, negotiation, design/staging, commercial, flipping/investing, probate/divorce/distressed, Español & bilingual). Luxury gold (#D4AF37) + black + Playfair Display branding.
- Knowledge base: backend/experts_kb.py — every advisor has a DEEP dossier (frameworks, named systems, methodology, signature vocabulary). Two-tier prompting: panels of ≤8 advisors (DEEP_PANEL_MAX) get full dossiers injected; broader panels get one-line style fingerprints to fit free-tier tokens.
- Spanish: base prompt includes full Español capability — responds in natural US-Latino Spanish when addressed in Spanish; proactively offers bilingual script versions.
- Frontend: Vercel static (https://ask-ryan.vercel.app) — index.html (landing), frontend.html (chat UI: advisor checkboxes in 9 groups, conversation memory, file upload).
- Backend: FastAPI on Render free tier (https://ask-ryan-nb3w.onrender.com), backend/demo_server.py, GitHub stevencarollo/ask-ryan, auto-deploys on push to main. Render sleeps after 15 idle min (~50s cold start).
- AI: Groq free tier. Text: llama-3.3-70b-versatile. Vision/OCR: meta-llama/llama-4-scout-17b-16e-instruct (scanned-PDF OCR via PyMuPDF rendering + vision transcription; real image critiques).
- GROQ_API_KEY lives in local .env AND the Render Environment tab. NEVER commit keys; .env/.env.txt are gitignored.
- Key endpoints: /api/query (query, history, context, experts[]), /api/upload (file + query + experts JSON), /api/experts, /api/health, /api/diag.
- Landmines already solved — do not regress: groq pip must be >=0.13 (0.4.1 crashes vs httpx>=0.28); Groq limits ~12K TPM text / 30K TPM vision — retry with sleep on 429; supabase stays out of requirements.txt; Vercel needs index.html + .vercelignore excluding backend/.

=== OPERATING RULES ===
1. Work in phases. Each phase: build → test locally with real calls → commit → push → wait for deploy → verify LIVE (curl Render URL + /api/diag) → then next phase.
2. Never break existing endpoints — all changes backward compatible. The chat must keep working the entire time.
3. Every AI feature degrades gracefully: Groq down/rate-limited → friendly message, never a stack trace.
4. Free-tier discipline: cap OCR pages, trim contexts, backoff on 429. Anything requiring payment gets built fully but gated behind env vars, and noted in the final report.
5. Keep BUILD_LOG.md — one entry per phase: what was built, decisions, verification, what Steve should hand-test.

=== PHASE 0 — Deepen the Knowledge Base Further ===
For EVERY advisor in backend/experts_kb.py, expand the dossier with: 3-5 more named frameworks with their actual mechanics, signature scripts word-for-word where publicly known, key numbers/formulas they teach (e.g., overbid math, MAO variants, touch-system cadences), and common misapplications to warn agents about. Grow flipping/investing depth specifically: rehab line-item budget templates, contractor vetting checklists, ARV comp-selection rules, BRRRR refi math worked examples, creative-finance deal structures with real number walkthroughs. Grow the Español section: full Spanish-language script library (cold call, FSBO, expired, door knock, probate condolence, NOD urgency — each in English AND natural US-Latino Spanish), cultural-fluency guidance, ITIN/DPA lending knowledge. Keep the two-tier token discipline: dossiers may grow, but verify a 8-advisor deep panel still fits comfortably in one Groq request (measure tokens; trim if a panel prompt exceeds ~8K tokens). Add per-advisor "ask me about" example questions surfaced in the UI on hover.

=== PHASE 1 — Embeddable Widget ===
widget.js: single <script> tag any agent drops on their website → floating Roundtable chat bubble (bottom-right, gold/black). Chat panel, compact advisor selection, per-session memory, file upload, mobile responsive, zero dependencies, shadow-DOM'd styles. Served from backend (GET /widget.js). Build embed-demo.html + an "Embed on your site" landing-page section with the copy-paste snippet.

=== PHASE 2 — Chat Experience Upgrade ===
True chat thread in frontend.html: alternating bubbles, full visible history, markdown rendering, typing indicator, auto-scroll, Enter-to-send, per-response copy button, "download conversation" (.txt). Keep advisor checkboxes and uploads. Preserve the luxury brand.

=== PHASE 3 — Twilio SMS Coach ===
POST /api/sms as a Twilio webhook (form-encoded From/Body → TwiML). Per-phone conversation memory (in-memory, 24h expiry). Concise SMS responses (<1500 chars, split as needed). Commands: RESET, EXPERTS, PANEL <group>. Also: ESPANOL command to lock Spanish mode for that number. Gate behind TWILIO_AUTH_TOKEN env var with signature validation. Write TWILIO_SETUP.md (free trial setup, no purchases). Test locally with simulated Twilio POSTs. NOTE for Steve: Twilio trial = free number + ~$15 credit; texts cost ~$0.008 after that — feature costs nothing until credentials are added.

=== PHASE 4 — Universal File Intelligence ===
Add: .pptx (python-pptx), .rtf, .webp/.heic (Pillow → vision), .eml/.msg, .json, verified multi-sheet Excel, and MULTIPLE files per request (compare docs). Auto-detect document INTENT (prelim, contract, lead list, flyer, headshot, listing photo, email thread, rehab bid) → route to a specialized analysis prompt per type; return detected type in metadata and show it in the UI.

=== PHASE 5 — Flyer & Marketing Studio ===
POST /api/create + a "Create" tab: property details (or uploaded listing/photos) → downloadable print-ready self-contained HTML flyer, 3 template styles (Luxury Gold, Modern Minimal, Just Listed bold), agent contact block. Also generate: MLS + Instagram + email listing descriptions, open-house invites, just-listed/just-sold captions — each offered in English AND Spanish. Marketing-group advisors weighted for all generation.

=== PHASE 6 — Design & Staging Advisor Deep-Dive ===
Interior photos → room-by-room staging plan at three budget tiers ($0 / $500 / $2,000), paint/lighting suggestions, "what buyers will object to in this photo." Exteriors → curb-appeal punch list. Multi-photo upload → whole-house staging report, downloadable formatted HTML.

=== PHASE 7 — Polish & Ship ===
Landing sections for widget, SMS coach, Marketing Studio, and Español coaching; per-IP rate limiting (protect the Groq quota); rotating request log; expanded /api/diag covering every subsystem. Full regression: curl every endpoint live, upload every file type, one full conversation each in English and Spanish with 3 different advisor panels. Final BUILD_LOG.md summary + hand-test checklist + credential-gated items list.

FINAL DELIVERABLE: every phase live on the existing URLs, BUILD_LOG.md documenting the journey, zero dollars spent.
