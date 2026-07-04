# The Roundtable — Deep Research Super Prompt

Paste everything below the line into a Claude Code session opened in
C:\Users\Steve Carollo.MiniReem\Downloads\ryan-serhant-tool (or run via /goal).
Self-resuming: if the session dies or compacts, paste it again — it continues where it stopped.

---

GOAL: You are the research director for "The Roundtable" (a live, free AI real-estate coaching platform). Your single mission for the next several hours: build a genuinely research-backed knowledge brain for ALL 34 advisors — the transcript-level depth the product has always claimed but never truly had. This is a research job first, an engineering job second. Work autonomously; never stop to ask what you can decide yourself. Budget: $0 (free tiers only).

============ SELF-RESUMING SYSTEM ============
FIRST ACTION every session: read RESEARCH_STATE.md in the project root.
- If missing, create it: all 34 advisors listed in the PRIORITY ORDER below, each with status [ ] todo / [~] researching / [x] done+gated, plus a one-line "next step".
- Resume from the first non-[x] advisor. After each advisor: update RESEARCH_STATE.md, append BUILD_LOG.md, commit, push.
Progress lives in files, not memory. Trust RESEARCH_STATE.md over recollection.

============ SYSTEM MAP (verified — do not rediscover) ============
- Brain: backend/experts_kb.py — 34 advisors, each {name, focus, style, deep}. Two-tier prompting: ≤8 selected advisors → full `deep` dossiers injected; more → style lines. DEEP_PANEL_MAX = 8.
- Server: backend/demo_server.py (FastAPI) on Render free (https://ask-ryan-nb3w.onrender.com), auto-deploys from GitHub stevencarollo/ask-ryan main. Frontend on Vercel (https://ask-ryan.vercel.app).
- AI: Groq free — llama-3.3-70b-versatile text, llama-4-scout vision. GROQ_API_KEY in local .env (never commit) + Render env.
- Claude Skill: roundtable-skill/roundtable-coach/ → roundtable-skill.zip served at /roundtable-skill.zip. Regenerate whenever the brain changes (generator: build references/experts.md from the EXPERTS dict, zip the folder — see git history for the pattern).
- Landmines: groq pip ≥0.13; supabase stays out of requirements.txt; heredocs mangle backslashes (write python scripts to files); Groq 429s → sleep and retry.

============ PRIORITY ORDER (research in this order — Steve's business needs first) ============
Wave 1 — Distressed & Legal (his lead flow): gross (Bill Gross, CA probate), espinosa (Nicole Espinosa, short sales/NOD), nicoletti (Al Nicoletti, probate attorney), corbett (Chad Corbett, probate outreach), starks (Laurel Starks, divorce), ted (Ted Thomas, tax defaults).
Wave 2 — Español (his Gardena farms): loida (Loida Velasquez), figueroa (Veronica Figueroa), creyes (Carlos Reyes), rene (Rene Rodriguez).
Wave 3 — Prospecting & Scripts: mulrenin (Brandon Mulrenin), harris (Tim & Julie Harris), carruthers (Ricky Carruthers), serhant (Ryan Serhant).
Wave 4 — Coaching & Business: ferry (Tom Ferry), buffini (Brian Buffini), keller (Gary Keller), sharran (Sharran Srivatsaa).
Wave 5 — Negotiation & Investing: voss (Chris Voss), norton (Jerry Norton), morby (Pace Morby), greene (David Greene), tarek (Tarek El Moussa).
Wave 6 — Commercial: knakal (Bob Knakal), cauble (Tyler Cauble), mcelroy (Ken McElroy).
Wave 7 — Marketing & Media: glennda (Glennda Baker), lazine (Byron Lazine), burgess (Jimmy Burgess), pantana (Jason Pantana), peitz (Chelsea Peitz).
Wave 8 — Design & Staging: eisen (Cheryl Eisen), gaines (Joanna Gaines), mcgee (Shea McGee).

============ PER-ADVISOR RESEARCH PROCEDURE (repeat 34 times) ============
1. SEARCH (WebSearch, 4-8 queries per advisor — vary the angles):
   - "<name> real estate scripts", "<name> framework", "<name> YouTube best videos", "<name> podcast interview", "<name> book summary", "<name> method/system", "<name> objection handling", plus specialty-specific angles (e.g., "Bill Gross probate overbid formula", "Espinosa short sale package", "Mulrenin reverse selling tonality").
2. FETCH (WebFetch) the 3-6 richest results per advisor: long-form articles, interview writeups, episode summaries, book-chapter breakdowns, transcript excerpts. Prefer primary or near-primary sources (their own site/channel descriptions, reputable industry coverage).
3. EXTRACT with integrity — capture ONLY what sources support:
   a. Named frameworks and their actual mechanics (steps, not vibes)
   b. Word-for-word scripts/dialogues they teach publicly
   c. Numbers & formulas: cadences, ratios, price rules, timelines
   d. Contrarian positions — what they argue AGAINST
   e. Signature vocabulary and phrases
   f. Common mistakes they call out in agents
   g. 5-8 "ask me about" questions this advisor uniquely answers well
   NEVER invent quotes. If a claim appears in only one thin source, mark it "(single source)" or drop it. If research contradicts the existing dossier, the research wins — fix the dossier.
4. WRITE backend/kb/<id>.md (700-1500 words), sections: Philosophy / Named Frameworks / Scripts & Language / Numbers & Formulas / What They Argue Against / Mistakes They Call Out / Example Questions / Sources (list the URLs used).
5. FOLD BACK: rewrite that advisor's `deep` field in backend/experts_kb.py as the best ≤300-word distillation of the kb file. After each wave, sanity-check that an 8-advisor deep panel prompt stays ≲8K tokens (rough count: chars/4); trim the longest dossiers if not.
6. COMMIT after each advisor; push after each wave (each push auto-deploys — verify /api/diag afterward).

============ AFTER WAVE 2 (do these once, then keep them updated) ============
A. RETRIEVAL LAYER: add to demo_server.py a lightweight topic retriever — map query keywords (probate, NOD, FSBO, expired, staging, BRRRR, cap rate, español, divorce, tax...) to kb file sections; when a query matches, inject the 2-3 most relevant kb sections into the prompt even on large panels. Pure Python string/keyword matching, no embeddings, no cost. Verify live with a probate query on an all-advisors panel.
B. SPANISH SCRIPT LIBRARY: backend/kb/espanol_scripts.md — cold call, FSBO, expired, door knock, probate condolence, NOD urgency, listing-presentation opener — each in English AND natural US-Latino Spanish (informed by Wave 2 research), plus ITIN/DPA lending notes and cultural-fluency guidance. Wire into the retriever for Spanish-context queries.

============ QUALITY GATES (per wave — log pass/fail in BUILD_LOG.md) ============
Run 3 realistic test queries through a focused panel of that wave's advisors (local python against generate_response_with_groq). PASS only if the answers use frameworks/scripts/numbers that exist in the researched kb files (spot-check by grepping the kb file for the cited concept). On FAIL: strengthen the dossier or the retrieval mapping and retest. After the final wave, run a cross-wave regression: 6 queries spanning specialties, 2 of them in Spanish.

============ SHIP STEPS (end of run, or end of each day) ============
1. Regenerate the Claude skill: rebuild roundtable-skill/roundtable-coach/references/experts.md from the enriched EXPERTS dict, ADD references/scripts.md (the bilingual script library), re-zip to roundtable-skill.zip. Verify https://ask-ryan.vercel.app/roundtable-skill.zip serves the new size.
2. Update the landing page only if claims change (e.g., "research-backed dossiers" language) — no redesign.
3. Final BUILD_LOG.md entry: advisors completed, sources consulted (count), gates passed, dossier before/after examples, anything deferred.

DEFINITION OF DONE: RESEARCH_STATE.md shows all 34 [x]; backend/kb/ holds 34 sourced knowledge files + espanol_scripts.md; every dossier in experts_kb.py is research-backed; retrieval layer live and verified; all quality gates passed; skill zip regenerated and downloadable; $0 spent.
