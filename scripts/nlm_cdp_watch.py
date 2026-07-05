"""Open NotebookLM in the CDP Chrome and auto-capture auth the moment Steve signs in."""
import os
import time

from playwright.sync_api import sync_playwright

TARGET = os.path.expanduser("~/.notebooklm/profiles/default/storage_state.json")
os.makedirs(os.path.dirname(TARGET), exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp("http://localhost:9222", timeout=8000)
    ctx = browser.contexts[0]
    page = ctx.new_page()
    page.goto("https://notebooklm.google.com/", wait_until="domcontentloaded", timeout=45000)
    print("NotebookLM tab opened in your Chrome. Waiting for sign-in (checking every 15s, up to 9 minutes)...")

    deadline = time.time() + 9 * 60
    while time.time() < deadline:
        try:
            url = page.url
            if "notebooklm.google.com" in url and "accounts.google" not in url:
                cookies = ctx.cookies("https://notebooklm.google.com")
                names = {c["name"] for c in cookies}
                if {"SID", "HSID", "SSID"} & names or any(n.startswith("__Secure-") for n in names):
                    body = ""
                    try:
                        body = page.evaluate("document.body ? document.body.innerText.slice(0,300) : ''")
                    except Exception:
                        pass
                    if "Sign in" not in body:
                        ctx.storage_state(path=TARGET)
                        print(f"SUCCESS: auth captured -> {TARGET}")
                        break
        except Exception:
            pass
        time.sleep(15)
    else:
        print("TIMEOUT: not signed in yet. Sign in whenever - then say 'captured' to retry instantly.")
