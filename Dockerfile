# ==========================================
# Step 1: Build React Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build static bundle into /app/dist
COPY . .
RUN npm run build

# ==========================================
# Step 2: Build Spring Boot Backend with embedded Frontend
# ==========================================
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app

# Cache Maven dependencies
COPY backend-java/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy Spring Boot backend source code
COPY backend-java/src ./src

# Inject built frontend assets into Spring Boot's static folder
COPY --from=frontend-builder /app/dist ./src/main/resources/static

# Build the unified executable Spring Boot JAR
RUN mvn clean package -DskipTests

# ==========================================
# Step 3: Minimal Alpine Runtime Image
# ==========================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy SQLite database into runtime container
COPY backend-java/ayursutra.db ./ayursutra.db
RUN chmod 666 ./ayursutra.db

# Copy built Spring Boot JAR
COPY --from=backend-builder /app/target/*.jar app.jar

# Render provides the PORT environment variable
ENV PORT=5000
EXPOSE 5000

# Optimize JVM memory flags for Render free tier (512MB RAM limit)
CMD ["java", "-Xmx384m", "-Xss512k", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
