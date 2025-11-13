@echo off
echo ==========================================
echo    Portfolio - Development Launcher
echo ==========================================
echo.
echo This will start the Angular development server
echo Frontend: http://localhost:4200
echo.

:: Check if we're in the right directory
if not exist "src\app" (
    echo ERROR: Angular project not found!
    echo Please run this script from the Portfolio root directory.
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the Portfolio root directory.
    pause
    exit /b 1
)

:: Check if node_modules exist
if not exist node_modules (
    echo Installing npm dependencies...
    npm install
    if %ERRORLEVEL% neq 0 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
)

echo Building and starting Angular development server...
echo This will open your browser automatically when ready.
echo.

:: Start Angular dev server
ng serve --open

echo.
echo Portfolio development server started!
echo - Frontend: http://localhost:4200
echo.
echo Close this window or press Ctrl+C to stop the server.
pause