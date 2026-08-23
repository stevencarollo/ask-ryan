# -*- coding: utf-8 -*-
"""Re-ground all 274 scripts in the advisors' own researched material.

The library was originally authored from topic + advisor NAME, so the writing
reached for generic industry vocabulary ("corridor" seven times across Tyler
Cauble's six scripts) instead of the doctrine the research actually contains
(cap rate = NOI / value, "a snapshot, not a return", underwrite the lease).
This pass rewrites each script with that advisor's dossier in context.

It writes to a keyed JSON first - the live library is only assembled once you
run apply_regrounded.py - so a partial or bad run can never corrupt the vault.

    python scripts/reground_library.py                 # run / resume
    python scripts/reground_library.py --adv "Tom Ferry"
    python scripts/reground_library.py --limit 5
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
OUT = ROOT / "scripts" / "regrounded.json"
LOG = ROOT / "logs" / "reground.log"

# generic filler that betrays a script written by a machine rather than a broker
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
          "navigate the complexit",
          "value proposition", "best-in-class", "game-chang", "cutting-edge",
          "deep dive", "circle back", "myriad", "plethora", "tapestry",
          "testament to", "ever-changing"]
BANNED_RE = re.compile("|".join(re.escape(b) for b in BANNED), re.I)

# measured from the library: what each format naturally runs
FORMAT_MEDIAN = {"call": 126, "vm": 70, "text": 42, "email": 123}


def log(m):
    LOG.parent.mkdir(parents=True, exist_ok=True)
    line = time.strftime("%H:%M:%S") + "  " + m
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(line + "\n")
    try:
        print(line, flush=True)
    except UnicodeEncodeError:
        print(line.encode("ascii", "replace").decode(), flush=True)


PROMPT = """You are writing a real estate prospecting script IN THE VOICE AND METHOD of {adv}.

Everything below is RESEARCH on how this person actually thinks, teaches and speaks.
Use THEIR frameworks, THEIR numbers, THEIR vocabulary. Where they have a signature
idea that fits this script's job, use it explicitly and correctly.

===== RESEARCH DOSSIER: {adv} =====
{kb}
===== END DOSSIER =====

Rewrite the script below so it is unmistakably this practitioner.

BANNED WORDS - generic filler that gives away a script no working agent wrote:
{banned}
Also: never lean on the same distinctive noun twice in one script.
{source_filler}

JUDGEMENT - this matters more than jargon coverage:
- Do NOT force technical terms in front of a homeowner who would not use them.
  A grieving family gets "settling the estate", not "probate administration".
  An owner in default gets plain language, not underwriting vocabulary.
  Use the advisor's technical doctrine where they would use it - with investors,
  principals and other professionals - and their plain words everywhere else.
- The goal is that THIS PERSON would recognise the script as theirs, not that it
  contains the most keywords.
- NEVER announce the method. Nobody says "our doctrine", "our machine", "our
  proven system". The research is written ABOUT this person; its labels are not
  their words and must never appear in a script.
- Their signature phrases are seasoning, not the meal: at most ONE per script.
- USE the method; never NAME it. The homeowner should feel the technique working,
  not hear its label. Writing "influence is about giving you information" or
  "this is a calibrated question" is worse than the generic script you started
  with - it is jargon cosplay. No line may exist only to prove which advisor
  wrote it.

HARD RULES:
- Spoken language. Read it aloud in your head; if a working agent would not say
  it on a call, cut it.
- Every {{{{placeholder}}}} stays EXACTLY as written.
- LENGTH IS CRAFT, NOT PACKAGING. The original is {words} words. Yours must be
  between {lo} and {hi} words. Shorter is always better than longer. A voicemail
  that runs past 40 seconds gets deleted before the callback number; a text that
  needs scrolling does not get read. If adding their doctrine costs you words,
  cut something else - do not append.
- Same format ({ch}) and the same JOB.
- Emails keep the literal "Subject: " label. Call scripts keep "YOU:" labels and
  (coaching notes) in parentheses.
- No markdown, no bullet characters the original did not use.

TOPIC: {topic}    FORMAT: {ch}    TITLE: {title}

CURRENT SCRIPT (the JOB is right; the voice is generic):
{body}

Respond with ONLY JSON:
{{"script": "the rewritten script", "grounded_in": "which specific ideas/numbers of theirs you used"}}"""


def validate(src, out, ch):
    errs = []
    if not out or len(out) < 40:
        return ["empty"]
    # Inventing a placeholder is a real defect - the merge engine would leave a
    # raw {{Foo}} sitting in the agent's script. Dropping one is not: it only
    # means this version does not reference that detail. So: subset, not equal.
    src_ph = set(re.findall(r"\{\{[^}]+\}\}", src))
    out_ph = set(re.findall(r"\{\{[^}]+\}\}", out))
    invented = out_ph - src_ph
    if invented:
        errs.append("invented:" + ",".join(sorted(invented))[:26])
    # but the prospect must still be addressed if the original addressed them
    for who in ("{{Owner}}", "{{Name}}"):
        if who in src_ph and not (out_ph & {"{{Owner}}", "{{Name}}"}):
            errs.append("lost-prospect-name")
            break
    hit = BANNED_RE.search(out)
    if hit:
        errs.append("banned:" + hit.group(0)[:18])
    r = len(out) / max(len(src), 1)
    if not (0.75 <= r <= 1.25):
        errs.append("length %.2f" % r)
    words = len(out.split())
    if ch == "vm" and words > 95:          # ~40 seconds spoken
        errs.append("vm %dw" % words)
    if ch == "text" and words > 75:        # has to read without scrolling
        errs.append("text %dw" % words)
    if ch == "email" and not out.lstrip().startswith("Subject:"):
        errs.append("no-subject")
    if ch == "call" and "YOU:" in src and "YOU:" not in out:
        errs.append("lost-YOU-label")
    if "```" in out or re.search(r"^\s*[-*]\s", out, re.M) and not re.search(r"^\s*[-*]\s", src, re.M):
        errs.append("markdown")
    return errs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--adv", default="")
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

    sys.path.insert(0, str(ROOT / "backend"))
    spec = importlib.util.spec_from_file_location("ds", str(ROOT / "backend" / "demo_server.py"))
    ds = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ds)

    bspec = importlib.util.spec_from_file_location("bs", str(ROOT / "scripts" / "build_spanish.py"))
    bs = importlib.util.module_from_spec(bspec)
    bspec.loader.exec_module(bs)

    doss = json.loads((ROOT / "scripts" / "experts_dossier.json").read_text(encoding="utf-8"))
    name2id = {v["name"]: k for k, v in doss.items()}

    def dossier_for(adv):
        aid = name2id.get(adv)
        if not aid:
            return ""
        txt = ""
        f = ROOT / "backend" / "kb" / (aid + ".md")
        if f.exists():
            txt = f.read_text(encoding="utf-8", errors="ignore")
        if len(txt) < 400:
            txt = (doss[aid].get("deep", "") or "") + "\n" + (doss[aid].get("style", "") or "")
        return txt[:7000]

    scripts = bs.load_scripts()
    done = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    todo = [s for s in scripts if s["key"] not in done]
    if args.adv:
        todo = [s for s in todo if s["adv"] == args.adv]
    if args.limit:
        todo = todo[:args.limit]

    log("=" * 62)
    log("Re-grounding library - %d done, %d to go (of %d)" % (len(done), len(todo), len(scripts)))

    ok = fail = 0
    banned_before = sum(1 for s in scripts if BANNED_RE.search(s["body"]))
    log("scripts containing banned filler right now: %d" % banned_before)

    for i, s in enumerate(todo, 1):
        kb = dossier_for(s["adv"])
        w = len(s["body"].split())
        found = sorted({m.group(0).lower() for m in BANNED_RE.finditer(s["body"])})
        src_filler = ("\nNOTE: the current script itself contains the banned word(s): "
                      + ", ".join(found) + ". Removing them is part of this job - do not copy them through."
                      ) if found else ""
        # a script well under its format's normal length should be judged against
        # that format, not against a percentage of an unusually terse original
        med = FORMAT_MEDIAN.get(s["ch"], w)
        lo, hi = int(w * 0.85), int(w * 1.15)
        if w < med * 0.85:
            hi = max(hi, int(med * 1.05))
        if not kb:
            log("   no dossier for %s - leaving as-is" % s["adv"])
            continue
        attempt, final, errs = 0, None, ["unstarted"]
        while attempt < 3 and errs:
            attempt += 1
            try:
                r, lane = ds.ai_chat_json(
                    PROMPT.format(adv=s["adv"], kb=kb, banned=", ".join(BANNED),
                                  topic=s["t"], ch=s["ch"], title=s["title"], body=s["body"],
                                  words=w, lo=lo, hi=hi, source_filler=src_filler),
                    max_tokens=2400, temperature=0.6)
                cand = (r or {}).get("script", "")
                errs = validate(s["body"], cand, s["ch"])
                if not errs:
                    final = cand
                    grounded = (r or {}).get("grounded_in", "")
            except RuntimeError as exc:
                log("   lanes exhausted (%s) - pausing 90s" % str(exc)[:50])
                time.sleep(90)
                attempt -= 1
            except Exception as exc:  # noqa: BLE001
                log("   error: %s" % str(exc)[:80])
                time.sleep(3)

        if final:
            done[s["key"]] = {"script": final, "grounded_in": grounded,
                              "adv": s["adv"], "t": s["t"], "ch": s["ch"], "title": s["title"]}
            ok += 1
            OUT.write_text(json.dumps(done, ensure_ascii=False), encoding="utf-8")
        else:
            fail += 1
            log("   KEPT ORIGINAL %s/%s %s :: %s" % (s["t"], s["ch"], s["title"][:32], errs))

        if i % 10 == 0 or i == len(todo):
            log("   %d/%d  rewritten=%d kept=%d  (%s)" % (i, len(todo), ok, fail, s["adv"][:18]))
        time.sleep(0.3)

    log("DONE - %d rewritten, %d kept as original. Staged in %s" % (ok, fail, OUT.name))
    log("Next: python scripts/apply_regrounded.py   (assembles the live library)")


if __name__ == "__main__":
    main()
