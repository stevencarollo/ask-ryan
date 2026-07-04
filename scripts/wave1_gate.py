"""Wave 1 quality gate: answers must cite frameworks that exist in the researched kb files."""
import asyncio
import os
import sys

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, ".")
from dotenv import load_dotenv
load_dotenv()
from backend.demo_server import generate_response_with_groq

TESTS = [
    {
        "q": "I got a probate listing lead in LA. The personal representative says she has limited authority. Walk me through what the sale process looks like and what I should tell her.",
        "experts": ["gross", "nicoletti"],
        "must_hit_any": ["overbid", "10%", "confirmation", "referee", "IAEA", "Notice of Proposed Action"],
    },
    {
        "q": "Homeowner in Gardena got an NOD 70 days ago and owes more than the house is worth. What exactly goes in the short sale package and how do I keep the bank from foreclosing while we wait?",
        "experts": ["espinosa"],
        "must_hit_any": ["hardship letter", "bank statements", "pay stubs", "postpone", "sale date", "package"],
    },
    {
        "q": "I want probate listings but I refuse to be a vulture. What's the outreach plan and what do I actually say to the executor?",
        "experts": ["corbett", "gross"],
        "must_hit_any": ["value", "68", "attorney", "service", "touches", "reputation"],
    },
    {
        "q": "Divorcing couple, husband refuses to sign the listing agreement, wife has a court order to sell. What are my options?",
        "experts": ["starks"],
        "must_hit_any": ["elisor", "court", "neutral", "document", "order"],
    },
    {
        "q": "I found a tax-delinquent property list for LA County. Owners are 4 years behind. What's the play before these hit auction?",
        "experts": ["ted", "espinosa"],
        "must_hit_any": ["before auction", "motivated", "redemption", "excess proceeds", "deed state", "outreach", "delinquent"],
    },
]

async def main():
    passed = 0
    for i, t in enumerate(TESTS, 1):
        resp = await generate_response_with_groq(t["q"], "practical", expert_ids=t["experts"]) or ""
        low = resp.lower()
        hits = [m for m in t["must_hit_any"] if m.lower() in low]
        ok = len(hits) >= 2
        passed += ok
        print(f"TEST {i}: {'PASS' if ok else 'FAIL'} | hits: {hits[:4]} | panel: {t['experts']}")
        if not ok:
            print("  --- response head:", resp[:250].replace(chr(10), " "))
    print(f"\nGATE: {passed}/{len(TESTS)} passed")

asyncio.run(main())
