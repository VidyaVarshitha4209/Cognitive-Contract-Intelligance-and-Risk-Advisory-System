@echo off
echo Starting CogniContract Application...

start cmd /k "cd /d %~dp0\backend && uvicorn main:app --reload --port 8000"
start cmd /k "cd /d %~dp0\frontend && npm run dev"

echo Both Backend and Frontend are starting up!
echo Access your UI at http://localhost:5173