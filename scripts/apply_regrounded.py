# -*- coding: utf-8 -*-
"""Assemble the re-grounded scripts into the live library.

Kept deliberately separate from the generator so a partial or bad batch can
never touch scripts_data.js. Backs up, swaps bodies in place (every other field
untouched), escapes anything that would break a JS template literal, then
verifies the result parses and still holds the same number of scripts.

    python scripts/apply_regrounded.py --dry-run
    python scripts/apply_regrounded.py
"""
import argparse
import importlib.util
import json
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "scripts_data.js"
STAGED = ROOT / "scripts" / "regrounded.json"


def js_safe(s):
    """template-literal safe: backticks and ${ would end/inject the literal"""
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    spec = importlib.util.spec_from_file_location("bs", str(ROOT / "scripts" / "build_spanish.py"))
    bs = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(bs)

    staged = json.loads(STAGED.read_text(encoding="utf-8"))
    src = LIB.read_text(encoding="utf-8")
    before = len(bs.SCRIPT_RE.findall(src))

    swapped = [0]

    # These advisors were deliberately reverted to their originals: the rewrite
    # churned already-good scripts for no measurable gain (see revert_churn.py).
    # Re-applying the staged set used to silently undo that decision - it wiped
    # all 69 the second time this script ran. Never touch them again.
    KEEP_ORIGINAL = {"Rene Rodriguez", "Brian Buffini", "Jerry Norton",
                     "Laurel Starks", "Chris Voss", "Ryan Serhant"}
    skipped = [0]

    def repl(m):
        t, ch, adv, title, body = m.groups()
        if adv in KEEP_ORIGINAL:
            skipped[0] += 1
            return m.group(0)
        key = bs.skey(title, adv, ch, t)
        new = staged.get(key)
        if not new:
            return m.group(0)
        swapped[0] += 1
        return '{t:"%s",ch:"%s",adv:"%s",title:"%s",body:\n`%s`}' % (
            t, ch, adv, title, js_safe(new["script"]))

    out = bs.SCRIPT_RE.sub(repl, src)
    after = len(bs.SCRIPT_RE.findall(out))

    print("scripts in library : %d" % before)
    print("staged rewrites    : %d" % len(staged))
    print("swapped in         : %d" % swapped[0])
    print("left as original   : %d  (deliberately reverted advisors)" % skipped[0])
    print("scripts after swap : %d" % after)
    if after != before:
        sys.exit("ABORT - script count changed (%d -> %d)" % (before, after))

    if args.dry_run:
        print("dry run - nothing written")
        return

    bak = ROOT / ("scripts_data.PRE-REGROUND-%s.js" % time.strftime("%Y%m%d-%H%M"))
    shutil.copy(LIB, bak)
    # must keep a .js extension - node --check refuses unknown extensions, and a
    # refusal there would look identical to "your JavaScript is broken"
    tmp = LIB.parent / "scripts_data.__check__.js"
    tmp.write_text(out, encoding="utf-8", newline="\n")

    chk = subprocess.run(["node", "--check", str(tmp)], capture_output=True, text=True)
    if chk.returncode != 0:
        print(chk.stderr[:600])
        tmp.unlink(missing_ok=True)
        sys.exit("ABORT - regenerated library is not valid JavaScript; nothing changed")

    tmp.replace(LIB)
    print("backup   : %s" % bak.name)
    print("written  : scripts_data.js (valid JS, %d scripts)" % after)


if __name__ == "__main__":
    main()
