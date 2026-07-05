"""
Podcast Studio catalog: per-advisor episode concepts (grounded in the researched
kb library), host first names, and voice genders for playback casting.
"""

# id -> {first, gender ('m'/'f'), concepts: [3 episode concepts]}
PODCAST_ADVISORS = {
    "serhant":    {"first": "Ryan",     "gender": "m", "concepts": [
        "The Three F's: follow-up systems that never drop a ball",
        "Sell the lifestyle, not the square footage",
        "Big Money Energy: building a brand that prospects for you"]},
    "harris":     {"first": "Tim",      "gender": "m", "concepts": [
        "No prequalification, no appointment",
        "The 7 P's of profitable listings",
        "Buyer leads are listing leads in disguise"]},
    "mulrenin":   {"first": "Brandon",  "gender": "m", "concepts": [
        "Reverse selling: make the FSBO invite you over",
        "The ASP method: acknowledge, empathize, pivot",
        "Tonality: killing commission breath forever"]},
    "carruthers": {"first": "Ricky",    "gender": "m", "concepts": [
        "It's not about the deal, it's about the relationship",
        "Mail + call stacking: turning 3% into 18%",
        "100 deals a year solo: the five-step process"]},
    "ferry":      {"first": "Tom",      "gender": "m", "concepts": [
        "Math makes action obvious: the appointments model",
        "3-5 listing pillars without pillar sprawl",
        "The weekly Big 3: accountability that compounds"]},
    "buffini":    {"first": "Brian",    "gender": "m", "concepts": [
        "Give, Ask, Receive: the work-by-referral system",
        "Items of value and the 7x follow-up call",
        "Sorting your database A+ to D (D stands for delete)"]},
    "keller":     {"first": "Gary",     "gender": "m", "concepts": [
        "The Three L's: leads, listings, leverage",
        "The 8x8 and 33-touch systems explained",
        "The ONE Thing: the focusing question"]},
    "sharran":    {"first": "Sharran",  "gender": "m", "concepts": [
        "The 94.5% listing consultation",
        "Owner P&L vs agent P&L: building wealth beyond commissions",
        "The listing pre-launch blueprint"]},
    "glennda":    {"first": "Glennda",  "gender": "f", "concepts": [
        "Be you - and just turn up the volume",
        "The story formula: detail, stakes, lesson",
        "Batching 30 videos before breakfast"]},
    "lazine":     {"first": "Byron",    "gender": "m", "concepts": [
        "React within 24 hours - with a take, not a summary",
        "Marry the house, date the rate: the full argument",
        "Practitioner plus media beats pundit"]},
    "burgess":    {"first": "Jimmy",    "gender": "m", "concepts": [
        "$11M in 90 days: the unsolicited video CMA",
        "Nine steps to a top year",
        "AI in the daily agent workflow"]},
    "pantana":    {"first": "Jason",    "gender": "m", "concepts": [
        "The 9 Google Business Profile ranking cheat codes",
        "Hook-first marketing: the first line is 80% of the asset",
        "Cost per appointment, not cost per lead"]},
    "peitz":      {"first": "Chelsea",  "gender": "f", "concepts": [
        "Content vs context: your face IS the brand",
        "Document, don't create",
        "The money is in the DMs"]},
    "voss":       {"first": "Chris",    "gender": "m", "concepts": [
        "Tactical empathy: mirror, label, calibrated question",
        "Negotiation begins at no",
        "The Ackerman model: 65-85-95-100"]},
    "gaines":     {"first": "Joanna",   "gender": "f", "concepts": [
        "It's not about a style, it's about a story",
        "Layering: the textures that make homes feel warm",
        "Timeless over trendy: choices that age well"]},
    "mcgee":      {"first": "Shea",     "gender": "f", "concepts": [
        "Scale first: why expensive rooms still look cheap",
        "Breaking symmetry and ditching matching sets",
        "Designing a new build to look better in 20 years"]},
    "eisen":      {"first": "Cheryl",   "gender": "f", "concepts": [
        "Buyers want a fantasy: staging as merchandising",
        "The moments method: vignettes that sell the click",
        "Staging cost vs the first price cut"]},
    "knakal":     {"first": "Bob",      "gender": "m", "concepts": [
        "The territory system: owning your patch block by block",
        "Information wins: from 26% to 98% pitch success",
        "Owner relationships measured in decades"]},
    "cauble":     {"first": "Tyler",    "gender": "m", "concepts": [
        "Cap rate is a snapshot, not a return",
        "NNN leases decoded: who really pays what",
        "Your first neighborhood-scale commercial deal"]},
    "mcelroy":    {"first": "Ken",      "gender": "m", "concepts": [
        "Buy on actuals - the proforma is a sales brochure",
        "Forced appreciation through management",
        "Refi, don't sell: never kill the golden goose"]},
    "tarek":      {"first": "Tarek",    "gender": "m", "concepts": [
        "Renovate to the comps, not your taste",
        "Evaluate, emulate, renovate, duplicate",
        "Finding opportunity in distress"]},
    "norton":     {"first": "Jerry",    "gender": "m", "concepts": [
        "The 65% formula: max offers that protect profit",
        "Hot markets: the discipline gap IS the opportunity",
        "90 ways to find motivated sellers"]},
    "morby":      {"first": "Pace",     "gender": "m", "concepts": [
        "Get better or get creative",
        "Subject-to, explained straight",
        "Price OR terms - never both"]},
    "greene":     {"first": "David",    "gender": "m", "concepts": [
        "BRRRR: recycling the same capital forever",
        "The Core Four: your long-distance team",
        "The 1% screen and the real cash-flow math"]},
    "corbett":    {"first": "Chad",     "gender": "m", "concepts": [
        "Monetize every conversation",
        "The 68-day rule of probate outreach",
        "Two or three attorney relationships for life"]},
    "nicoletti":  {"first": "Al",       "gender": "m", "concepts": [
        "The three-player rule: judge, title, underwriter",
        "Unsticking the probates everyone gave up on",
        "How long and how much: forcing clarity from lawyers"]},
    "gross":      {"first": "Bill",     "gender": "m", "concepts": [
        "Stuck probate: the listings everyone abandoned",
        "Court confirmation and the overbid formula",
        "Eleven ways into one probate case"]},
    "starks":     {"first": "Laurel",   "gender": "f", "concepts": [
        "Switzerland: surviving divorce listings as the neutral",
        "The elisor: what happens when a spouse won't sign",
        "Winning family law attorneys as referral partners"]},
    "espinosa":   {"first": "Nicole",   "gender": "f", "concepts": [
        "The complete-package doctrine for short sales",
        "The NOD clock and the homeowner options map",
        "Drive the bank: negotiators carrying 800 files"]},
    "ted":        {"first": "Ted",      "gender": "m", "concepts": [
        "Tax liens vs tax deeds: two different games",
        "The 20-30-3-1 auction funnel",
        "Excess proceeds: the niche nobody works"]},
    "loida":      {"first": "Loida",    "gender": "f", "concepts": [
        "30 real conversations a day, no matter what",
        "Frustration equals motivation: reading angry sellers",
        "Bilingual prospecting that stays in Spanish"]},
    "figueroa":   {"first": "Veronica", "gender": "f", "concepts": [
        "Heritage is an advantage, not a ceiling",
        "Asking permission to hold people accountable",
        "ITIN loans and the financing nobody learns"]},
    "creyes":     {"first": "Carlos",   "gender": "m", "concepts": [
        "We're marketers that do real estate investing",
        "From $500 a month to a deal machine",
        "WhatsApp deal flow en español"]},
    "rene":       {"first": "Rene",     "gender": "m", "concepts": [
        "Frame, message, tie-down - in that order",
        "The 90-second identity story",
        "Never open with the CMA"]},
}
