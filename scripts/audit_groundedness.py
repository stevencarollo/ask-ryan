# -*- coding: utf-8 -*-
"""Measure how much of each advisor's OWN researched vocabulary reaches their scripts.

Distinctive terms are found by TF-IDF across the 34 dossiers, so "distinctive"
means distinctive to THAT advisor, not just common real-estate words. Names,
places, platforms and meta words are excluded - they could never belong in a
prospecting script and would flatter the score.

Treat the number as directional, not a verdict: some absences are correct craft
(Chad Corbett saying "settling the estate" instead of "probate" to a grieving
family is right, and scores as a miss).

    python scripts/audit_groundedness.py
    python scripts/audit_groundedness.py --compare scripts_data.PRE-REGROUND-*.js
"""
import argparse
import collections
import importlib.util
import json
import math
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

JUNK = set("""tiktok youtube instagram facebook google zillow linkedin podcast reddit
newsletter subscriber blog vlog channel followers episode webinar course masterclass
nahrep keller compass exp remax realtor realtors association conference summit
orlando nashville phoenix austin atlanta manhattan brooklyn queens
researched dossier verbatim quotes guide guides explainer teaching doctrine
author founder coach coaching students clients audience brand branding
were was they them his her their""".split())

BANNED = re.compile("|".join(re.escape(b) for b in
                             ["corridor", "unlock", "optimize", "landscape", "realm",
                              "seamless", "robust", "elevate", "streamline", "curated",
                              "synergy", "holistic", "navigate the complexit",
                              "value proposition", "deep dive", "circle back"]), re.I)


def toks(t):
    return [w for w in re.findall(r"[a-z][a-z'\-]{3,}", t.lower()) if w not in JUNK]


def score(lib_path, bs, doss, name2id, per, df, N):
    src = Path(lib_path).read_text(encoding="utf-8")
    S = [dict(zip(("t", "ch", "adv", "title", "body"), m)) for m in bs.SCRIPT_RE.findall(src)]
    rows, filler = [], 0
    for s in S:
        if BANNED.search(s["body"]):
            filler += 1
    for adv in sorted({s["adv"] for s in S}):
        aid = name2id.get(adv)
        if not aid or aid not in per:
            continue
        mine = [s for s in S if s["adv"] == adv]
        scored = sorted(((c * math.log(N / (1 + df[w])), w)
                         for w, c in per[aid].items() if c >= 3 and w not in JUNK),
                        reverse=True)[:15]
        sig = [w for _, w in scored]
        blob = " ".join(x["body"] for x in mine).lower()
        hit = [w for w in sig if w in blob]
        rows.append((len(hit) / max(len(sig), 1), adv, len(mine), hit, sig))
    return rows, filler, len(S)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--compare", default="")
    args = ap.parse_args()

    spec = importlib.util.spec_from_file_location("bs", str(ROOT / "scripts" / "build_spanish.py"))
    bs = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(bs)

    doss = json.loads((ROOT / "scripts" / "experts_dossier.json").read_text(encoding="utf-8"))
    name2id = {v["name"]: k for k, v in doss.items()}
    for v in doss.values():
        for part in re.findall(r"[A-Za-z]+", v["name"]):
            JUNK.add(part.lower())

    kb = {}
    for k, v in doss.items():
        txt = v.get("deep", "") + " " + v.get("style", "")
        f = ROOT / "backend" / "kb" / (k + ".md")
        if f.exists():
            txt += " " + f.read_text(encoding="utf-8", errors="ignore")
        kb[k] = txt
    df, per = collections.Counter(), {}
    for k, t in kb.items():
        per[k] = collections.Counter(toks(t))
        for w in set(per[k]):
            df[w] += 1
    N = len(kb)

    now, filler_now, n_now = score(ROOT / "scripts_data.js", bs, doss, name2id, per, df, N)
    avg_now = 100 * sum(r[0] for r in now) / len(now)

    if args.compare:
        old, filler_old, _ = score(args.compare, bs, doss, name2id, per, df, N)
        avg_old = 100 * sum(r[0] for r in old) / len(old)
        omap = {r[1]: r[0] for r in old}
        print(f"{'ADVISOR':26s} {'BEFORE':>7} {'AFTER':>7} {'CHANGE':>8}")
        print("-" * 54)
        for pct, adv, n, hit, sig in sorted(now, key=lambda r: -(r[0] - omap.get(r[1], 0))):
            b = omap.get(adv, 0)
            print(f"{adv:26s} {b*100:6.0f}% {pct*100:6.0f}% {(pct-b)*100:+7.0f}")
        print("-" * 54)
        print(f"{'LIBRARY AVERAGE':26s} {avg_old:6.0f}% {avg_now:6.0f}% {avg_now-avg_old:+7.0f}")
        print(f"{'scripts w/ generic filler':26s} {filler_old:6d}  {filler_now:6d}")
    else:
        for pct, adv, n, hit, sig in sorted(now):
            print(f"{pct*100:4.0f}%  {adv:26s} {n:3d} scripts   uses: {', '.join(hit[:6])}")
        print("-" * 60)
        print(f"library average {avg_now:.0f}%  |  scripts with generic filler: {filler_now}"
              f"  |  scripts: {n_now}")


if __name__ == "__main__":
    main()
