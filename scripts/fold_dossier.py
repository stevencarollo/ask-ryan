"""Fold a researched dossier back into backend/experts_kb.py.

Usage: python scripts/fold_dossier.py <advisor_id>
Reads scripts/_fold.txt: line 1 = new style, remaining lines = new deep text.
"""
import re
import sys
import os

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
aid = sys.argv[1]

with open("scripts/_fold.txt", encoding="utf-8") as f:
    lines = f.read().strip().split("\n")
new_style = lines[0].strip()
new_deep = " ".join(l.strip() for l in lines[1:] if l.strip())

s = open("backend/experts_kb.py", encoding="utf-8").read()
i = s.index('"%s": {' % aid)
j = s.index("},", i)
block = s[i:j]
block = re.sub(r'"style": ".*?"', '"style": "' + new_style + '"', block, count=1, flags=re.S)
block = re.sub(r'"deep": """.*?"""', '"deep": """' + new_deep + '"""', block, count=1, flags=re.S)
s = s[:i] + block + s[j:]
open("backend/experts_kb.py", "w", encoding="utf-8").write(s)

sys.path.insert(0, ".")
from backend.experts_kb import EXPERTS  # noqa: E402
d = EXPERTS[aid]["deep"]
print(f"folded {aid}: {len(d.split())} words | style: {EXPERTS[aid]['style'][:60]}")
