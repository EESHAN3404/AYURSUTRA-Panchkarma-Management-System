# 🚀 100% Free Deployment Guide - AyurSutra Panchakarma

This project is now configured as a **unified full-stack application**:
* **Frontend**: React + Vite (compiled & embedded into Spring Boot)
* **Backend**: Java 17 Spring Boot (serves both API routes and frontend pages)
* **Database**: SQLite (`ayursutra.db` pre-populated with all demo accounts)

---

## 📌 Step 1: Push your project to GitHub

If you haven't pushed `ayursutra-panchakarma` to GitHub yet, open your terminal inside the `ayursutra-panchakarma` directory:

```bash
cd "c:\Users\eesha\OneDrive\Desktop\FYP\ayursutra-panchakarma"

# Initialize Git
git init

# Add all files
git add .

# Commit your code
git commit -m "Configure full-stack deployment for Render"

# Rename branch to main
git branch -M main

# Link to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# Push to GitHub
git push -u origin main
```

*(If you already have a GitHub repository for this project, just commit and push the changes: `git add . && git commit -m "Full-stack deployment ready" && git push`)*.

---

## 📌 Step 2: Deploy on Render.com (100% Free)

1. Go to [Render.com](https://render.com) and **Sign Up / Log In** (you can click **Continue with GitHub**).
2. Click the **"New +"** button in the top right and select **"Web Service"**.
3. Under *Connect a repository*, choose your GitHub repository.
4. Fill in the deployment details:
   * **Name**: `ayursutra-panchakarma` (or your preferred name)
   * **Region**: Choose the closest region (e.g., *Singapore*, *Frankfurt*, or *Ohio*)
   * **Branch**: `main`
   * **Runtime**: Select **Docker** (Render will automatically detect our `Dockerfile`)
   * **Instance Type**: Select **Free** ($0 / month)
5. Under **Advanced** (Optional):
   * Render automatically assigns a `PORT` environment variable, which our application is already configured to read.
6. Click **"Deploy Web Service"**!

Render will build the Docker container (Node.js builds the React UI, Maven compiles the Spring Boot JAR), bundle the SQLite database, and launch your site.

Once finished, Render gives you a public HTTPS link:
```
https://ayursutra-panchakarma.onrender.com
```

---

## 📌 Step 3: Test Local Development (Unchanged)

Your local development workflow is **100% preserved**:

* **Standard Dev Mode (Frontend)**:
  ```bash
  cd ayursutra-panchakarma
  npm run dev
  ```
* **Standard Dev Mode (Backend)**:
  ```bash
  cd ayursutra-panchakarma/backend-java
  mvn spring-boot:run
  ```
* **Test the Full-Stack Production Bundle Locally (1-Click)**:
  Double-click `build-and-run.bat` or run:
  ```bash
  ./build-and-run.bat
  ```
  Open `http://localhost:5000` to see the exact production behavior on your computer!

---

## 💡 Important Free-Tier Tips for Presentations / Evaluation

* **Sleep Mode**: On Render's free tier, the server spins down after 15 minutes of inactivity. When someone opens the URL after it has been sleeping, it takes **~30 to 45 seconds** to wake up.
* **Viva / Demo Preparation**: Right before your project presentation or professor evaluation, visit your URL once in your phone or browser to wake it up. Once warm, it will respond instantly!
