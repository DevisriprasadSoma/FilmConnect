@echo off
echo Starting FilmConnect Backend and Frontend...

cd /d "%~dp0backend"
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
start "FilmConnect Backend" cmd /k "uvicorn main:app --reload --port 8000"

cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)
start "FilmConnect Frontend" cmd /k "npm run dev"

echo FilmConnect is running!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
