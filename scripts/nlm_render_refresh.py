# -*- coding: utf-8 -*-
"""One-command NotebookLM auth refresh for the live Roundtable server.

Does the ENTIRE loop with no manual steps:
  1. Captures a fresh Google session from the dedicated NLM Chrome profile
     (C:\\nlm_prof_copy, CDP port 9222 - launches it if it isn't running).
  2. Validates the session with notebooklm-py (and re-exports AFTER the
     validation, since validation rotates the cookies).
  3. Pushes the new base64 value to the ask-ryan service on Render via API.
  4. Triggers a redeploy and waits until the live server reports the new key.

Run it whenever the site shows "Authentication expired":
  python scripts/nlm_render_refresh.py
"""
import asyncio, base64, json, os, re, subprocess, sys, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SERVICE_ID = "srv-d921n6gjs32c739lqqo0"          # ask-ryan web service
SITE = "https://ask-ryan-nb3w.onrender.com"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PROFILE = r"C:\nlm_prof_copy"
STORAGE = os.path.expanduser("~/.notebooklm/profiles/default/storage_state.json")


def api_key():
    raw = open(os.path.join(REPO, "RENDER_API_KEY.txt")).read()
    m = re.search(r"rnd_[A-Za-z0-9]+", raw)
    if not m:
        sys.exit("No Render API key found in RENDER_API_KEY.txt")
    return m.group()


def render_api(method, path, body=None, key=None):
    req = urllib.request.Request(
        f"https://api.render.com/v1{path}", method=method,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        data=json.dumps(body).encode() if body is not None else None)
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode() or "{}")


def cdp_alive():
    try:
        urllib.request.urlopen("http://localhost:9222/json/version", timeout=3)
        return True
    except Exception:
        return False


def step1_capture():
    if not cdp_alive():
        print("Launching NLM Chrome profile...")
        subprocess.Popen([CHROME, "--remote-debugging-port=9222",
                          f"--user-data-dir={PROFILE}", "--profile-directory=Default",
                          "--no-first-run", "https://notebooklm.google.com"])
        for _ in range(20):
            time.sleep(2)
            if cdp_alive():
                break
        else:
            sys.exit("Chrome CDP never came up on 9222.")
        time.sleep(5)
    r = subprocess.run([sys.executable, os.path.join(HERE, "nlm_cdp_capture.py")],
                       capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip())
    if "SUCCESS" not in r.stdout:
        sys.exit("Capture failed - if the profile got signed out, open the Chrome "
                 "window that just launched, sign into Google, and re-run this script.")


def step2_validate():
    async def check():
        from notebooklm import NotebookLMClient
        async with NotebookLMClient.from_storage() as c:
            return len(await c.notebooks.list())
    n = asyncio.run(check())
    print(f"Session valid - {n} notebooks visible.")


def step3_push(key):
    b64 = base64.b64encode(open(STORAGE, "rb").read()).decode()
    render_api("PUT", f"/services/{SERVICE_ID}/env-vars/NLM_STORAGE_B64",
               {"value": b64}, key)
    print(f"Env var updated on Render ({len(b64)} chars).")
    dep = render_api("POST", f"/services/{SERVICE_ID}/deploys", {}, key)
    print(f"Redeploy triggered: {dep.get('id', '?')}")
    return len(b64)


def step4_verify(expect_len):
    print("Waiting for the new key to go live (typically 2-3 min)...")
    deadline = time.time() + 600
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(f"{SITE}/api/diag", timeout=60) as r:
                d = json.loads(r.read().decode())
            if d.get("nlm_env_length") == expect_len and d.get("nlm_ready"):
                print(f"LIVE: key length {expect_len}, nlm_ready=true. Done.")
                return
        except Exception:
            pass
        time.sleep(20)
    sys.exit("Timed out waiting for the deploy - check the Render dashboard.")


if __name__ == "__main__":
    key = api_key()
    step1_capture()
    step2_validate()
    n = step3_push(key)
    step4_verify(n)
