"""
Lightweight topic retrieval over the researched knowledge library (backend/kb/*.md).

When a query touches a known topic (probate, NOD, FSBO, espanol, staging...),
the most relevant kb sections get injected into the prompt - even when the
selected panel is too large for full dossiers. Pure keyword matching: free, fast.
"""
import os
import re

KB_DIR = os.path.join(os.path.dirname(__file__), "kb")


def _load_kb():
    kb = {}
    if os.path.isdir(KB_DIR):
        for f in os.listdir(KB_DIR):
            if f.endswith(".md"):
                try:
                    kb[f[:-3]] = open(os.path.join(KB_DIR, f), encoding="utf-8").read()
                except Exception:
                    pass
    return kb


_KB = _load_kb()

# topic keyword -> kb file ids, strongest first
TOPICS = {
    "probate": ["gross", "corbett", "nicoletti"],
    "executor": ["corbett", "gross"],
    "personal representative": ["gross", "corbett"],
    "letters of administration": ["nicoletti", "gross"],
    "heir": ["nicoletti", "corbett"],
    "estate": ["corbett", "gross"],
    "court confirmation": ["gross"],
    "overbid": ["gross"],
    "quiet title": ["nicoletti", "ted"],
    "short sale": ["espinosa"],
    "nod": ["espinosa"],
    "notice of default": ["espinosa"],
    "foreclos": ["espinosa", "ted"],
    "underwater": ["espinosa"],
    "loan modification": ["espinosa"],
    "divorce": ["starks"],
    "family law": ["starks"],
    "elisor": ["starks"],
    "spouse": ["starks"],
    "tax lien": ["ted"],
    "tax deed": ["ted"],
    "tax default": ["ted"],
    "tax delinquent": ["ted"],
    "auction": ["ted", "gross"],
    "redemption": ["ted"],
    "expired": ["loida"],
    "fsbo": ["loida"],
    "for sale by owner": ["loida"],
    "door knock": ["loida"],
    "cold call": ["loida", "creyes"],
    "espanol": ["espanol_scripts", "loida", "figueroa", "creyes", "rene"],
    "español": ["espanol_scripts", "loida", "figueroa", "creyes", "rene"],
    "spanish": ["espanol_scripts", "loida", "figueroa", "creyes"],
    "latino": ["figueroa", "creyes", "espanol_scripts"],
    "hispanic": ["figueroa", "espanol_scripts"],
    "hispana": ["figueroa", "creyes", "espanol_scripts"],
    "itin": ["figueroa", "espanol_scripts"],
    "bilingual": ["figueroa", "loida", "espanol_scripts"],
    "patrimonio": ["creyes", "espanol_scripts"],
    "wholesal": ["creyes"],
    "virtual market": ["creyes"],
    "listing presentation": ["rene", "harris"],
    "identity story": ["rene"],
    "objection": ["rene", "loida", "mulrenin"],
    "team": ["figueroa"],
    "accountability": ["figueroa"],
}


def retrieve_kb_sections(query: str, max_chars: int = 4500, max_files: int = 3) -> str:
    """Return the most relevant research-library excerpts for a query ('' if none)."""
    q = (query or "").lower()
    if not q or not _KB:
        return ""
    scored = {}
    for kw, ids in TOPICS.items():
        if kw in q:
            for rank, i in enumerate(ids):
                if i in _KB:
                    scored[i] = scored.get(i, 0) + (len(ids) - rank)
    if not scored:
        return ""
    picked = sorted(scored, key=scored.get, reverse=True)[:max_files]

    qwords = set(re.findall(r"[a-zà-ÿ]{4,}", q))

    out, total = [], 0
    for i in picked:
        text = _KB[i]
        sections = re.split(r"\n(?=## )", text)
        body = sections[1:] if len(sections) > 1 else sections

        def score(s):
            sl = s.lower()
            return sum(sl.count(w) for w in qwords)

        best = sorted(body, key=score, reverse=True)[:2]
        chunk = "\n\n".join(best).strip()
        room = max_chars - total
        if room <= 200:
            break
        chunk = chunk[:room]
        total += len(chunk)
        out.append(f"--- Research library: {i} ---\n{chunk}")
    return "\n\n".join(out)
