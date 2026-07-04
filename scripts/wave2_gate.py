"""Wave 2 quality gate: Espanol group answers must cite researched material."""
import asyncio
import os
import sys

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, ".")
from dotenv import load_dotenv
load_dotenv(".env")
from backend.demo_server import generate_response_with_groq

TESTS = [
    ("Give me an expired listing phone script and tell me how many conversations I need daily.",
     ["loida"], ["interviewing agents", "30", "showings", "what happened"]),
    ("Soy agente nuevo en Gardena con muchos clientes latinos. Como convierto mi herencia hispana en ventaja de negocio?",
     ["figueroa", "creyes", "loida"], ["itin", "ventaja", "patrimonio", "confianza", "espanol", "comunidad", "bilingu", "financiamiento"]),
    ("How should I open my listing presentation so we don't start arguing about price?",
     ["rene"], ["frame", "story", "cma", "tie-down", "sequence"]),
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
            print("  head:", r[:220].replace(chr(10), " "))
    print(f"GATE: {passed}/{len(TESTS)}")

asyncio.run(main())
