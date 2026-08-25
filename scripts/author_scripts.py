# -*- coding: utf-8 -*-
"""Have an advisor AUTHOR original scripts for their own topic, from their research.

This is NOT build_voice_variants.py. That one takes a script somebody else wrote
and re-voices it. This one gives an advisor a blank page, their FULL researched
dossier, and a job to do - so the material that comes back is their own thinking,
not a paraphrase of an expired-listing script with their name on it.

Same safety pattern as reground_library.py: results land in a keyed JSON and the
live library is only touched when you run apply_authored.py, so a bad or partial
run can never corrupt the vault. Resumable - anything already authored is skipped.

    python scripts/author_scripts.py --plan            # show what would be written
    python scripts/author_scripts.py                   # run / resume
    python scripts/author_scripts.py --adv buckelew
"""
import argparse
import importlib.util
import json
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "scripts" / "authored.json"
LOG = ROOT / "logs" / "author.log"

# Who writes what. Each advisor gets the briefs that belong to THEIR expertise -
# nobody is asked to write outside what the research actually supports.
PLAN = {
    "buckelew": {
        "t": "senior",
        "briefs": [
            ("call", "The Needs Assessment Call",
             "First contact with a 50+ owner who may or may not should move. Run the "
             "Educator role: find out what they actually want before any talk of listing. "
             "Staying put must be an openly offered outcome."),
            ("call", "When Staying Put Is the Right Answer",
             "The honest call where the agent tells a senior that aging in place is the "
             "better option, and stays in the relationship anyway."),
            ("call", "The Family Meeting — Whose Agent Am I",
             "Adult children want the sale; the parent does not. Advocate role: protect "
             "the client's authority to decide without making an enemy of the family."),
            ("call", "Someone Is Pushing Them",
             "A senior is being leaned on by a buyer, a contractor or a relative. Spot "
             "coercion, slow everything down, restore their footing."),
            ("vm", "Last-Time Seller Voicemail",
             "Under 40 seconds. No urgency, no market timing. One reason to call back."),
            ("vm", "After the Seminar Voicemail",
             "Follow up with someone who attended an educational session. Educator first."),
            ("text", "No-Pressure Check-In Text",
             "1-3 sentences to a 50+ owner who is thinking about it. Explicitly no clock."),
            ("text", "The Question They Can Answer Text",
             "Opens a decision without asking for a listing."),
            ("email", "What Your Options Actually Are",
             "Educator email laying out every path including not selling. Subject under "
             "9 words."),
            ("email", "For the Family, Not Just the Owner",
             "Email an adult child can read that keeps the parent in charge."),
        ],
    },
    "nemovitz": {
        "t": "senior",
        "briefs": [
            ("call", "Is It Time — The Question Call",
             "Owner is circling the decision. Use his line where it lands: there is no "
             "perfect time, but if you're asking the question, the time is near."),
            ("call", "The Move-In Date Call",
             "They have a senior community date. Work backwards - list 2-3 months ahead, "
             "buyers flex on occupancy."),
            ("call", "Sell It As-Is",
             "Owner has neither money nor stamina to renovate. As-is sells at fair market "
             "value when priced correctly; pricing does the work renovation is asked to do."),
            ("call", "Four Kids, Four Opinions",
             "Sibling disagreement over the family home. Put neutral pricing data on the "
             "table and let the number do the arguing."),
            ("vm", "The 38-Year Home Voicemail",
             "Under 40 seconds to an owner of a very long-held home. Warm, unhurried."),
            ("vm", "As-Is Voicemail",
             "One reason to call back: they do not have to fix anything first."),
            ("text", "The Eyes-Closed Text",
             "Short text offering his decluttering test - walk in, close your eyes, open "
             "them - as a gift, not a critique."),
            ("text", "Nothing To Fix Text",
             "1-3 sentences removing the repair objection."),
            ("email", "The Paperwork Nobody Warns You About",
             "Titles, trust documents, powers of attorney, death certificates - the thing "
             "that actually delays a last-home closing."),
            ("email", "Your Home's Strengths Inventory",
             "Every renovation and mechanical age documented so an older home has answers "
             "ready for buyer questions."),
        ],
    },
    "spade": {
        "t": "adultchild",
        "briefs": [
            ("call", "Before It's a Crisis",
             "Call to an adult child whose parents are fine right now. A family that plans "
             "has options on price, timing and taxes; one that waits for the fall has none."),
            ("call", "Mom Fell — Three Weeks",
             "Crisis mode has already arrived. What happens in what order, calmly."),
            ("call", "Dad Won't Discuss It",
             "The adult child cannot start the conversation. Give them the opening line "
             "and take the villain role off them."),
            ("call", "Sell Now or Wait for the Step-Up",
             "Siblings split on timing. Sequence the money conversation before the listing "
             "conversation."),
            ("vm", "Gen X Voicemail",
             "Under 40 seconds to a working adult child with no time. Peer to peer."),
            ("vm", "The Checklist Voicemail",
             "Offer the 30-day market-ready checklist as the whole reason to call back."),
            ("text", "You're Not Being Morbid Text",
             "1-3 sentences giving permission to plan early."),
            ("text", "Ten Minutes Text",
             "Respects that they are exhausted and working. One easy question."),
            ("email", "The 30-Day Market-Ready Checklist",
             "Turns an overwhelming family home into a finite list with dates."),
            ("email", "What to Sort Out Before You List Your Parents' House",
             "Capital gains, the step-up, reverse mortgage payoff, POA - what changes the "
             "answer to 'should we sell'."),
        ],
    },
    # Buckelew rounds the adult-child topic out to the library's 4-per-format
    # standard. Legitimate for her: the Advocate role in her own material is
    # explicitly about collaborating WITH adult children while keeping the
    # parent's authority intact.
    "buckelew_ac": {
        "t": "adultchild",
        "adv_id": "buckelew",
        "briefs": [
            ("vm", "For the Son or Daughter Voicemail",
             "Under 40 seconds to an adult child. You are a resource for the whole "
             "family, and the parent still decides."),
            ("vm", "Nobody Has to Decide Today Voicemail",
             "Under 40 seconds. Takes the pressure off an adult child who feels they "
             "must force a decision."),
            ("text", "Your Parent Still Decides Text",
             "1-3 sentences reassuring an adult child that you will not go around "
             "their parent."),
            ("text", "Come to the Meeting Text",
             "1-3 sentences inviting the adult child into the conversation rather than "
             "excluding either side."),
            ("email", "When You and Your Parent Disagree",
             "Email to an adult child whose parent does not want to move. Keep the "
             "parent's authority intact and give the child something useful to do."),
            ("email", "Is Someone Pressuring Your Parent",
             "Help an adult child recognise a buyer, contractor or relative leaning on "
             "their parent, and what to do about it."),
        ],
    },
    "nucci": {
        "t": "expired",
        "briefs": [
            ("call", "The Takeaway Opener",
             "Cold call to an expired. Open by putting the fit in doubt first, then ask "
             "the curious question. No small talk, no weather, reason for the call "
             "immediately."),
            ("call", "Just Send Me Something",
             "Handle the brush-off by agreeing and offering two doors, one of which keeps "
             "the conversation alive. Never argue the objection."),
            ("vm", "Expired Voicemail — No Throat Clearing",
             "Under 40 seconds. Reason for the call in the first sentence."),
            ("text", "The Curious Question Text",
             "1-3 sentences. Genuinely curious, not pitching."),
        ],
    },
}

BANNED_EXTRA = ["elderly", "the aged", "old folks", "sweetie", "dear"]


def log(m):
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(time.strftime("%H:%M:%S  ") + m + "\n")
    try:
        print(m, flush=True)
    except UnicodeEncodeError:
        print(m.encode("ascii", "replace").decode(), flush=True)


PROMPT = """You are {adv}. Write ONE original real estate script, from scratch, on the
job described below.

Everything between the markers is RESEARCH on how you actually think, teach and speak -
your own frameworks, your own numbers, your own phrasing.

===== YOUR RESEARCHED MATERIAL =====
{kb}
===== END =====

THE JOB
Format: {ch_label}
Audience/topic: {topic_desc}
This script: {brief_title} - {brief}

HARD RULES
- This is YOUR material. Draw the substance from the research above: your frameworks,
  your practical mechanics, your specific numbers and sequences. If the research gives
  you an exact line that fits this moment, use it - once, where it lands.
- USE the method, never NAME it. The person on the phone should feel the technique
  working, never hear its label. Never say "our doctrine", "our framework", "our
  process", "our proven system". The research is written ABOUT you; its section
  headings are not words you say out loud.
- At most ONE signature phrase. Repeating a catchphrase turns you into a caricature.
- CRITICAL: some of your best lines are things you say TO AGENTS, not to clients.
  Anything that coaches the agent, justifies your business philosophy, or explains why
  your approach pays off ("doing the right thing has its advantages", "clients come
  first and the commission is secondary", "we are not typical agents") must NEVER be
  spoken to a homeowner. A client hearing you defend your own ethics finds it strange.
  Let the behaviour show it instead.
- No markdown. No asterisks, no underscores for emphasis, no bullets. This is spoken
  or typed to a real person.
- Industry SEGMENT LABELS are for your notes, never for the client's ears. Never call
  someone a "last-time seller", "senior lead", "downsizer" or "prospect" to their face.
  You would not tell a woman she is the last-time-seller segment.
- Never reference the end of someone's life to them. "Live there to the end of your
  life", "for your remaining years", "while you still can" - all of it lands as a
  reminder of dying, however kindly meant. Talk about comfort, independence and what
  they want next instead.
- Plain language in front of a homeowner. A 78-year-old selling the house she raised
  her children in does not get "asset disposition" or "equity harvesting". Save
  technical vocabulary for professionals.
- Never condescending about age. Banned outright: {banned_extra}. No "sweetie", no
  slow-talking, no assuming confusion. Speak to a competent adult.
- No generic filler: {banned}
- {ch_rule}
- Use {{{{Agent}}}} for the agent's name and {{{{Brokerage}}}} for their brokerage.
  Use {{{{Owner}}}} for the person being spoken to. Use {{{{Address}}}} or
  {{{{City}}}} only if the script genuinely needs them. Placeholders exactly as
  written, double braces.
- NEVER put your own name in the script. The agent using it introduces THEMSELVES:
  always "this is {{{{Agent}}}} with {{{{Brokerage}}}}", never your name and never
  your real company. You are supplying the method, not the identity.
- Write only the script. No preamble, no notes about what you did, no markdown headers.

Respond with ONLY JSON: {{"script": "the script text"}}"""

CH_LABEL = {"call": "phone call script", "vm": "voicemail",
            "text": "text message", "email": "email"}
CH_RULE = {
    "call": ('Spoken phone script. Use "YOU:" for the agent\'s lines and put short '
             'coaching notes in (parentheses). Leave room for the other person to '
             'answer - beats, not a monologue. 110-150 words.'),
    "vm": ("HARD LIMIT 85 words - count them before you answer. Under 40 seconds "
           "spoken. ONE reason to call back and nothing else. Do NOT explain the "
           "process, list steps, or reassure at length - that is what the call back "
           "is for. A voicemail that runs long is deleted before the number is heard, "
           "so being thorough here defeats the purpose."),
    "text": "1-3 short sentences that read without scrolling. Under 60 words. Ends with an easy question.",
    "email": ('Start with the literal line "Subject: " then the subject (under 9 words), '
              'then a blank line, then the body under 130 words.'),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--adv")
    ap.add_argument("--plan", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    rspec = importlib.util.spec_from_file_location("rg", str(ROOT / "scripts" / "reground_library.py"))
    rg = importlib.util.module_from_spec(rspec)
    rspec.loader.exec_module(rg)

    doss = json.loads((ROOT / "scripts" / "experts_dossier.json").read_text(encoding="utf-8"))
    # TOPICS lives in scripts_data.js and is not in the dump - read it straight
    src = (ROOT / "scripts_data.js").read_text(encoding="utf-8")
    block = re.search(r"const TOPICS = \[(.*?)\n\];", src, re.S).group(1)
    topics = {m[0]: (m[1], m[2]) for m in
              re.findall(r'\["([^"]+)","([^"]+)","([^"]+)"\]', block)}

    todo = []
    for aid, spec in PLAN.items():
        if args.adv and args.adv not in (aid, spec.get("adv_id", aid)):
            continue
        real = spec.get("adv_id", aid)
        for ch, title, brief in spec["briefs"]:
            todo.append((real, spec["t"], ch, title, brief))

    done = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    todo = [t for t in todo if (t[0] + "|" + t[3]) not in done]

    if args.plan:
        for aid, t, ch, title, brief in todo:
            print("%-10s %-6s %-40s -> %s" % (aid, ch, title, t))
        print("\n%d scripts to author (%d already done)" % (len(todo), len(done)))
        return
    if args.limit:
        todo = todo[:args.limit]

    spec = importlib.util.spec_from_file_location("ds", str(ROOT / "backend" / "demo_server.py"))
    sys.path.insert(0, str(ROOT / "backend"))
    ds = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ds)

    log("=" * 60)
    log("authoring %d original scripts" % len(todo))
    ok = fail = 0
    for i, (aid, t, ch, title, brief) in enumerate(todo, 1):
        adv = doss.get(aid, {}).get("name", aid)
        kb_f = ROOT / "backend" / "kb" / (aid + ".md")
        kb = kb_f.read_text(encoding="utf-8", errors="ignore")[:7000] if kb_f.exists() else ""
        if len(kb) < 400:
            log("  SKIP %s - no dossier to write from" % aid)
            fail += 1
            continue
        tname, tdesc = topics.get(t, (t, ""))

        body = None
        for attempt in range(3):
            try:
                r, lane = ds.ai_chat_json(
                    PROMPT.format(adv=adv, kb=kb, ch_label=CH_LABEL[ch],
                                  topic_desc=tname + " - " + tdesc,
                                  brief_title=title, brief=brief,
                                  banned=", ".join(rg.BANNED[:22]),
                                  banned_extra=", ".join(BANNED_EXTRA),
                                  ch_rule=CH_RULE[ch]),
                    max_tokens=1400, temperature=0.7)
                cand = normalize(( r or {}).get("script", ""))
                errs = validate(cand, ch, adv)
                if not errs:
                    body = cand
                    break
                log("     retry (%s)" % ",".join(errs))
            except RuntimeError:
                log("   lanes exhausted - pausing 90s")
                time.sleep(90)
            except Exception as exc:  # noqa: BLE001
                log("   error: %s" % str(exc)[:70])
                time.sleep(2)

        if body:
            done[aid + "|" + title] = {"adv": adv, "t": t, "ch": ch,
                                       "title": title, "body": body}
            ok += 1
        else:
            fail += 1
        OUT.write_text(json.dumps(done, ensure_ascii=False, indent=1), encoding="utf-8")
        log("  [%d/%d] %-10s %-5s %s%s" % (i, len(todo), aid, ch, title,
                                           "" if body else "   FAILED"))
        time.sleep(0.3)

    log("DONE - %d authored, %d failed" % (ok, fail))


def normalize(s):
    """Curly quotes and em dashes are a typography artifact of the model, not a
    quality problem - rejecting them just burns retries. Fix them and move on;
    the rest of the vault is straight-quoted so these must match."""
    if not s:
        return s
    for bad, good in (("’", "'"), ("‘", "'"), ("“", '"'),
                      ("”", '"'), ("–", "-"), ("…", "...")):
        s = s.replace(bad, good)
    return s.strip()


# Only an INTRODUCTION is a bug. "Brand It Like Serhant" is a book title and a
# legitimate reference; "Veronica Figueroa here" makes the member introduce
# themselves as somebody else, and "At Studio McGee, we..." hands them a company
# they do not work for.
_INTRO = (r"(?:this is|it'?s|here'?s|i'?m|name is|habla|soy|le habla|"
          r"calling from|from|with|at|de|con)")


def names_self(body, adv):
    """Flag the advisor's name only where it reads as the speaker or the
    speaker's firm. Placeholder interiors are stripped first so "Tim" cannot
    match inside {{Timeframe}}."""
    outside = re.sub(r"\{\{[^}]*\}\}", " ", body)
    cands = []
    for p in [adv] + [x.strip() for x in re.split(r"&|\band\b", adv)]:
        p = p.strip()
        if len(p) >= 4:
            cands.append(p)
            last = p.split()[-1]
            if len(last) >= 5:
                cands.append(last)
    for n in dict.fromkeys(cands):
        e = re.escape(n)
        # "<intro> Name"  e.g. this is Bruce Nemovitz / le habla Veronica Figueroa
        if re.search(_INTRO + r"[\s,]+" + e + r"\b", outside, re.I):
            return n
        # "Name here" / "Name speaking"  e.g. Byron Lazine here
        if re.search(r"\b" + e + r"[\s,]+(?:here|speaking)\b", outside, re.I):
            return n
        # the advisor's real firm offered as the member's  e.g. At Studio McGee, we
        if re.search(r"\b(?:at|from|with|de|con)\s+\w*\s?" + e +
                     r"\s*(?:Group|Team|Studio|Realty|Real Estate|Company|Co\.)?\s*,?\s+we\b",
                     outside, re.I):
            return n
        if re.search(r"\b(?:Studio|Group|Team)\s+" + e + r"\b", outside, re.I):
            return n
    return None


def validate(out, ch, adv=None):
    """Same bar the rest of the library is held to, plus the age-respect rule."""
    errs = []
    if not out or len(out.strip()) < 40:
        return ["empty"]
    import importlib.util as _i
    rspec = _i.spec_from_file_location("rg2", str(ROOT / "scripts" / "reground_library.py"))
    rg = _i.module_from_spec(rspec)
    rspec.loader.exec_module(rg)
    hit = rg.BANNED_RE.search(out)
    if hit:
        errs.append("banned:" + hit.group(0)[:16])
    for w in BANNED_EXTRA:
        if re.search(r"\b" + re.escape(w) + r"\b", out, re.I):
            errs.append("condescending:" + w)
    if re.search(r"^\s*(vm|call|text|email)?\s*TOPIC:|FORMAT:|=====|BEGIN SCRIPT|"
                 r"RESEARCH|DOSSIER|HARD RULES", out, re.I | re.M):
        errs.append("prompt-echo")
    if re.search(r"\{\{\s*\}\}|\{\{[^}]*\{|```", out):
        errs.append("malformed-placeholder")
    if re.search(r"\*|(?<![a-z0-9])_[a-z]", out, re.I):
        errs.append("markdown-emphasis")
    # maxims aimed at agents, spoken to a client by mistake
    for phrase in ("doing the right thing has its advantages",
                   "commission is secondary", "not typical real estate agents",
                   "knowledge is power", "clients' needs and goals come first",
                   "avoid crisis mode", "volume, consistency"):
        if phrase in out.lower():
            errs.append("coach-talk:" + phrase[:20])
    # segment labels said to the client's face
    # NOTE: "prospect" is deliberately NOT here - "prospective buyers" and "the
    # prospect of moving" are ordinary English, and banning it mangles good lines.
    for phrase in ("last-time seller", "last time seller", "downsizer",
                   "senior lead"):
        if phrase in out.lower():
            errs.append("segment-label:" + phrase[:18])
    # mortality, however gently meant
    if re.search(r"end of (their|your|his|her) li(fe|ves)|remaining years|"
                 r"while (you|they) still can|final years", out, re.I):
        errs.append("mortality-reference")
    if "’" in out or "“" in out:
        errs.append("curly-quotes")
    w = len(out.split())
    if ch == "vm" and w > 95:
        errs.append("vm-too-long")
    if ch == "text" and w > 75:
        errs.append("text-too-long")
    if ch == "email" and not out.lstrip().startswith("Subject:"):
        errs.append("no-subject")
    if adv:
        n = names_self(out, adv)
        if n:
            errs.append("names-self:" + n)
    return errs


if __name__ == "__main__":
    main()


def tone_errors(body):
    """Tone rules that must hold however a script was produced - authored fresh
    or re-voiced from someone else's. Lives here so both pipelines share one
    definition instead of drifting apart, which is how "last-time seller" ended
    up spoken to clients in 82 voice variants."""
    errs = []
    low = body.lower()
    for phrase in ("doing the right thing has its advantages", "commission is secondary",
                   "not typical real estate agents", "knowledge is power",
                   "clients' needs and goals come first", "avoid crisis mode"):
        if phrase in low:
            errs.append("coach-talk:" + phrase[:20])
    for phrase in ("last-time seller", "last time seller", "downsizer", "senior lead"):
        if phrase in low:
            errs.append("segment-label:" + phrase[:18])
    for w in BANNED_EXTRA:
        if re.search(r"" + re.escape(w) + r"", low):
            errs.append("condescending:" + w)
    if re.search(r"end of (their|your|his|her) li(fe|ves)|remaining years|"
                 r"while (you|they) still can|final years", body, re.I):
        errs.append("mortality-reference")
    return errs
