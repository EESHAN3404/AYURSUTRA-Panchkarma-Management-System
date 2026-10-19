# 🌿 AyurSutra Panchakarma

### Ayurvedic Therapy Center Management System

A responsive web application designed to simplify Ayurvedic therapy center operations through role-based dashboards, appointment booking, therapy progress tracking, and patient management.

**Live Demo:** https://ayursutra-panchakarma-wmo0.onrender.com/

**GitHub Repository:** https://github.com/EESHAN3404/AYURSUTRA-Panchkarma-Management-System

## 📸 Screenshots

View the project screenshots in the [SCREENSHOTS folder](SCREENSHOTS/).

## ✨ Features

- **Authentication:** Role-based login for patients, therapists, and practitioners.
- **Patient Dashboard:** Appointment booking, therapy progress tracking, personal notes, and diet plans.
- **Therapist Dashboard:** Patient management, appointment handling, therapy notes, and daily schedules.
- **Practitioner Dashboard:** Center statistics, therapist management, patient overview, and settings.
- **Panchakarma Guide:** Information about therapy stages, benefits, and care instructions.
- **Responsive Design:** Supports desktop, tablet, and mobile devices.
- **Dark Mode:** Switch between light and dark themes.
- **Notifications:** Toast messages for user actions.

## 🛠️ Tech Stack

- React 18
- JavaScript and JSX
- Vite
- React Router DOM
- Tailwind CSS
- Chart.js and react-chartjs-2
- Lucide React
- localStorage
- Render

## 🏗️ Project Structure

```text
AYURSUTRA-Panchkarma-Management-System/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── patient/
│   │   ├── therapist/
│   │   ├── practitioner/
│   │   └── shared/
│   ├── pages/
│   ├── data/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── backend-java/
├── SCREENSHOTS/
├── ARCHITECTURE.md
├── FEATURES.md
├── Dockerfile
├── render.yaml
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or later
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/EESHAN3404/AYURSUTRA-Panchkarma-Management-System.git
cd AYURSUTRA-Panchkarma-Management-System
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

The production build is generated in the `dist` directory.

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Patient | patient@ayur.com | patient123 |
| Therapist | therapist@ayur.com | therapist123 |
| Practitioner | practitioner@ayur.com | practitioner123 |

These are demonstration credentials. Their availability depends on the current application configuration.

## 💾 Data Storage and Security

The frontend demonstration uses browser localStorage to simulate persistence for application data such as appointments, notes, authentication state, diet plans, therapist availability, and theme preferences.

**Important limitations:**

- Frontend authentication is not production-secure.
- Browser data is not shared across devices.
- Client-side route protection does not replace backend authorization.
- Do not store real patient records or sensitive medical information in this demonstration application.

The repository includes a `backend-java` directory; backend integration and database connectivity should be verified separately before claiming the deployed application is fully connected to a backend.

## 🔮 Future Enhancements

- Secure authentication and server-side role-based authorization.
- REST API and database integration.
- Appointment synchronization and conflict prevention.
- Email notifications and appointment reminders.
- Automated testing and continuous integration.
- Improved patient data privacy and access controls.

## 🌐 Deployment

The frontend is deployed on Render.

**Live Application:** https://ayursutra-panchakarma-wmo0.onrender.com/

## 📚 Documentation

- [Live Demo](https://ayursutra-panchakarma-wmo0.onrender.com/)
- [GitHub Repository](https://github.com/EESHAN3404/AYURSUTRA-Panchkarma-Management-System)
- [Screenshots](SCREENSHOTS/)
- [Architecture Documentation](ARCHITECTURE.md)
- [Feature Documentation](FEATURES.md)

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your changes.
5. Submit a pull request.

## 📄 License

Add a `LICENSE` file to specify the terms under which this project may be used and distributed.

## 👨‍💻 Author

**Eeshan Kurhe**

BE Computer Engineering | Full-Stack Development

GitHub: [@EESHAN3404](https://github.com/EESHAN3404)

---

*AyurSutra Panchakarma — A digital approach to Ayurvedic therapy center management.*
