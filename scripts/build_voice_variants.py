# -*- coding: utf-8 -*-
"""Pre-build every script in every advisor voice -> voices/<advisor_id>.json

The Script Vault serves these statically, so picking a voice swaps the whole
library INSTANTLY with zero live AI calls. Live calls remain only for
market-tailoring and custom topics.

Calls the Gemini API directly (key in gitignored GEMINI_KEY.txt) so the batch
never competes with the live site's Groq budget. Resumable: already-built
variants are skipped, so it's safe to stop/restart any time.

Usage:
  python scripts/build_voice_variants.py                 # all voices, roster order
  python scripts/build_voice_variants.py serhant voss    # just these voices
  python scripts/build_voice_variants.py --status        # coverage report
"""
import json, os, re, sys, time, urllib.request, urllib.error

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from reword_why import reword

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
VOICES_DIR = os.path.join(REPO, "voices")
os.makedirs(VOICES_DIR, exist_ok=True)

GEMINI_KEY = open(os.path.join(REPO, "GEMINI_KEY.txt"), encoding="utf-8").read().strip()
GEMINI_URL = ("https://generativelanguage.googleapis.com/v1beta/models/"
              "gemini-2.5-flash:generateContent?key=" + GEMINI_KEY)

DUMP = json.load(open(os.path.join(HERE, "scripts_dump.json"), encoding="utf-8"))
ADVISORS = DUMP["advisors"]
SCRIPTS = DUMP["scripts"]
DOSSIER = json.load(open(os.path.join(HERE, "experts_dossier.json"), encoding="utf-8"))

CHAN_RULE = {
    "call": "Keep it a natural spoken phone script with the same beats and any {{placeholders}} intact.",
    "vm": "Keep it under 40 seconds spoken (about 90 words), one clear reason to call back.",
    "text": "Keep it 1-3 short sentences, casual-professional, no links, ends with an easy question.",
    "email": ("Return the email as ONE PLAIN STRING starting with the literal line "
              "'Subject: ...' (under 9 words) followed by a blank line then the body "
              "(under 130 words) - NOT a nested object with separate subject/body fields."),
}


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


def build_prompt(script, voice):
    e = DOSSIER.get(voice["id"], {})
    ground = ""
    if e:
        ground = f"\nTheir voice: {e.get('style','')}\nTheir frameworks and vocabulary: {e.get('deep','')}"
    chan_rule = CHAN_RULE.get(script["ch"], "Keep the same format and length.")
    return f"""You are The Roundtable's script coach. Rewrite this {script['ch']} script.

THE VOICE: rewrite it entirely in the voice of {voice['n']}.{ground}
Speak the way they speak - their pacing, their signature phrases, their philosophy - while keeping the script's job identical.

Rules:
- Keep the original structure and intent, but the VOICE becomes {voice['n']}'s. Topic: {script['topic']}.
- Keep every {{{{placeholder}}}} exactly as written.
- {chan_rule}

ORIGINAL SCRIPT:
{script['body']}

Respond with ONLY a JSON object: {{"script": "the rewritten script", "why": "one short sentence naming the specific frameworks, signature phrases, or philosophy this version leans on - e.g. 'Leans on his 3 F's framework and the phrase big money energy.' NEVER start with 'I rewrote/changed/transformed' or describe the act of editing - name what's IN the script, not what you did to it."}}"""


def extract_json(text):
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(json)?\s*|\s*```$", "", text)
    return json.loads(text)


def flatten_script(val):
    """Defensive: if the model nests {subject, body} instead of one string, flatten it."""
    if isinstance(val, str):
        return val
    if isinstance(val, dict):
        subj = val.get("subject") or val.get("Subject") or ""
        body = val.get("body") or val.get("Body") or ""
        if subj and not str(subj).lower().startswith("subject:"):
            subj = "Subject: " + str(subj)
        return (str(subj) + "\n\n" + str(body)).strip() if subj else str(body).strip()
    return str(val)


def rewrite(script, voice, attempt=0):
    body = json.dumps({
        "contents": [{"parts": [{"text": build_prompt(script, voice)}]}],
        "generationConfig": {"temperature": 0.75, "responseMimeType": "application/json"},
    }).encode()
    req = urllib.request.Request(GEMINI_URL, data=body, method="POST",
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            d = json.loads(r.read().decode())
        text = d["candidates"][0]["content"]["parts"][0]["text"]
        out = extract_json(text)
        flat = flatten_script(out.get("script"))
        if not flat or len(flat) < 10:
            raise RuntimeError("empty script field")
        return {"script": flat, "why": reword(out.get("why", ""))}
    except urllib.error.HTTPError as e:
        body_err = e.read().decode(errors="replace")[:200]
        if attempt >= 4:
            print(f"    SKIP after retries: {script['title'][:40]} ({e.code} {body_err})")
            return None
        wait = [8, 20, 45, 90][attempt]
        print(f"    HTTP {e.code} ({body_err[:80]}) - cooling {wait}s")
        time.sleep(wait)
        return rewrite(script, voice, attempt + 1)
    except Exception as e:
        if attempt >= 4:
            print(f"    SKIP after retries: {script['title'][:40]} ({e})")
            return None
        wait = [5, 12, 25, 50][attempt]
        print(f"    error ({e}) - cooling {wait}s")
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
        for s in SCRIPTS:                          # identity variant for their own scripts
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
                if made % 10 == 0:
                    save(v["id"], data)
            el = time.time() - t0
            print(f"  [{v['id']} {n}/{len(todo)}] {s['ch']:<5} {s['title'][:44]:<46} "
                  f"total={made} elapsed={el/60:.0f}m")
            time.sleep(1.2)                        # Gemini free tier: well under per-min caps
        save(v["id"], data)
        print(f"{v['n']} DONE: {len(data)}/{len(SCRIPTS)} saved")
    print(f"\nfinished: {made} new variants in {(time.time()-t0)/60:.0f} minutes")


if __name__ == "__main__":
    main()
