@echo off
echo ========================================================
echo   AyurSutra Panchakarma - Full-Stack Local Builder
echo ========================================================
echo.

echo [1/3] Building React Frontend with Vite...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed!
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Copying Frontend into Spring Boot Static Resources...
if not exist backend-java\src\main\resources\static mkdir backend-java\src\main\resources\static
xcopy /s /e /y dist\* backend-java\src\main\resources\static\

echo.
echo [3/3] Packaging Spring Boot JAR with Maven...
cd backend-java
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo [ERROR] Maven build failed!
    cd ..
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================================
echo   Build Successful! Starting application...
echo   Open your browser at: http://localhost:5000
echo   Press Ctrl+C to stop.
echo ========================================================
echo.

java -Xmx384m -jar target\backend-java-0.0.1-SNAPSHOT.jar
cd ..
