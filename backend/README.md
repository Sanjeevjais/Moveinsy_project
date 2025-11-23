# 🚗  Driver Sentiment Engine

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Sanjeevjais/driver-sentiment-engine.git
cd backend
npm install

### ENV FILE

PORT=8080
DB_URL=your_mongodb_connection_string
SECRET=your_jwt_secret

# Optional alert config (with defaults)
ALERT_THRESHOLD=2.5
ALERT_COOLDOWN_MINUTES=30

npm start

--------

This is the **backend server** for the **Driver Sentiment Engine**.

It powers:

- User authentication & roles (RIDER / DRIVER / ADMIN)
- Feedback collection for trips, drivers, app experience, and marshals
- Real-time style **driver sentiment analytics & alerts** for admins

The backend is built using **Node.js, Express, MongoDB**, and **JWT** authentication.  
(Real-time updates can be handled via WebSockets or polling depending on deployment.)

---

## 📺 Demo Video

Watch the full project demonstration here:  
🔗 [Video Demo]()

---

## 🚀 Features

### 1. 🔐 Authentication & Authorization

- JWT-based login & signup
- Role-based access:
  - **RIDER** – book rides, give feedback
  - **DRIVER** – publish rides, see bookings
  - **ADMIN** – access driver sentiment dashboard, view alerts
- Secure cookie support (`httpOnly`, `withCredentials`) for frontend integration

---

The Driver Sentiment Engine is a system designed to collect user feedback after trips, analyze driver performance, and automatically detect unsafe or low-performing drivers. It is intended for use in corporate mobility or ride-sharing systems where the goal is safety, reliability, and continuous feedback improvement.

This platform helps organizations proactively identify risky drivers before issues escalate and customer satisfaction drops.

🧠 What This System Does

The Driver Sentiment Engine makes feedback useful rather than just stored.

It collects feedback from riders about:

Drivers

Specific trips

The mobile application experience

Marshals (on-ground staff)

Then the system:

Calculates sentiment scores based on rating and input

Tracks performance over time

Generates insights and trends

Automatically triggers alerts when a driver's score falls below a configured threshold

Admins get a data-driven dashboard to monitor safety and take action.

🔐 Authentication & Roles

The system supports secure authentication with role-based access control:

Role	Capabilities
Rider	Submit feedback
Driver	View ride information and feedback trends
Admin	View analytics, alerts, and overall system insights

Authentication uses JWT Tokens with optional secure cookie handling for production environments.

💬 Feedback System

Users provide feedback using a configurable UI. Each entry includes:

Field	Meaning
Entity Type	DRIVER / TRIP / APP / MARSHAL
Entity ID	The specific driver, trip, app version, or marshal
Rating	Range: 1–5
Comment	Text describing the experience

All feedback is stored in MongoDB and used to generate sentiment metrics.

📊 Analytics & Dashboard

The dashboard provides:

Average sentiment score across the system

Positive / neutral / negative feedback breakdown

Driver performance ranking

Time-based trend monitoring

Warning indicators for drivers approaching risk levels

🚨 Automatic Alert System

The engine includes a built-in alert mechanism.

A driver is flagged when:

average_rating < alert_threshold


To prevent spam, alerts are regulated by:

Cooldown window

One alert per driver per timeframe

Automatic resolution when rating improves

Admins can also resolve alerts manually.
---




