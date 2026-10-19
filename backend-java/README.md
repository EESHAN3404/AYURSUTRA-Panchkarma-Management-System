# AyurSutra Panchakarma - Java Spring Boot Backend

This project has been fully converted from Python Flask to Java Spring Boot to make the project a full stack Java application.

## Prerequisites
- Java 17+
- Maven 3.8+

## Setup & Run
1. Navigate to the `backend-java` folder:
   ```bash
   cd backend-java
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

## Database
The Spring Boot backend uses the exact same SQLite database (`ayursutra.db`) as the Python version. A copy of the database has been placed in the `backend-java` folder.
Hibernate configurations have been adjusted to preserve the exact column naming strategy expected by your original data.

## Features fully replicated:
- **Authentication:** Login, signup, fetching roles.
- **Appointments:** Booking, confirming, completing, treatment history.
- **Profiles & Notes:** Health profiles, session notes, dietary plans.
- **Payments:** Razorpay integration, generating bills, and verification.
- **Emails:** Appointment confirmations and payment receipts.
- **AI Assistant:** Symptom-based therapy/diet recommendations.
- **System:** Backup, clear database, daily reports, settings update.
