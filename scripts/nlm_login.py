"""Custom NotebookLM login capturer.

Launches a headed browser with anti-automation-detection settings, lets Steve
sign into Google, waits until NotebookLM loads signed-in, then saves the
storage state exactly where notebooklm-py expects it.

Usage: python scripts/nlm_login.py [chromium|firefox]
"""
import os
import sys
import time

from playwright.sync_api import sync_playwright

TARGET = os.path.expanduser("~/.notebooklm/profiles/default/storage_state.json")
engine = (sys.argv[1] if len(sys.argv) > 1 else "chromium").lower()

os.makedirs(os.path.dirname(TARGET), exist_ok=True)

with sync_playwright() as p:
    if engine == "firefox":
        browser = p.firefox.launch(headless=False)
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 860},
        )
    else:
        browser = p.chromium.launch(
            headless=False,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-first-run",
                "--no-default-browser-check",
                "--disable-infobars",
            ],
        )
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 860},
            user_agent=("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                        "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"),
        )
        ctx.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    page = ctx.new_page()
    page.goto("https://notebooklm.google.com/", wait_until="domcontentloaded")
    print("Browser open. Sign into Google. Waiting up to 6 minutes for NotebookLM to load signed-in...")

    deadline = time.time() + 6 * 60
    ok = False
    while time.time() < deadline:
        try:
            url = page.url
            # Signed in when we're on notebooklm.google.com and the app shell rendered
            if "notebooklm.google.com" in url and "accounts.google" not in url:
                # check for a signed-in cookie
                cookies = ctx.cookies("https://notebooklm.google.com")
                names = {c["name"] for c in cookies}
                if {"SID", "HSID", "SSID"} & names or any(n.startswith("__Secure-") for n in names):
                    body = page.evaluate("document.body ? document.body.innerText.slice(0,400) : ''")
                    if "Sign in" not in body[:200]:
                        ok = True
                        break
        except Exception:
            pass
        time.sleep(3)

    if ok:
        ctx.storage_state(path=TARGET)
        print(f"SUCCESS: auth saved to {TARGET}")
    else:
        print("TIMEOUT: login not detected.")
    browser.close()
