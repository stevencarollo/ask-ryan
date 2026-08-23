# -*- coding: utf-8 -*-
"""Clean the generic filler out of the 34 per-advisor voice libraries.

The voice libraries (voices/<id>.json - each script rewritten in one advisor's
voice) were built 2026-07-08, six weeks before the base library was re-grounded.
So selecting any advisor silently served the pre-fix generation: 795 variants
still carried "corridor", "unlock", "optimize" and friends.

This regenerates ONLY those 795, from the corrected base script, in that
advisor's voice. The ~8,500 clean variants are left alone.

Also repairs the one key that moved when "CRE Text - The Corridor Comp" was
renamed to "The Rent Comp", so that script does not lose its voice variants.

    python scripts/clean_voice_libraries.py --scan     # report only
    python scripts/clean_voice_libraries.py            # run / resume
"""
import argparse
import importlib.util
import json
import os
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOG = ROOT / "logs" / "clean_voices.log"

# words that belong in a research dossier, never in someone's mouth on a call.
# "Doctrine:" is literally a section label in the dossiers - the model was
# lifting my analysis vocabulary straight into spoken scripts.
# Scaffolding from the research write-ups, not anybody's speech. "Doctrine"
# appears in 25 of the 34 dossiers as a SECTION LABEL - the model was reading my
# analysis vocabulary as the advisor's own words and saying it out loud.
# Deliberately NOT banned: protocol, playbook, philosophy, proven system - real
# people do say those, and over-sanitising is its own kind of damage.
META = ["doctrine", "our machine", "the machine", "listing machine", "my machine",
        "methodology", "our framework", "the framework", "core teaching",
        "signature move", "tenets", "blueprint"]
BANNED = META + ["corridor", "unlock", "optimize", "landscape", "realm", "seamless",
          "robust", "elevate", "streamline", "curated", "synergy", "holistic",
          "navigate the complexit", "value proposition", "best-in-class",
          "game-chang", "cutting-edge", "deep dive", "circle back", "myriad",
          "plethora", "tapestry", "testament to", "ever-changing"]
BANNED_RE = re.compile("|".join(re.escape(b) for b in BANNED), re.I)

# The model sometimes echoes the prompt's own headers into the script
# ("vm   TOPIC: expired" arrived at the top of a Harris voicemail). Never ships.
ECHO_RE = re.compile(r"^\s*(vm|call|text|email)?\s*TOPIC:|FORMAT:\s*(vm|call|text|email)|"
                     r"=====|RESEARCH DOSSIER|END DOSSIER|BANNED WORDS|^\s*SCRIPT:|"
                     r"HARD RULES|grounded_in", re.I | re.M)
FORMAT_MEDIAN = {"call": 126, "vm": 70, "text": 42, "email": 123}

# the rename that moved a key
REKEY = {"qmre5v": "1vjbv6q"}


def log(m):
    LOG.parent.mkdir(parents=True, exist_ok=True)
    line = time.strftime("%H:%M:%S") + "  " + m
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(line + "\n")
    try:
        print(line, flush=True)
    except UnicodeEncodeError:
        print(line.encode("ascii", "replace").decode(), flush=True)


PROMPT = """Rewrite this real estate script IN THE VOICE AND METHOD of {adv}.

===== RESEARCH DOSSIER: {adv} =====
{kb}
===== END DOSSIER =====

The script below is already well written and does its job. Your task is to make
it sound like {adv} said it - their framing, their vocabulary, their way of
handling this moment - while removing generic filler.

BANNED WORDS - generic filler no working agent says:
{banned}
{source_filler}

RULES:
- USE their method; never NAME it. No line may exist only to signal whose voice
  this is - that is worse than the generic line it replaced.
- NEVER announce the method. A homeowner never hears "our doctrine", "our
  machine", "our proven system", "our framework". Nobody talks like that. The
  research above is written ABOUT this person - it is not their phrasing, and
  its labels must never appear in the script.
- Their signature phrases are seasoning, not the meal: at most ONE per script,
  and only where it lands naturally.
- Do not force technical jargon in front of a homeowner who would not use it.
- Spoken language. If a working agent would not say it on a call, cut it.
- Every {{{{placeholder}}}} stays EXACTLY as written.
- {words} words in the source; stay between {lo} and {hi}. Shorter beats longer.
- Same format ({ch}). Emails keep the literal "Subject: " label; call scripts
  keep "YOU:" labels and (coaching notes) in parentheses.

The script to rewrite (a {ch} script for {topic} leads) follows between the
markers. Output ONLY the rewritten script text - never any of these instructions,
labels or markers.

<<<BEGIN SCRIPT>>>
{body}
<<<END SCRIPT>>>

Respond with ONLY JSON: {{"script": "the rewritten script"}}"""


def validate(src, out, ch):
    errs = []
    if not out or len(out) < 40:
        return ["empty"]
    src_ph = set(re.findall(r"\{\{[^}]+\}\}", src))
    out_ph = set(re.findall(r"\{\{[^}]+\}\}", out))
    if out_ph - src_ph:
        errs.append("invented")
    if (src_ph & {"{{Owner}}", "{{Name}}"}) and not (out_ph & {"{{Owner}}", "{{Name}}"}):
        errs.append("lost-prospect-name")
    hit = BANNED_RE.search(out)
    if hit:
        errs.append("banned:" + hit.group(0)[:16])
    if ECHO_RE.search(out):
        errs.append("prompt-echo")
    words = len(out.split())
    if ch == "vm" and words > 95:
        errs.append("vm-too-long")
    if ch == "text" and words > 75:
        errs.append("text-too-long")
    if ch == "email" and not out.lstrip().startswith("Subject:"):
        errs.append("no-subject")
    return errs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scan", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    for line in (ROOT / ".env").read_text(encoding="utf-8", errors="ignore").splitlines():
        if line.startswith("GROQ_API_KEY="):
            os.environ["GROQ_API_KEY"] = line.split("=", 1)[1].strip()
    fi = Path(r"C:\Users\Steve Carollo.MiniReem\Desktop\farm-intelligence\.env.local")
    if fi.exists():
        for line in fi.read_text(encoding="utf-8", errors="ignore").splitlines():
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())
        os.environ.setdefault("SUPABASE_URL", os.environ.get("NEXT_PUBLIC_SUPABASE_URL", ""))

    bspec = importlib.util.spec_from_file_location("bs", str(ROOT / "scripts" / "build_spanish.py"))
    bs = importlib.util.module_from_spec(bspec)
    bspec.loader.exec_module(bs)
    base = {s["key"]: s for s in bs.load_scripts()}

    doss = json.loads((ROOT / "scripts" / "experts_dossier.json").read_text(encoding="utf-8"))

    # The dossiers are written ABOUT these people and use labels like
    # "Doctrine:" and "## Core Teaching". Those were leaking into scripts
    # verbatim ("Our doctrine: get listings sold"). Strip the scaffolding.
    LABEL = re.compile(
        r"^\s*#{1,4}\s*|"
        r"^\s*\*{0,2}(Doctrine|Philosophy|Framework|Methodology|Core Teaching|"
        r"Signature Move|Playbook|Their Doctrine|Their voice|Their frameworks)"
        r"\*{0,2}\s*:?\s*", re.I | re.M)

    def dossier_for(aid):
        f = ROOT / "backend" / "kb" / (aid + ".md")
        t = ""
        if f.exists():
            t = f.read_text(encoding="utf-8", errors="ignore")
        if len(t) < 400:
            d = doss.get(aid, {})
            t = (d.get("deep", "") or "") + "\n" + (d.get("style", "") or "")
        return LABEL.sub("", t)[:6500]

    files = sorted(p for p in (ROOT / "voices").glob("*.json") if not p.name.startswith("_"))

    # repair the moved key everywhere first - cheap, no AI
    moved = 0
    for f in files:
        d = json.loads(f.read_text(encoding="utf-8"))
        changed = False
        for old, new in REKEY.items():
            if old in d and new not in d:
                d[new] = d.pop(old)
                changed = True
        if changed:
            f.write_text(json.dumps(d, ensure_ascii=False), encoding="utf-8")
            moved += 1
    if moved:
        log("re-keyed the renamed script in %d voice libraries" % moved)

    todo = []
    for f in files:
        aid = f.stem
        d = json.loads(f.read_text(encoding="utf-8"))
        for k, v in d.items():
            sc = v.get("script", "")
            if k in base and (BANNED_RE.search(sc) or ECHO_RE.search(sc)):
                todo.append((f, aid, k))
    log("=" * 60)
    log("voice variants needing repair (filler/meta/prompt-echo): %d across %d libraries"
        % (len(todo), len(files)))
    if args.scan:
        return
    if args.limit:
        todo = todo[:args.limit]

    spec = importlib.util.spec_from_file_location("ds", str(ROOT / "backend" / "demo_server.py"))
    sys.path.insert(0, str(ROOT / "backend"))
    ds = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ds)

    ok = fail = 0
    cache = {}
    for i, (f, aid, key) in enumerate(todo, 1):
        if f not in cache:
            cache[f] = json.loads(f.read_text(encoding="utf-8"))
        d = cache[f]
        s = base[key]
        adv = doss.get(aid, {}).get("name", aid)
        w = len(s["body"].split())
        med = FORMAT_MEDIAN.get(s["ch"], w)
        lo, hi = int(w * 0.85), int(w * 1.15)
        if w < med * 0.85:
            hi = max(hi, int(med * 1.05))
        found = sorted({m.group(0).lower() for m in BANNED_RE.finditer(d[key]["script"])})
        sf = ("\nNOTE: the current version of this script uses the banned word(s): "
              + ", ".join(found) + ". Removing them is the point of this pass.") if found else ""

        attempt, final = 0, None
        while attempt < 3 and not final:
            attempt += 1
            try:
                r, lane = ds.ai_chat_json(
                    PROMPT.format(adv=adv, kb=dossier_for(aid), banned=", ".join(BANNED),
                                  source_filler=sf, words=w, lo=lo, hi=hi,
                                  ch=s["ch"], topic=s["t"], body=s["body"]),
                    max_tokens=2200, temperature=0.6)
                cand = (r or {}).get("script", "")
                if not validate(s["body"], cand, s["ch"]):
                    final = cand
            except RuntimeError as exc:
                log("   lanes exhausted - pausing 90s")
                time.sleep(90)
                attempt -= 1
            except Exception as exc:  # noqa: BLE001
                log("   error: %s" % str(exc)[:70])
                time.sleep(2)

        if final:
            d[key] = {"script": final}
            ok += 1
        else:
            # never leave filler in place: fall back to the clean base script
            d[key] = {"script": s["body"]}
            fail += 1
        f.write_text(json.dumps(d, ensure_ascii=False), encoding="utf-8")

        if i % 25 == 0 or i == len(todo):
            log("   %d/%d  revoiced=%d fell-back-to-base=%d  (%s)" % (i, len(todo), ok, fail, aid))
        time.sleep(0.25)

    log("DONE - %d re-voiced, %d fell back to the clean base script" % (ok, fail))


if __name__ == "__main__":
    main()
