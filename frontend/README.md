
---

```md
# 🖥️ Carpooling System Frontend + Driver Sentiment Dashboard

This is the **frontend** for the Carpooling System and Driver Sentiment Engine.

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

## 📂 Project Structure

```txt
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
