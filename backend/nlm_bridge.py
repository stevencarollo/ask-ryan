"""
NotebookLM bridge - real Audio Overview generation via notebooklm-py
(unofficial client; uses the operator's own Google session).

Flow per job: create notebook -> add the episode source doc -> generate audio
overview -> download MP3 -> (optionally) delete the notebook. Jobs run in
background threads; results are kept in memory and served as files.

Auth:
  Local: ~/.notebooklm/profiles/default/storage_state.json (created by
         `notebooklm login`, one interactive login).
  Server (Render): set NLM_STORAGE_B64 = base64 of that storage_state.json;
         it gets written to a temp file at startup.
"""
import asyncio
import base64
import os
import tempfile
import threading
import time
import uuid

JOBS = {}
JOB_TTL = 60 * 60  # 1h
_STORAGE_PATH = None


def _storage_path():
    global _STORAGE_PATH
    if _STORAGE_PATH:
        return _STORAGE_PATH
    b64 = os.getenv("NLM_STORAGE_B64")
    if b64:
        p = os.path.join(tempfile.gettempdir(), "nlm_storage_state.json")
        try:
            with open(p, "wb") as f:
                f.write(base64.b64decode(b64))
            _STORAGE_PATH = p
            return p
        except Exception:
            pass
    default = os.path.expanduser("~/.notebooklm/profiles/default/storage_state.json")
    if os.path.exists(default):
        _STORAGE_PATH = default
        return default
    return None


def nlm_ready():
    if _storage_path() is None:
        return False
    try:
        import notebooklm  # noqa: F401
        return True
    except ImportError:
        return False


def start_audio_job(title, source_doc, language="en", instructions=None):
    job_id = uuid.uuid4().hex[:12]
    JOBS[job_id] = {"status": "queued", "step": "Starting...", "created": time.time(),
                    "title": title, "file": None, "error": None}
    t = threading.Thread(target=_run_job, args=(job_id, title, source_doc, language, instructions), daemon=True)
    t.start()
    _gc_jobs()
    return job_id


def _gc_jobs():
    now = time.time()
    for jid in list(JOBS.keys()):
        j = JOBS[jid]
        if now - j["created"] > JOB_TTL:
            try:
                if j.get("file") and os.path.exists(j["file"]):
                    os.remove(j["file"])
            except Exception:
                pass
            JOBS.pop(jid, None)


def _set(job_id, **kw):
    if job_id in JOBS:
        JOBS[job_id].update(kw)


def _run_job(job_id, title, source_doc, language, instructions=None):
    try:
        asyncio.run(_run_async(job_id, title, source_doc, language, instructions))
    except Exception as e:
        _set(job_id, status="error", error=str(e)[:300])


async def _run_async(job_id, title, source_doc, language, instructions=None):
    from notebooklm import NotebookLMClient

    storage = _storage_path()
    if not storage:
        _set(job_id, status="error", error="NotebookLM auth not configured on this server.")
        return

    _set(job_id, status="working", step="Connecting to NotebookLM...")
    async with NotebookLMClient.from_storage(storage) as client:
        _set(job_id, step="Creating notebook...")
        nb = await client.notebooks.create(f"Roundtable: {title[:60]}")
        nb_id = getattr(nb, "id", None) or getattr(nb, "notebook_id", None) or str(nb)
        try:
            _set(job_id, step="Adding the episode source document...")
            # verified signature: add_text(notebook_id, title, content, *, wait=...)
            await client.sources.add_text(nb_id, f"{title} - source", source_doc,
                                          wait=True, wait_timeout=120.0)

            _set(job_id, step="Generating the Audio Overview (Google usually takes 2-5 minutes)...")
            # verified signature: generate_audio(notebook_id, source_ids=None, language='en', instructions=None, ...)
            await client.artifacts.generate_audio(nb_id, language=(language or "en"), instructions=(instructions or None))

            # Poll for completion + download
            out = os.path.join(tempfile.gettempdir(), f"nlm_audio_{job_id}.mp3")
            dl = client.artifacts.download_audio
            deadline = time.time() + 15 * 60
            last_err = None
            while time.time() < deadline:
                try:
                    await dl(nb_id, out)
                    if os.path.exists(out) and os.path.getsize(out) > 50_000:
                        _set(job_id, status="done", step="Ready", file=out)
                        break
                except Exception as e:
                    last_err = e
                _set(job_id, step="Google is still producing the audio...")
                await asyncio.sleep(20)
            else:
                raise RuntimeError(f"Timed out waiting for audio. Last: {last_err}")
        finally:
            # tidy up the notebook unless asked to keep them
            if os.getenv("NLM_KEEP_NOTEBOOKS", "0") != "1":
                try:
                    await client.notebooks.delete(nb_id)
                except Exception:
                    pass


def job_status(job_id):
    j = JOBS.get(job_id)
    if not j:
        return None
    return {"status": j["status"], "step": j["step"], "title": j["title"],
            "error": j["error"], "has_file": bool(j.get("file"))}


def job_file(job_id):
    j = JOBS.get(job_id)
    if j and j.get("file") and os.path.exists(j["file"]):
        return j["file"]
    return None
