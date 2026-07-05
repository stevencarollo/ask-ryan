"""Regenerate roundtable-skill.zip from the current EXPERTS knowledge base."""
import os
import shutil
import sys

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, ".")
from backend.experts_kb import EXPERTS

GROUPS = [
    ("Sales & Prospecting", ["serhant", "harris", "mulrenin", "carruthers"]),
    ("Coaching & Business", ["ferry", "buffini", "keller", "sharran"]),
    ("Marketing & Media", ["glennda", "lazine", "burgess", "pantana", "peitz"]),
    ("Negotiation", ["voss"]),
    ("Design & Staging", ["gaines", "mcgee", "eisen"]),
    ("Commercial", ["knakal", "cauble", "mcelroy"]),
    ("Flipping & Investing", ["tarek", "norton", "morby", "greene"]),
    ("Probate, Divorce & Distressed", ["corbett", "nicoletti", "gross", "starks", "espinosa", "ted"]),
    ("Espanol & Bilingual", ["loida", "figueroa", "creyes", "rene"]),
]

lines = ["# The Roundtable - Advisor Knowledge Dossiers", ""]
for group, ids in GROUPS:
    lines.append(f"## {group}")
    lines.append("")
    for i in ids:
        e = EXPERTS[i]
        lines.append(f"### {e['name']} - {e['focus']}")
        lines.append(f"**Voice:** {e['style']}")
        lines.append(f"**Knowledge & frameworks:** {e['deep']}")
        lines.append("")
open("roundtable-skill/roundtable-coach/references/experts.md", "w", encoding="utf-8").write("\n".join(lines))


# Podcast concepts catalog
from backend.podcast_concepts import PODCAST_ADVISORS
pc = ["# The Roundtable - Advisor Podcast Concepts", "",
      "Per-advisor episode concepts (grounded in the research files), host first names,",
      "and voice genders for two-host persona scripts.", ""]
for aid, m in PODCAST_ADVISORS.items():
    e = EXPERTS.get(aid, {})
    pc.append(f"## {e.get('name', m['first'])} (host name: {m['first'].upper()}, voice: {'male' if m['gender']=='m' else 'female'})")
    for c in m["concepts"]:
        pc.append(f"- {c}")
    pc.append("")
open("roundtable-skill/roundtable-coach/references/podcast_concepts.md", "w", encoding="utf-8").write("\n".join(pc))

# Bundle the full researched kb library too (if present)
kb_dir = "backend/kb"
out_dir = "roundtable-skill/roundtable-coach/references/research"
if os.path.isdir(kb_dir):
    os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(kb_dir):
        if f.endswith(".md"):
            shutil.copy(os.path.join(kb_dir, f), os.path.join(out_dir, f))

if os.path.exists("roundtable-skill.zip"):
    os.remove("roundtable-skill.zip")
shutil.make_archive("roundtable-skill", "zip", "roundtable-skill")
print(f"zip rebuilt: {os.path.getsize('roundtable-skill.zip')/1024:.1f} KB, "
      f"{len([f for f in os.listdir(out_dir)]) if os.path.isdir(out_dir) else 0} research files bundled")
