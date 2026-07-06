# -*- coding: utf-8 -*-
"""Pre-build every script in every advisor voice -> voices/<advisor_id>.json

The Script Vault serves these statically, so picking a voice swaps the whole
library INSTANTLY with zero live AI calls. Live calls remain only for
market-tailoring and custom topics.

Resumable: already-built variants are skipped, so run it as many nights as it
takes (free-tier rate limits allow roughly 10-15 rewrites/minute; the full
274 scripts x 34 voices ~ 9,300 variants takes several long runs).

Usage:
  python scripts/build_voice_variants.py                 # all voices, roster order
  python scripts/build_voice_variants.py serhant voss    # just these voices
  python scripts/build_voice_variants.py --status        # coverage report
"""
import json, os, sys, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
API = "https://ask-ryan-nb3w.onrender.com/api/localize-script"
VOICES_DIR = os.path.join(REPO, "voices")
os.makedirs(VOICES_DIR, exist_ok=True)

DUMP = json.load(open(os.path.join(HERE, "scripts_dump.json"), encoding="utf-8"))
ADVISORS = DUMP["advisors"]
SCRIPTS = DUMP["scripts"]
CH_API = {"vm": "voicemail"}


def load(vid):
    p = os.path.join(VOICES_DIR, vid + ".json")
    if os.path.exists(p):
        return json.load(open(p, encoding="utf-8"))
    return {}


def save(vid, data):
    p = os.path.join(VOICES_DIR, vid + ".json")
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))


def status():
    total = len(SCRIPTS)
    done_all = 0
    for a in ADVISORS:
        n = len(load(a["id"]))
        done_all += n
        print(f"{a['id']:<12} {a['n']:<22} {n}/{total}")
    print(f"\nTOTAL {done_all}/{total*len(ADVISORS)} "
          f"({100*done_all/(total*len(ADVISORS)):.1f}%)")


def rewrite(script, voice, attempt=0):
    body = json.dumps({
        "script": script["body"], "channel": CH_API.get(script["ch"], script["ch"]),
        "advisor": script["adv"], "topic": script["topic"],
        "voice": {"id": voice["id"], "name": voice["n"]},
    }).encode()
    req = urllib.request.Request(API, data=body, method="POST",
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            d = json.loads(r.read().decode())
        if d.get("status") == "success":
            return {"script": d["script"], "why": d.get("why", "")}
        raise RuntimeError(d.get("error", "error"))
    except Exception as e:
        if attempt >= 4:
            print(f"    SKIP after retries: {script['title'][:40]} ({e})")
            return None
        wait = [20, 45, 90, 180][attempt]
        print(f"    busy ({e}) - cooling {wait}s")
        time.sleep(wait)
        return rewrite(script, voice, attempt + 1)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if "--status" in sys.argv:
        status()
        return
    voices = [a for a in ADVISORS if not args or a["id"] in args]
    t0 = time.time()
    made = 0
    for v in voices:
        data = load(v["id"])
        todo = [s for s in SCRIPTS if s["key"] not in data
                and s["adv"] != v["n"]]           # skip scripts already BY this advisor
        # scripts by the advisor themselves: point at the original (identity variant)
        for s in SCRIPTS:
            if s["adv"] == v["n"] and s["key"] not in data:
                data[s["key"]] = {"script": s["body"], "why": ""}
        if not todo:
            save(v["id"], data)
            print(f"{v['n']}: complete ({len(data)}/{len(SCRIPTS)})")
            continue
        print(f"\n=== {v['n']}: {len(todo)} variants to build ===")
        for n, s in enumerate(todo, 1):
            out = rewrite(s, v)
            if out:
                data[s["key"]] = out
                made += 1
                if made % 5 == 0:
                    save(v["id"], data)
            el = time.time() - t0
            print(f"  [{v['id']} {n}/{len(todo)}] {s['ch']:<5} {s['title'][:44]:<46} "
                  f"total={made} elapsed={el/60:.0f}m")
            time.sleep(3.5)                        # ~15/min, stay under free-tier TPM
        save(v["id"], data)
        print(f"{v['n']} DONE: {len(data)}/{len(SCRIPTS)} saved")
    print(f"\nfinished: {made} new variants in {(time.time()-t0)/60:.0f} minutes")


if __name__ == "__main__":
    main()
