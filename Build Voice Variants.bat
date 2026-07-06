@echo off
REM Builds the prewritten voice libraries for the Script Vault (resumable).
REM Run overnight; re-run any time - it skips what's already built.
REM When a run finishes, commit + push the voices\ folder so the site gets them:
REM   git add voices && git commit -m "voices batch" && git push
cd /d "%~dp0"
python scripts\build_voice_variants.py
pause
