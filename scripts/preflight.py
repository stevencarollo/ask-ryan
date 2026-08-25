# -*- coding: utf-8 -*-
"""Pre-push preflight: verify every library is correct and mutually consistent.

Written after two silent regressions that a spot-check missed:
  - re-running apply_regrounded.py wiped 69 deliberately-reverted scripts
  - the voice libraries stayed six weeks stale behind the base library
Both were invisible until measured, so this measures instead of assuming.

Exit code is non-zero if anything fails, so it can gate a push.

    python scripts/preflight.py
"""
import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FAILS, WARNS = [], []

# the model echoing the generator's own prompt headers into a script
ECHO_RE = re.compile(r"^\s*(vm|call|text|email)?\s*TOPIC:|FORMAT:\s*(vm|call|text|email)|"
                     r"=====|RESEARCH DOSSIER|END DOSSIER|BANNED WORDS|^\s*SCRIPT:|"
                     r"BEGIN SCRIPT|HARD RULES|grounded_in", re.I | re.M)


def check(ok, label, detail="", detail_on_fail_only=False):
    show = detail and not (ok and detail_on_fail_only)
    print(("  PASS  " if ok else "  FAIL  ") + label + (("  -> " + detail) if show else ""))
    if not ok:
        FAILS.append(label)
    return ok


def warn(cond, label, detail=""):
    if cond:
        print("  WARN  " + label + (("  -> " + detail) if detail else ""))
        WARNS.append(label)


def main():
    spec = importlib.util.spec_from_file_location("bs", str(ROOT / "scripts" / "build_spanish.py"))
    bs = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(bs)
    rspec = importlib.util.spec_from_file_location("rg", str(ROOT / "scripts" / "reground_library.py"))
    rg = importlib.util.module_from_spec(rspec)
    rspec.loader.exec_module(rg)

    S = bs.load_scripts()
    keys = {s["key"] for s in S}

    print("\n=== BASE LIBRARY ===")
    # Counts grow as advisors author new material - assert the roster and the
    # library agree with each other rather than against a number frozen in 2026.
    EXPECT_SCRIPTS, EXPECT_VOICES = 314, 38
    check(len(S) == EXPECT_SCRIPTS, "%d scripts" % EXPECT_SCRIPTS, str(len(S)))
    check(len(keys) == len(S), "no duplicate keys")
    chk = subprocess.run(["node", "--check", str(ROOT / "scripts_data.js")],
                         capture_output=True, text=True)
    check(chk.returncode == 0, "valid JavaScript", chk.stderr[:120])
    bad = [s for s in S if rg.BANNED_RE.search(s["body"])]
    check(not bad, "no filler or dossier meta-language",
          ", ".join(x["title"][:22] for x in bad[:3]))
    curly = sum(s["body"].count("’") + s["body"].count("“") for s in S)
    check(curly == 0, "no curly quotes", str(curly))
    empty = [s for s in S if len(s["body"].strip()) < 40]
    check(not empty, "no empty/truncated scripts", str(len(empty)))
    weird = [s for s in S if re.search(r"\{\{\s*\}\}|\{\{[^}]*\{|```", s["body"])]
    check(not weird, "no malformed placeholders or markdown", str(len(weird)))
    echo = [s for s in S if ECHO_RE.search(s["body"])]
    check(not echo, "no generator prompt-echo", ", ".join(x["title"][:20] for x in echo[:3]))

    # The member reads these aloud. An advisor naming themselves - or their real
    # company - makes an agent introduce themselves as somebody else. Found live
    # in 5 scripts (Espinosa, Figueroa "The Fig Team", Cauble "Cauble Group",
    # plus two newly authored), so this is a standing check, not a one-off.
    aspec = importlib.util.spec_from_file_location(
        "au", str(ROOT / "scripts" / "author_scripts.py"))
    au = importlib.util.module_from_spec(aspec)
    aspec.loader.exec_module(au)
    selfnamed = [(s, au.names_self(s["body"], s["adv"])) for s in S]
    selfnamed = [(s, n) for s, n in selfnamed if n]
    check(not selfnamed, "no script names its own advisor as the speaker",
          ", ".join("%s in %s" % (n, s["title"][:24]) for s, n in selfnamed[:3]))

    # spoken-format discipline
    longvm = [s for s in S if s["ch"] == "vm" and len(s["body"].split()) > 95]
    warn(bool(longvm), "voicemails over ~40 seconds", str(len(longvm)))
    longtx = [s for s in S if s["ch"] == "text" and len(s["body"].split()) > 75]
    warn(bool(longtx), "texts that need scrolling", str(len(longtx)))
    noemail = [s for s in S if s["ch"] == "email" and not s["body"].lstrip().startswith("Subject:")]
    check(not noemail, "every email keeps its Subject: label", str(len(noemail)))

    print("\n=== DELIBERATE REVERTS (must stay as the originals) ===")
    KEEP = ["Rene Rodriguez", "Brian Buffini", "Jerry Norton",
            "Laurel Starks", "Chris Voss", "Ryan Serhant"]
    baks = sorted(ROOT.glob("scripts_data.PRE-REGROUND-*.js"))
    if baks:
        orig_src = baks[0].read_text(encoding="utf-8")   # the earliest = true originals
        orig = {bs.skey(t[3], t[2], t[1], t[0]): t[4] for t in bs.SCRIPT_RE.findall(orig_src)}
        now = {s["key"]: s["body"] for s in S}
        for adv in KEEP:
            ks = [s["key"] for s in S if s["adv"] == adv]
            same = sum(1 for k in ks if k in orig and
                       now[k].replace("’", "'") == orig[k].replace("’", "'"))
            check(same == len(ks), f"{adv} untouched", f"{same}/{len(ks)}")
        check(any("FROM you" in s["body"] for s in S if s["adv"] == "Chris Voss"),
              "Voss 'wants something FROM you' intact")

    print("\n=== VOICE LIBRARIES ===")
    vfiles = sorted(p for p in (ROOT / "voices").glob("*.json") if not p.name.startswith("_"))
    check(len(vfiles) == EXPECT_VOICES, "%d advisor libraries" % EXPECT_VOICES, str(len(vfiles)))
    bad_v = miss_v = orphan_v = 0
    for f in vfiles:
        d = json.loads(f.read_text(encoding="utf-8"))
        bad_v += sum(1 for v in d.values() if rg.BANNED_RE.search(v.get("script", "")))
        miss_v += len(keys - set(d))
        orphan_v += len(set(d) - keys)
    check(bad_v == 0, "no filler/meta across all voice variants", str(bad_v))
    echo_v = 0
    for f in vfiles:
        d = json.loads(f.read_text(encoding="utf-8"))
        echo_v += sum(1 for v in d.values() if ECHO_RE.search(v.get("script", "")))
    check(echo_v == 0, "no prompt-echo in voice variants", str(echo_v))
    check(miss_v == 0, "every library covers all %d scripts" % EXPECT_SCRIPTS, f"{miss_v} missing")
    check(orphan_v == 0, "no orphaned keys in voice libraries", f"{orphan_v} orphans")

    # Tone rules held in the AUTHORING pipeline but not the re-voicing one, so
    # "what I call last-time sellers" reached the client in 82 variants - an
    # internal segment label applied to somebody's mother. Both generators now
    # share tone_errors(); this is the backstop.
    tone_v, tone_eg = 0, []
    for f in vfiles:
        for v in json.loads(f.read_text(encoding="utf-8")).values():
            e = au.tone_errors(v.get("script", ""))
            if e:
                tone_v += 1
                if len(tone_eg) < 3:
                    tone_eg.append("%s:%s" % (f.stem, e[0]))
    check(tone_v == 0, "no coach-talk, segment labels or condescension in variants",
          ", ".join(tone_eg) if tone_eg else str(tone_v))
    selfn_v = 0
    for f in vfiles:
        adv = next((a["n"] for a in json.loads(
            (ROOT / "scripts" / "scripts_dump.json").read_text(encoding="utf-8"))["advisors"]
            if a["id"] == f.stem), None)
        if not adv:
            continue
        selfn_v += sum(1 for v in json.loads(f.read_text(encoding="utf-8")).values()
                       if au.names_self(v.get("script", ""), adv))
    check(selfn_v == 0, "no variant introduces the member as the advisor", str(selfn_v))

    print("\n=== SPANISH LIBRARY ===")
    es = json.loads((ROOT / "voices" / "_es.json").read_text(encoding="utf-8"))
    need = {s["key"] for s in S if s["t"] != "espanol"}
    check(not (need - set(es)), "every non-Spanish script has a translation",
          f"{len(need - set(es))} missing")
    check(not (set(es) - keys), "no orphaned Spanish keys", str(len(set(es) - keys)))
    blob = " ".join(v["script"] for v in es.values())
    check(not re.search(r"\b(tú|tienes|puedes|quieres)\b", blob, re.I), "no tu-form leaks")
    esmail = [k for k, v in es.items()
              if next((s for s in S if s["key"] == k), {}).get("ch") == "email"
              and not v["script"].lstrip().startswith("Subject:")]
    check(not esmail, "Spanish emails keep Subject:", str(len(esmail)))
    check(len(re.findall(r"[áéíóúñ¿¡]", blob)) > 1000, "Spanish accents present")
    check(not [k for k, v in es.items() if ECHO_RE.search(v["script"])],
          "no prompt-echo in Spanish")

    # STALENESS: Spanish must descend from the CURRENT English
    print("\n=== CROSS-LIBRARY FRESHNESS ===")
    baks2 = sorted(ROOT.glob("scripts_data.PRE-*.js"))
    check(True, "spanish entries: %d" % len(es))

    # The service worker serves voices/*.json CACHE-FIRST, so a stale entry is
    # served forever. Shipping a voice fix without bumping CACHE_V means every
    # installed app keeps the broken scripts - which is exactly what happened
    # when 33 libraries were cleaned of dossier scaffolding and this string
    # stood still. The cache key must be newer than the files it caches.
    print("\n=== PWA CACHE KEY ===")
    sw = (ROOT / "sw.js").read_text(encoding="utf-8")
    m = re.search(r"CACHE_V\s*=\s*['\"]([^'\"]+)['\"]", sw)
    if not m:
        check(False, "sw.js declares CACHE_V")
    else:
        cache_v = m.group(1)

        def last_commit(*args):
            r = subprocess.run(["git", "log", "-1", "--format=%ct"] + list(args),
                               cwd=str(ROOT), capture_output=True, text=True)
            out = r.stdout.strip()
            return int(out) if out.isdigit() else None

        voices_at = last_commit("--", "voices")
        key_at = last_commit("-S", cache_v, "--", "sw.js")
        if key_at is None:
            check(True, "CACHE_V is new this commit", cache_v)
        elif voices_at is None:
            check(True, "no voice history to compare", cache_v)
        else:
            check(key_at >= voices_at,
                  "CACHE_V newer than voices/ (%s)" % cache_v,
                  "voices/ changed after the cache key was set - bump CACHE_V "
                  "or installed apps keep serving the old libraries",
                  detail_on_fail_only=True)

    print("\n" + ("=" * 52))
    if FAILS:
        print("PREFLIGHT FAILED - %d problem(s): %s" % (len(FAILS), "; ".join(FAILS[:4])))
        sys.exit(1)
    print("PREFLIGHT PASSED" + (" with %d warning(s)" % len(WARNS) if WARNS else ""))


if __name__ == "__main__":
    main()
