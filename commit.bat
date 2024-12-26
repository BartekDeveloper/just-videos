@echo on
if %1=="" (
  echo Usage: commit.bat <commit message>
  exit /b 1
)
git add .
git add .
git commit -m "%1"
@echo off