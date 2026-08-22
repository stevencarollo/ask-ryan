# -*- coding: utf-8 -*-
"""Build the prewritten Spanish library: voices/_es.json

Two AI passes per script:
  1. WRITE  - compose a native Spanish script from the English script's JOB
              (its moves), never from its words. Few-shot against the 16
              natively-written Spanish scripts already in the library.
  2. EDIT   - a fresh pass as a native LA editor: rewrite anything that still
              sounds translated, WITHOUT Spanish-ifying the industry terms a
              bilingual homeowner actually recognizes in English.
Then deterministic validators; anything failing is regenerated (up to 3 tries).

Resumable: already-finished keys are skipped, so a daily rate-limit pause just
means running it again. Output matches the /voices/<id>.json shape the Script
Vault already loads (skey -> {script}), so Spanish is instant and costs no
live AI calls for members.

    python scripts/build_spanish.py            # run / resume
    python scripts/build_spanish.py --limit 5  # smoke test
"""
import json
import os
import re
import sys
import time
import argparse
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "voices" / "_es.json"
LOG = ROOT / "logs" / "build_spanish.log"

# ---- env: Supabase + Groq creds, same sources the server uses -------------
def load_env():
    fi = Path(r"C:\Users\Steve Carollo.MiniReem\Desktop\farm-intelligence\.env.local")
    if fi.exists():
        for line in fi.read_text(encoding="utf-8", errors="ignore").splitlines():
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())
        os.environ.setdefault("SUPABASE_URL", os.environ.get("NEXT_PUBLIC_SUPABASE_URL", ""))
    envf = ROOT / ".env"
    if envf.exists():
        for line in envf.read_text(encoding="utf-8", errors="ignore").splitlines():
            if line.startswith("GROQ_API_KEY="):
                os.environ["GROQ_API_KEY"] = line.split("=", 1)[1].strip()


def log(msg):
    LOG.parent.mkdir(parents=True, exist_ok=True)
    line = time.strftime("%H:%M:%S") + "  " + msg
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(line + "\n")
    try:
        print(line, flush=True)
    except UnicodeEncodeError:
        print(line.encode("ascii", "replace").decode(), flush=True)


# ---- the library ---------------------------------------------------------
SCRIPT_RE = re.compile(
    r'\{t:"(\w+)",ch:"(\w+)",adv:"([^"]+)",title:"([^"]+)",body:\s*`(.*?)`\}', re.S)


def skey(title, adv, ch, t):
    """mirrors skey() in scripts.html and scripts/dump_scripts.js"""
    h = 5381
    for c in f"{title}|{adv}|{ch}|{t}":
        h = ((h * 33) & 0xFFFFFFFF)
        if h >= 0x80000000:
            h -= 0x100000000
        h = (int(h) ^ ord(c)) & 0xFFFFFFFF
    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    n, s = h, ""
    while n:
        s = digits[n % 36] + s
        n //= 36
    return s or "0"


def load_scripts():
    src = (ROOT / "scripts_data.js").read_text(encoding="utf-8")
    out = []
    for t, ch, adv, title, body in SCRIPT_RE.findall(src):
        out.append({"t": t, "ch": ch, "adv": adv, "title": title, "body": body,
                    "key": skey(title, adv, ch, t)})
    return out


# ---- prompt pieces -------------------------------------------------------
KEEP_ENGLISH = ("listing, escrow, open house, short sale, loan modification, "
                "forbearance, reinstatement, closing costs, broker, deadline, "
                "cash offer, as-is, walkthrough, title, deed")

GLOSSARY = """SALES-IDIOM PHRASEBOOK (use the Spanish on the right, never a literal translation):
  Would you be opposed to...?      -> ¿Me permite...? / ¿Le molestaría si...?
  Does that make sense?            -> ¿Me explico?   (NEVER "¿Tiene sentido?")
  one more thing to manage         -> una carga más
  I'll be brief                    -> seré breve
  reach out / touch base           -> comunicarme con usted
  I'd love to                      -> con mucho gusto  (NEVER "me encantaria")
  Let me ask you this              -> Dígame una cosa
  no strings attached              -> sin ningún compromiso
  no pressure / no agenda          -> sin presión alguna / no vengo a presionarle
  What stopped it from selling?    -> ¿Por qué cree que no se vendió?
  Can I send it over?              -> ¿Se lo mando?
  worth a 15-minute conversation   -> vale la pena platicar 15 minutos
  I help families settling estates -> ayudo a familias que están resolviendo herencias
LOANWORD GENDERS (the forms LA agents actually say):
  el listing, el escrow, el open house, el short sale, el deadline, el loan,
  el broker, los closing costs, la oferta, la aplicación

INDUSTRY TERMS THAT STAY IN ENGLISH (a homeowner hears these in English from
their lender/agent - translating them makes the script HARDER to understand):
  """ + KEEP_ENGLISH


GEN = """You are a bilingual (Mexican-American) real estate agent in Los Angeles County who
writes prospecting scripts in Spanish for a living. You do NOT translate - you write.

{exemplars}

{glossary}

HOW TO WORK:
1. Read the English script below and identify its JOB: the opening move, the
   permission ask, the diagnostic question, the labels, the objection handled,
   the close.
2. Then WRITE A SPANISH SCRIPT THAT PERFORMS THOSE SAME MOVES, composed in
   Spanish from scratch. Do not follow English word order or sentence boundaries.

HARD RULES:
- USTED throughout. Never tu/tus/tienes/puedes/quieres.
- Every {{{{placeholder}}}} stays EXACTLY as written, in English.
- (Coaching notes in parentheses) and speaker labels like "YOU:" stay in ENGLISH.
- Email scripts keep the literal "Subject: " label; the subject text is Spanish.
- Avoid Castilian (no vosotros, no "coger"). LA Mexican-American register only.
- Keep roughly the same length as the source.
- Spanish orthography must be correct: every accent and ñ, and opening ¿ / ¡.

TOPIC: {topic}   ADVISOR VOICE: {adv}   FORMAT: {ch}

ENGLISH SCRIPT (source of the JOB, not of the words):
{body}

Respond with ONLY JSON: {{"script": "the Spanish script"}}"""


EDIT = """You are a native Spanish speaker from Los Angeles who edits real estate scripts.
Your ONLY job: find anything that sounds TRANSLATED rather than natively written,
and rewrite just those parts so a homeowner never hears a foreign-sounding phrase.

{glossary}

Look for: literal English idiom, stiff or bookish phrasing, wrong gender on
English loanwords, accidental tu forms, awkward clause order, and MISSING
ACCENTS or missing opening ¿ / ¡ (fix every one).

DO NOT CHANGE:
- {{{{placeholders}}}}, English coaching notes in parentheses, "YOU:" labels,
  the "Subject: " label.
- The industry terms listed above that belong in English. Do NOT "improve" them
  into academic Spanish - leaving forbearance, short sale, escrow, reinstatement
  and loan modification in English is CORRECT and intentional.
- The script's structure or length.
If a passage is already natural, leave it exactly as it is.

SCRIPT TO EDIT:
{script}

Respond with ONLY JSON: {{"script": "the edited script", "fixes": ["short note", ...]}}"""


BANNED = re.compile(r"¿Tiene sentido\?|estar[ií]a (usted )?en contra|me encantar[ií]a|"
                    r"tolerancia del pr[eé]stamo|reinstauraci[oó]n", re.I)
TU_FORM = re.compile(r"\b(t[uú]s?|tienes|puedes|quieres|tuyos?|contigo|tienes)\b", re.I)


def validate(src_body, out, ch):
    errs = []
    if not out or len(out) < 40:
        return ["empty"]
    # placeholder IDENTITY must hold (repetition may legitimately differ)
    if set(re.findall(r"\{\{[^}]+\}\}", src_body)) != set(re.findall(r"\{\{[^}]+\}\}", out)):
        errs.append("placeholders")
    if TU_FORM.search(out):
        errs.append("tu-form")
    if ch == "email" and not out.lstrip().startswith("Subject:"):
        errs.append("no-subject")
    if BANNED.search(out):
        errs.append("banned-phrase")
    ratio = len(out) / max(len(src_body), 1)
    if not (0.55 < ratio < 1.8):
        errs.append("length %.2f" % ratio)
    return errs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    load_env()
    sys.path.insert(0, str(ROOT / "backend"))     # demo_server imports its siblings
    spec = importlib.util.spec_from_file_location("ds", str(ROOT / "backend" / "demo_server.py"))
    ds = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ds)

    all_scripts = load_scripts()
    natives = [s for s in all_scripts if s["t"] == "espanol"]
    todo_all = [s for s in all_scripts if s["t"] != "espanol"]

    done = {}
    if OUT.exists():
        done = json.loads(OUT.read_text(encoding="utf-8"))
    todo = [s for s in todo_all if s["key"] not in done]
    if args.limit:
        todo = todo[:args.limit]

    log("=" * 62)
    log("Spanish library build - %d done, %d to go (of %d; %d already native)"
        % (len(done), len(todo), len(todo_all), len(natives)))

    def exemplars_for(ch):
        ex = [e for e in natives if e["ch"] == ch][:2] or natives[:2]
        return "\n\n".join(
            "GOLD-STANDARD %s SCRIPT (%s) - match this register and rhythm:\n%s"
            % (e["ch"].upper(), e["adv"], e["body"][:700]) for e in ex)

    ok = fail = 0
    for i, s in enumerate(todo, 1):
        attempt, final, errs = 0, None, ["unstarted"]
        while attempt < 3 and errs:
            attempt += 1
            try:
                g, lane1 = ds.ai_chat_json(
                    GEN.format(exemplars=exemplars_for(s["ch"]), glossary=GLOSSARY,
                               topic=s["t"], adv=s["adv"], ch=s["ch"], body=s["body"]),
                    max_tokens=2400, temperature=0.55)
                draft = (g or {}).get("script", "")
                if not draft:
                    errs = ["gen-empty"]
                    continue
                e, lane2 = ds.ai_chat_json(
                    EDIT.format(glossary=GLOSSARY, script=draft),
                    max_tokens=2400, temperature=0.4)
                cand = (e or {}).get("script") or draft
                errs = validate(s["body"], cand, s["ch"])
                if not errs:
                    final = cand
                elif "placeholders" not in errs and attempt >= 2:
                    # accept the cleaner draft rather than burn another round
                    d_errs = validate(s["body"], draft, s["ch"])
                    if not d_errs:
                        final, errs = draft, []
            except RuntimeError as exc:      # every lane rate-limited
                log("   lanes exhausted (%s) - pausing 90s" % str(exc)[:60])
                time.sleep(90)
                attempt -= 1
            except Exception as exc:         # noqa: BLE001
                log("   error: %s" % str(exc)[:90])
                time.sleep(3)

        if final:
            done[s["key"]] = {"script": final}
            ok += 1
            OUT.write_text(json.dumps(done, ensure_ascii=False), encoding="utf-8")
        else:
            fail += 1
            log("   FAILED %s/%s %s :: %s" % (s["t"], s["ch"], s["title"][:34], errs))

        if i % 10 == 0 or i == len(todo):
            log("   %d/%d  ok=%d fail=%d  (%s)" % (i, len(todo), ok, fail, s["t"]))
        time.sleep(0.4)

    log("DONE - %d written, %d failed. Library now holds %d Spanish scripts."
        % (ok, fail, len(done)))


if __name__ == "__main__":
    main()
