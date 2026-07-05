"""Final cross-wave regression: researched depth must surface across specialties + Spanish."""
import asyncio
import os
import sys

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, ".")
from dotenv import load_dotenv
load_dotenv(".env")
from backend.demo_server import generate_response_with_groq

TESTS = [
    ("What's my max offer on a flip: ARV $400K, repairs $60K?", ["norton", "tarek"],
     ["65", "260", "buy price", "arv"]),
    ("Buyer lowballed us 12% under asking. Give me the exact response sequence.", ["voss"],
     ["mirror", "label", "calibrated", "how am i supposed"]),
    ("My small condo listing looks cheap in photos. Fix it.", ["mcgee", "eisen"],
     ["scale", "rug", "texture", "vintage", "layer"]),
    ("Como le explico a una familia latina que no necesita 20% de enganche?", ["figueroa", "loida"],
     ["itin", "enganche", "dpa", "asistencia", "3", "programa"]),
    ("How do I rank my Google Business Profile in Gardena?", ["pantana"],
     ["review", "categor", "nap", "keyword"]),
]


async def main():
    passed = 0
    for i, (q, experts, must) in enumerate(TESTS, 1):
        r = await generate_response_with_groq(q, "practical", expert_ids=experts) or ""
        low = r.lower()
        hits = [m for m in must if m.lower() in low]
        ok = len(hits) >= 2
        passed += ok
        print(f"TEST {i}: {'PASS' if ok else 'FAIL'} | hits: {hits[:4]}")
        if not ok:
            print("  head:", r[:200].replace(chr(10), " "))
    print(f"FINAL GATE: {passed}/{len(TESTS)}")

asyncio.run(main())
