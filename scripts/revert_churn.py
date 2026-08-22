# -*- coding: utf-8 -*-
"""Keep the regrounding wins; undo the churn.

The re-grounding pass rewrote 235 of 274 scripts heavily. For advisors whose
scripts were already grounded and carried no filler, that rewriting bought
nothing measurable and in places made them worse (Chris Voss's "wants something
FROM you" became a flatter paraphrase). This restores the originals for those
advisors only, and normalises the typography the model drifted into.

    python scripts/revert_churn.py --dry-run
    python scripts/revert_churn.py
"""
import argparse
import importlib.util
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "scripts_data.js"

# advisors whose groundedness did not improve AND whose originals had no filler:
# nothing to gain, measurable churn, so their originals stand.
REVERT = ["Rene Rodriguez", "Brian Buffini", "Jerry Norton",
          "Laurel Starks", "Chris Voss", "Ryan Serhant"]

# the library was written with straight quotes throughout; the model introduced
# curly ones, leaving 55 scripts mixing both
TYPO = {"’": "'", "‘": "'", "“": '"', "”": '"'}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--backup", default="")
    args = ap.parse_args()

    spec = importlib.util.spec_from_file_location("bs", str(ROOT / "scripts" / "build_spanish.py"))
    bs = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(bs)

    baks = sorted(ROOT.glob("scripts_data.PRE-REGROUND-*.js"))
    bak = Path(args.backup) if args.backup else (baks[-1] if baks else None)
    if not bak or not bak.exists():
        sys.exit("no PRE-REGROUND backup found")

    old_src = bak.read_text(encoding="utf-8")
    originals = {}
    for t, ch, adv, title, body in bs.SCRIPT_RE.findall(old_src):
        originals[bs.skey(title, adv, ch, t)] = body

    src = LIB.read_text(encoding="utf-8")
    reverted = [0]
    typo_fixed = [0]

    def repl(m):
        t, ch, adv, title, body = m.groups()
        key = bs.skey(title, adv, ch, t)
        if adv in REVERT and key in originals:
            reverted[0] += 1
            body = originals[key]
        before = body
        for a, b in TYPO.items():
            body = body.replace(a, b)
        if body != before:
            typo_fixed[0] += 1
        return '{t:"%s",ch:"%s",adv:"%s",title:"%s",body:\n`%s`}' % (t, ch, adv, title, body)

    out = bs.SCRIPT_RE.sub(repl, src)
    n_after = len(bs.SCRIPT_RE.findall(out))

    print("scripts restored to original : %d  (%s)" % (reverted[0], ", ".join(REVERT)))
    print("scripts typography-normalised: %d" % typo_fixed[0])
    print("scripts in library           : %d" % n_after)
    left = out.count("’") + out.count("“")
    print("curly quotes remaining       : %d" % left)
    if n_after != 274:
        sys.exit("ABORT - script count changed")
    if args.dry_run:
        print("dry run - nothing written")
        return

    shutil.copy(LIB, ROOT / ("scripts_data.PRE-REVERT-%s.js" % time.strftime("%Y%m%d-%H%M")))
    tmp = ROOT / "scripts_data.__check__.js"
    tmp.write_text(out, encoding="utf-8", newline="\n")
    chk = subprocess.run(["node", "--check", str(tmp)], capture_output=True, text=True)
    if chk.returncode != 0:
        print(chk.stderr[:500])
        tmp.unlink(missing_ok=True)
        sys.exit("ABORT - not valid JavaScript; nothing changed")
    tmp.replace(LIB)
    print("written: scripts_data.js")


if __name__ == "__main__":
    main()
