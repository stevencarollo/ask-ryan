# -*- coding: utf-8 -*-
"""Reframe 'why' captions: strip the 'I rewrote/transformed/incorporated...'
editing-narration lead-in, keep the substantive key-points clause that follows."""
import json, os, re, sys

LEADINS = [
    re.compile(
        r'^(?:I\s+)?(?:have\s+)?(?:rewrote|transformed|incorporated|infused|revised|adapted|'
        r'wrote|wove|built|crafted|reworked|revamped|reimagined|adjusted|updated|changed|'
        r'reframed|rephrased)\s+'
        r'(?:the\s+\w+\s+|it\s+)?'
        r'(?:by\s+|to\s+)?',
        re.IGNORECASE,
    ),
    re.compile(
        r'^The\s+(?:script|email|text|call|voicemail|message|rewrite)\s+'
        r'(?:was|is|has been)\s+'
        r'(?:rewritten|rephrased|transformed|adapted|revised|reworked|reworded|reframed|crafted)\s+'
        r'(?:to\s+|in\s+(?:the\s+voice\s+of\s+)?|using\s+|entirely\s+in\s+(?:the\s+voice\s+of\s+)?)',
        re.IGNORECASE,
    ),
    re.compile(
        r'^The\s+rewritten\s+(?:script|email|text|call|voicemail|message)\s+',
        re.IGNORECASE,
    ),
]

CONJUGATE = {
    "reflect": "Reflects", "incorporate": "Incorporates", "embody": "Embodies",
    "capture": "Captures", "channel": "Channels", "mirror": "Mirrors",
    "infuse": "Infuses", "emphasize": "Emphasizes", "lean": "Leans",
    "draw": "Draws", "use": "Uses", "start": "Starts", "frame": "Frames",
    "focus": "Focuses", "embed": "Embeds", "weave": "Weaves", "echo": "Echoes",
    "adopt": "Adopts", "apply": "Applies", "employ": "Employs",
    "deploy": "Deploys", "open": "Opens", "close": "Closes", "end": "Ends",
    "keep": "Keeps", "give": "Gives", "add": "Adds", "swap": "Swaps",
    "replace": "Replaces", "flip": "Flips", "turn": "Turns", "make": "Makes",
    "bring": "Brings", "pair": "Pairs", "anchor": "Anchors",
    "acknowledge": "Acknowledges", "address": "Addresses", "validate": "Validates",
    "defuse": "Defuses", "position": "Positions", "present": "Presents",
    "ask": "Asks", "invite": "Invites", "offer": "Offers", "highlight": "Highlights",
    "quote": "Quotes", "cite": "Cites", "reference": "References", "note": "Notes",
    "stress": "Stresses", "prioritize": "Prioritizes", "center": "Centers",
    "ground": "Grounds", "root": "Roots", "adopt": "Adopts", "first": "First",
}

def reword(why):
    if not why:
        return why
    m = None
    for pat in LEADINS:
        m = pat.match(why)
        if m:
            break
    if not m or m.end() < 4:
        return why
    remainder = why[m.end():].strip()
    if len(remainder) < 15:
        return why  # not enough left over to be useful; leave original
    first, _, rest = remainder.partition(" ")
    conj = CONJUGATE.get(first.lower())
    remainder = f"{conj} {rest}" if conj else (remainder[0].upper() + remainder[1:])
    return remainder

if __name__ == "__main__":
    samples = [
        "I rewrote the script to reflect Ryan Serhant's voice, incorporating his signature phrases and philosophy, such as 'keep more balls in the air' and people don't like being sold, focusing on a conversational, less pushy tone.",
        "I infused the script with Ryan Serhant's energetic and direct tone, emphasizing value, network building, and incorporating phrases like 'maximum impact' and 'keep the balls in the air.'",
        "I infused Ryan Serhant's direct, confident tone and signature phrase 'keep the balls in the air' to frame the agent's expertise in filtering for real, qualified leads.",
        "I transformed the script by embedding Chris Voss's negotiation tactics, including 'no-oriented' questions, 'labels' like 'It seems/sounds like,' and calibrated questions, to subtly de-escalate tension.",
        "Rewrote the script to incorporate Chris Voss's negotiation tactics, including no-oriented questions, labels, and calibrated questions, while maintaining the original intent and structure.",
        "I rewrote the script to start with a 'no'-oriented question to invite a comfortable refusal, used a label to frame the benefit, and ended with another 'no'-oriented question to give control.",
        "I rewrote it to embody Brian Buffini's 'Give, Ask & Receive' philosophy, offering a personalized 'Item of Value' upfront with a warm, direct, and value-focused tone.",
        "I incorporated Chad Corbett's direct, value-first approach, emphasizing 'actionable insight,' 'doing things the right way,' and pivoting to understand the lead's 'plan' or 'situation.'",
        "I rewrote the script to embody Chad Corbett's philosophy of serving the family first, emphasizing mastery of the probate process, and using his signature vocabulary.",
    ]
    for s in samples:
        print("BEFORE:", s[:90])
        print("AFTER: ", reword(s))
        print()
