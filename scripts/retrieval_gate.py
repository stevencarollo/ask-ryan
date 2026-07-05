"""Retrieval layer gate: large panels must still pull deep researched material."""
import asyncio
import os
import sys

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, ".")
from dotenv import load_dotenv
load_dotenv(".env")
from backend.kb_retrieval import retrieve_kb_sections
from backend.demo_server import generate_response_with_groq

# 1) Unit checks: retrieval returns the right files
checks = [
    ("The PR only has limited authority in probate court, how does the overbid work?", "gross"),
    ("Owner got a notice of default, is a short sale possible?", "espinosa"),
    ("Dame un script en espanol para tocar puertas", "espanol_scripts"),
    ("What do I look at before bidding at a tax deed auction?", "ted"),
]
for q, want in checks:
    r = retrieve_kb_sections(q)
    print(f"retrieve '{q[:40]}...' -> {'OK' if want in r else 'MISS ' + want} ({len(r)} chars)")

# 2) Full-panel test: ALL 34 advisors selected (no deep dossiers) + topical query
async def main():
    r = await generate_response_with_groq(
        "My probate seller's personal representative has LIMITED authority in LA County. "
        "Explain the court confirmation and overbid process with the actual formula.",
        "practical", expert_ids=None) or ""  # None = all 34 -> style lines only, retrieval must carry depth
    low = r.lower()
    hits = [m for m in ["10%", "5%", "overbid", "referee", "cashier"] if m in low]
    print(f"FULL-PANEL PROBATE TEST: {'PASS' if len(hits) >= 3 else 'FAIL'} | hits: {hits}")
    print(r[:300])

asyncio.run(main())
