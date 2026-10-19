#!/bin/bash
set -e

echo "========================================================"
echo "  AyurSutra Panchakarma - Full-Stack Local Builder"
echo "========================================================"
echo ""

echo "[1/3] Building React Frontend with Vite..."
npm run build

echo ""
echo "[2/3] Copying Frontend into Spring Boot Static Resources..."
mkdir -p backend-java/src/main/resources/static
cp -r dist/* backend-java/src/main/resources/static/

echo ""
echo "[3/3] Packaging Spring Boot JAR with Maven..."
cd backend-java
mvn clean package -DskipTests

echo ""
echo "========================================================"
echo "  Build Successful! Starting application..."
echo "  Open your browser at: http://localhost:5000"
echo "  Press Ctrl+C to stop."
echo "========================================================"
echo ""

java -Xmx384m -jar target/backend-java-0.0.1-SNAPSHOT.jar
