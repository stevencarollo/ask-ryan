# -*- coding: utf-8 -*-
"""Merge the authored originals from authored.json into the live script library.

Kept separate from author_scripts.py on purpose: authoring is the expensive,
failure-prone half, and the vault should only ever be touched by a step that
runs against a complete, validated file.

Appends only - never rewrites or reorders an existing script.

    python scripts/apply_authored.py --dry
    python scripts/apply_authored.py
"""
import argparse
import json
import re
import shutil
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "authored.json"
LIB = ROOT / "scripts_data.js"


def house_style(body, ch):
    """Match the conventions the other 274 already follow."""
    if ch == "call":
        # nothing else in the library wraps a spoken line in quotes
        body = re.sub(r'(YOU:\s*)"(.*?)"\s*$', r"\1\2", body, flags=re.M)
        body = re.sub(r"(YOU:\s*)'(.*?)'\s*$", r"\1\2", body, flags=re.M)
    for bad, good in (("’", "'"), ("‘", "'"), ("“", '"'),
                      ("”", '"'), ("–", "-"), ("…", "...")):
        body = body.replace(bad, good)
    return body.strip()


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def js_body(s):
    """The library stores bodies as BACKTICK template literals, and every Python
    tool in scripts/ (preflight, build_spanish, reground, clean_voice_libraries)
    parses them with a regex that requires backticks. A JSON double-quoted body
    is valid JavaScript and loads fine in the browser - but it is invisible to
    all of them, so the scripts would never be validated or translated."""
    if "`" in s or "${" in s:
        raise SystemExit("body contains a backtick or ${ - cannot store as a "
                         "template literal: " + s[:60])
    return "`" + s + "`"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry", action="store_true")
    args = ap.parse_args()

    authored = json.loads(SRC.read_text(encoding="utf-8"))
    if not authored:
        print("nothing authored yet")
        return
    src = LIB.read_text(encoding="utf-8")

    existing_titles = set(re.findall(r'title:\s*"([^"]+)"', src))
    rows, skipped = [], 0
    for v in authored.values():
        if v["title"] in existing_titles:
            skipped += 1
            continue
        body = house_style(v["body"], v["ch"])
        rows.append(' {t:%s,ch:%s,adv:%s,title:%s,body:%s},' % (
            js_str(v["t"]), js_str(v["ch"]), js_str(v["adv"]),
            js_str(v["title"]), js_body(body)))

    print("appending %d scripts (%d already present)" % (len(rows), skipped))
    if args.dry:
        print("\n".join(rows[:2]))
        return
    if not rows:
        return

    # NON-greedy, and anchored to the first "];" that closes SCRIPTS. A greedy
    # (.*) here runs to the LAST "];" in the file - which is the end of ADVISORS -
    # and silently appends scripts into the advisor roster.
    m = re.search(r"(const SCRIPTS = \[)(.*?)(\n\];)", src, re.S)
    if not m:
        raise SystemExit("could not find the SCRIPTS array - aborting, library untouched")
    tail = src[m.end():]
    if "const ADVISORS" not in tail:
        raise SystemExit("SCRIPTS array end looks wrong (ADVISORS not after it) - aborting")

    bak = ROOT / ("scripts_data.PRE-AUTHORED-%s.js" % time.strftime("%Y%m%d-%H%M"))
    shutil.copy2(LIB, bak)
    print("backup ->", bak.name)

    new = m.group(1) + m.group(2) + "\n" + "\n".join(rows) + m.group(3)
    LIB.write_text(src[:m.start()] + new + src[m.end():], encoding="utf-8")
    print("library updated")


if __name__ == "__main__":
    main()
