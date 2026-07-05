
## 2026-07-04 — WAVE 1 COMPLETE: Distressed & Legal (research program)
Built: sourced knowledge files backend/kb/{gross,espinosa,nicoletti,corbett,starks,ted}.md
(each: Philosophy / Frameworks / Scripts / Numbers / Contrarian / Example Questions / Sources with URLs).
Dossiers in experts_kb.py rewritten from research (238-302 words each, 8-seat panel fits free tier).
Sources: REI Diamonds + Probate Mastery transcripts (Gross), We Close Notes EP454 (Espinosa),
Flip Talk + RE Excellence (Nicoletti), Probate Mastery ep38 + EPM live training (Corbett),
Probate Mastery + Kevin&Fred interviews (Starks), REtipster ep196 + tedthomas.com guides (Ted).
Verification: wave1_gate.py — 5/5 PASS (answers cite researched frameworks: PC-10311 overbid math,
short-sale package contents, elisor path, 68-day rule, tax-deed funnel).
Tooling: scripts/fold_dossier.py (reusable fold-back, immune to heredoc backslash mangling).
Next: Wave 2 Español (loida, figueroa, creyes, rene) then retrieval layer + bilingual script library.

## 2026-07-04 — WAVE 2 COMPLETE: Espanol & Bilingual (research program)
Built: sourced kb files for loida (PropStream/REDX verbatim expired script/Realtyna),
figueroa (Team OS FUBCON, Sisu, eXp Life, NAHREP - #1 eXp mega team, accountability-with-consent),
creyes (REI Mastery ep809 - marketers-first doctrine, channel rankings, $500->$97K/mo spend arc),
rene (Amplify Your Influence breakdown + RBC ep28 - AMPLIFII frame/message/tie-down, identity story).
Gate: wave2_gate.py 3/3 PASS incl. Spanish-language test (answered en espanol citing researched concepts).
Skill zip REGENERATED with enriched dossiers + full research library bundled (references/research/*.md).
Progress: 10 of 34 advisors research-backed. Next: retrieval layer + espanol_scripts.md, then Wave 3 (Mulrenin, Harris, Carruthers, Serhant).

## 2026-07-04 — RETRIEVAL LAYER + BILINGUAL SCRIPT LIBRARY
Built: backend/kb_retrieval.py (topic keyword -> kb section injection, capped 4.5K chars) wired into
generate_response_with_groq; backend/kb/espanol_scripts.md (7 scripts EN+ES: cold call, FSBO, expired,
door knock, probate condolence, NOD urgency, listing opener + ITIN/DPA cultural notes).
Gate: retrieval_gate.py - 4/4 unit retrievals OK; FULL 34-advisor panel probate test PASS (cites PC-10311
formula from library despite style-only dossiers). Skill zip rebuilt (research library + scripts bundled).

## 2026-07-04 — WAVE 3 COMPLETE: Prospecting & Scripts
kb files: mulrenin (Reverse Selling book breakdown - ASP method, waterfall, seed plant), harris (7 P's,
verbatim 5-question buyer prequal), carruthers (Zero to Diamond - NAME CORRECTED to Ricky Carruth,
five-step process, 3%->18% mail+call math, FSBO free-help play), serhant (Sell It Like Serhant - Three F's,
FKD, six reasons balls drop, Four W's, seven client stages, Wow Effect).
Research correction shipped: Ricky Carruthers -> Ricky Carruth in KB + frontend UI.
Skill zip rebuilt with 15 research files. Progress: 14 of 34 advisors research-backed.
Next: Wave 4 (ferry, buffini, keller, sharran).

## 2026-07-04 — WAVE 4 COMPLETE: Coaching & Business
kb files: ferry (5-step business plan, appointments math verbatim; CORRECTED 8x8/33-touch misattribution),
buffini (IOV monthly rhythm, 7x follow-up call multiplier, A+-to-D sorting), keller (MREA four models,
verbatim 8x8 + 33-touch breakdowns - the true home of those systems), sharran (verified bio incl. role
update to Acquisition.com CEO; 94.5% listing consultation claim; pre-launch blueprint).
Skill zip rebuilt (19 research files). Progress: 18 of 34 advisors research-backed.
Next: Wave 5 (voss, norton, morby, greene, tarek).

## 2026-07-04 — WAVE 5 COMPLETE: Negotiation & Investing
kb files: voss (full toolkit + Ackerman 65/85/95/100, rule of three, pronoun analysis), norton (verbatim
65% formula + worked example + hot-market gap strategy - CORRECTED from generic 70% rule), morby (verified
structures, 30K/0-down/0%-interest example, 1-in-22 conversion), greene (BRRRR worked math 0K+0K->
20K ARV->75% refi, Core Four + brokerage hack, contractor draw controls), tarek (four-step process,
comp-band renovation rule, ~1,000 flips).
Skill zip rebuilt (24 research files). Progress: 23 of 34 advisors research-backed.
Next: Wave 6 Commercial (knakal, cauble, mcelroy), then Wave 7 Marketing (5), Wave 8 Design (3).

## 2026-07-04 — DEEP RESEARCH PROGRAM COMPLETE: ALL 34 ADVISORS
Waves 6-8 finished: knakal (territory system, map-room 98% stat), cauble (cap-rate teaching + 2026
ranges), mcelroy (NOI doctrine, management levers), glennda (NAR-verified TikTok method + numbers),
lazine (BAM playbook, Hot Sheet method), burgess ($11M video-CMA mechanics verified), pantana (9 GBP
cheat codes), peitz (camera-first doctrine), eisen (Forbes-verified IMG scale + moments method),
gaines (story-over-rules verbatim), mcgee (scale/texture/symmetry rules + 4 small-space tips).
RESEARCH CORRECTIONS SHIPPED: Ricky Carruthers->Ricky Carruth (name); 8x8/33-touch belongs to Keller/
MREA not Ferry; Norton = 65% formula not 70% rule; Sharran role updated to Acquisition.com CEO.
FINAL REGRESSION: final_gate.py 5/5 PASS across flips math (65% formula computed correctly), Voss
sequence, design rules, Spanish ITIN/DPA, GBP ranking.
TOTALS: 34 sourced kb files + espanol_scripts.md (~35 research artifacts, every claim source-listed);
all dossiers research-backed; retrieval layer serving deep sections to any panel size; skill zip
bundles the full library. Gates passed: W1 5/5, W2 3/3, retrieval 4/4+full-panel, final 5/5.
Sources consulted: ~70 searches + ~45 page fetches across podcasts transcripts, book breakdowns,
publisher pages, industry press (NAR, Forbes, Inman-adjacent), and the advisors' own sites.

## 2026-07-04 — TRUE CHAT THREAD UI (fixes "can't reply back")
Rebuilt frontend.html as a real conversation: alternating user/coach bubbles with full visible
history, composer FIXED AT THE BOTTOM under the coach's latest question, Enter-to-send
(Shift+Enter newline), typing indicator, auto-scroll, per-response Copy button, paperclip attach
with removable file chip, collapsible advisor panel with live seat count ("N of 34 seated -
deep-dossier mode" at <=8), friendly cold-start error message, welcome message, luxury
Cinzel/gold design preserved. All logic preserved: history+context+experts on /api/query,
experts JSON on /api/upload, extracted_text -> conversation document memory.

## 2026-07-04 — LISTING LINK IMPORT (the FlipAI dots, connected)
Built: backend/listing_parser.py - Python port of the FlipAI parse-zillow.ts fallback chain,
free strategies only: pasted Redfin/Realtor URL -> direct fetch + extraction (JSON-LD /
__NEXT_DATA__ / CDN-regex fallbacks); Zillow URL -> slug parse (street-suffix boundary bug
FIXED: '24923-Island-Ave-Carson' now parses correctly) -> constructed Realtor URL -> DDG->Redfin
-> DDG->Compass; any other URL (MLS/IDX portals) -> generic extractor (JSON-LD/og:image/jpg
harvest); final skeleton fallback prompts manual upload. Endpoint: POST /api/parse-listing.
Studio UI: "Import From a Link" bar - fills address/city/price/beds/baths/sqft/description,
auto-places first 4 photos, full tap-to-place photo gallery of up to 20 imported photos.
VERIFIED LOCALLY on a live Redfin listing (23045 Delford Ave, Carson): 11 photos, $700,000,
3/2/1316sqft + full description extracted via redfin-direct strategy.

## 2026-07-04 — FLYER STUDIO v2: 8 PREMIUM TEMPLATES
Studied Steve's real flyers (Wakefield/Chessington PDFs - the editorial estate house style: double-rule
frame, corner ticks, serif address + colored price, hairline stat rows, italic two-line tagline, cream
agent band with QR) and the FlipAI templates.tsx (27 modern React templates). Rebuilt the studio engine:
8 templates - Editorial Estate (faithful house style), Magazine Cover (FlipAI EditorialMagazine grid),
Luxury Gold (refined w/ corner ticks), Onyx Cinematic (hero overlay + strip), Architectural (swiss
hairline grid, numbered features), Gallery Wall (mosaic + gold price block), Bold Banner (floating price
card), Fresh Modern (rounded coastal). New: brokerage-logo upload, QR code from listing link (qrserver,
free) with 'SCAN FOR FULL LISTING' caption, Playfair Display type system, print-safe inline styles.

## 2026-07-04 — PODCAST STUDIO + NOTEBOOKLM CONNECTION
Built: /api/podcast-script - two-host ("The Roundtable Sessions": ALEX + MORGAN) NotebookLM-style
episode generator grounded in the researched kb via retrieval (verified: probate episode cites
overbid/IAEA material); returns title/description/turns + a formatted NotebookLM SOURCE DOCUMENT.
podcast-studio.html: 14 topic chips from the research library + custom topic + EN/ES + 4/6/10-min;
transcript view with host-colored turns; BUILT-IN two-voice playback (browser speech synthesis,
distinct A/B voices, play/pause/stop, progress bar, current-line highlight); transcript download;
NOTEBOOKLM HANDOFF: one click downloads the source doc + opens notebooklm.google.com (Google has no
public NotebookLM API - this is the deepest legal integration: doc formatted for Audio Overview).
Nav wired: chat topbar, flyer studio, landing. $0 - browser TTS is free, no new services.

## 2026-07-04 — REAL NOTEBOOKLM INTEGRATION (notebooklm-py bridge)
Steve provided github.com/teng-lin/notebooklm-py (unofficial client: notebooks, sources, Audio
Overview MP3 generation+download, headless storage-state auth). Built backend/nlm_bridge.py:
threaded job runner (create notebook -> add episode source doc -> generate audio overview ->
poll/download MP3 -> delete notebook), auth via ~/.notebooklm storage_state.json locally or
NLM_STORAGE_B64 env on Render. Endpoints: /api/nlm-ready, POST /api/nlm-audio (job start),
GET /api/nlm-audio/{id} (status), GET /api/nlm-audio/{id}/file (MP3). Podcast Studio UI: when
server has auth, a "Generate NotebookLM Audio" button appears with live progress + built-in
player + MP3 download; manual source-doc handoff remains for unconfigured servers.
Auth status: awaiting Steve's one-time Google login in the Playwright window (cookie imports
from Chrome/Edge blocked by app-bound encryption; Firefox has no Google session).
NOTE: unofficial API - can break if Google changes internals; uses Steve's own account.
