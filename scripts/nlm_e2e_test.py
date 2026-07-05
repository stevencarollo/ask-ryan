"""End-to-end test: Roundtable episode -> REAL NotebookLM Audio Overview MP3."""
import asyncio
import os
import sys
import time

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, ".")
from dotenv import load_dotenv
load_dotenv(".env")

from backend.demo_server import podcast_script  # noqa: E402
from backend import nlm_bridge  # noqa: E402

print("ready:", nlm_bridge.nlm_ready())

ep = asyncio.run(podcast_script({
    "topic": "Winning probate listings in LA County (court process, overbids, attorney referrals)",
    "minutes": 4, "language": "en"}))["episode"]
print("script:", ep["title"], "-", len(ep["turns"]), "turns")

job = nlm_bridge.start_audio_job(ep["title"], ep["source_doc"], "en")
print("job:", job)

t0 = time.time()
while time.time() - t0 < 540:
    s = nlm_bridge.job_status(job)
    print(f"[{int(time.time()-t0)}s] {s['status']}: {s['step']}")
    if s["status"] in ("done", "error"):
        break
    time.sleep(20)

s = nlm_bridge.job_status(job)
if s["status"] == "done":
    f = nlm_bridge.job_file(job)
    print(f"SUCCESS: MP3 at {f} ({os.path.getsize(f)/1e6:.1f} MB)")
else:
    print("RESULT:", s)
