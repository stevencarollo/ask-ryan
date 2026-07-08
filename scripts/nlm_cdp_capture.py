"""Capture NotebookLM auth from Steve's OWN everyday Chrome via CDP (port 9222).

No new login needed - his Chrome is already signed into Google. We attach to the
running browser, open NotebookLM in a tab (proving the session works), and export
the storage state to where notebooklm-py expects it.

Requires Chrome running with --remote-debugging-port=9222.
"""
import json
import os
import sys
import time

from playwright.sync_api import sync_playwright

TARGET = os.path.expanduser("~/.notebooklm/profiles/default/storage_state.json")
os.makedirs(os.path.dirname(TARGET), exist_ok=True)


def _is_google_domain(domain):
    d = domain.lstrip(".")
    return d == "google.com" or d.endswith(".google.com") or d == "youtube.com" or d.endswith(".youtube.com")


def filtered_storage_state(ctx):
    """The Chrome profile this pulls from is Steve's everyday browser - its full
    storage_state carries 100+ unrelated domains' cookies (ad-tech, other sites
    he's logged into). notebooklm-py only needs the Google session, and past a
    certain size the base64'd blob blows past Linux's exec argument-list limit
    when Render starts the process ('argument list too long'). Keep it to just
    the Google/YouTube cookies and origins that actually carry the auth."""
    state = ctx.storage_state()
    state["cookies"] = [c for c in state.get("cookies", []) if _is_google_domain(c.get("domain", ""))]
    state["origins"] = [o for o in state.get("origins", []) if _is_google_domain(
        o.get("origin", "").split("://")[-1].split("/")[0])]
    return state

with sync_playwright() as p:
    try:
        browser = p.chromium.connect_over_cdp("http://localhost:9222", timeout=8000)
    except Exception as e:
        print(f"NO_CDP: could not attach to Chrome on 9222 ({e})")
        sys.exit(2)

    ctx = browser.contexts[0]
    page = ctx.new_page()
    page.goto("https://notebooklm.google.com/", wait_until="domcontentloaded", timeout=45000)
    time.sleep(6)

    url = page.url
    if "accounts.google" in url:
        print("NOT_SIGNED_IN: Chrome session isn't logged into Google for NotebookLM.")
        page.close()
        sys.exit(3)

    cookies = ctx.cookies("https://notebooklm.google.com")
    names = {c["name"] for c in cookies}
    if not ({"SID", "HSID", "SSID"} & names or any(n.startswith("__Secure-") for n in names)):
        print("NO_COOKIES: no Google session cookies found.")
        page.close()
        sys.exit(4)

    state = filtered_storage_state(ctx)
    with open(TARGET, "w", encoding="utf-8") as f:
        json.dump(state, f)
    page.close()
    kept = len(state["cookies"])
    print(f"SUCCESS: NotebookLM auth captured from your Chrome -> {TARGET} "
          f"({kept} Google cookies, {os.path.getsize(TARGET)} bytes)")
