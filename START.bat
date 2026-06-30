@echo off
REM Ryan Serhant Response Tool Startup Script

title Ryan Serhant Response Tool - Backend

echo.
echo ========================================
echo Ryan Serhant Response Tool
echo ========================================
echo.
echo Starting backend server...
echo.

cd /d "%~dp0backend"

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo Installing dependencies...
    pip install -q -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

REM Start the server
echo.
echo ========================================
echo Backend is starting on http://localhost:8000
echo ========================================
echo.
echo API Status:  http://localhost:8000/health
echo Query Endpoint: http://localhost:8000/query
echo.
echo Frontend: Open frontend.html in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn api:app --reload --port 8000
