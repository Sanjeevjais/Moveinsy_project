# 🖥️ Driver Sentiment Dashboard

This is the **frontend** for the Driver Sentiment Engine.

It provides:

- Login / Signup experience
- Ride views (e.g. My Rides)
- Configurable Feedback UI for:
  - Driver
  - Trip
  - Mobile App
  - Marshal
- Admin Dashboard to monitor:
  - Per-driver performance
  - Global sentiment summary
  - Active alerts for low-performing drivers

Built using **React**, **Vite**, **Tailwind CSS**, and **Zustand**.

---

## 🛠 Tech Stack

- **Framework:** React 18
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Recharts
- **HTTP Client:** Axios

---

📸 UI Screenshots
<img src="https://github.com/user-attachments/assets/4a3fb0fb-cb8c-4f3d-b6fd-1009ac2bdcff" width="80%" /> <br/><br/> <img src="https://github.com/user-attachments/assets/9e857350-3e70-49fc-bd4b-05a15921f32e" width="60%" /> <br/><br/> <img src="https://github.com/user-attachments/assets/35ffafae-d261-4b4f-bff5-0364fed3bc0e" width="90%" /> <br/><br/> <img src="https://github.com/user-attachments/assets/3f8305d2-8d05-4b7e-867b-e894f93caa6b" width="90%" />


📂 Project Structure
frontend/
  src/
    api/
      axiosClient.js
      authApi.js
      configApi.js
      feedbackApi.js
    components/
      Navbar.jsx
      feedback/
        FeedbackForm.jsx
      admin/
        SummaryCards.jsx
        DriverPerformanceChart.jsx
        LowPerformingDrivers.jsx
      rides/
        UserRideTable.jsx
    pages/
      LoginPage.jsx
      SignupPage.jsx
      FeedbackPage.jsx
      AdminDashboardPage.jsx
      MyRidesPage.jsx
    routes/
      AppRoutes.jsx
    store/
      authStore.js
      configStore.js
  index.html
  vite.config.js
  tailwind.config.js
  package.json
  README.md

