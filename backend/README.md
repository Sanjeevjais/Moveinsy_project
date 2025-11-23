# 🚗 Carpooling System Backend + Driver Sentiment Engine

This is the **backend server** for the **Carpooling System** and the **Driver Sentiment Engine**.

It powers:

- Ride creation, discovery, and joining
- User authentication & roles (RIDER / DRIVER / ADMIN)
- Feedback collection for trips, drivers, app experience, and marshals
- Real-time style **driver sentiment analytics & alerts** for admins

The backend is built using **Node.js, Express, MongoDB**, and **JWT** authentication.  
(Real-time updates can be handled via WebSockets or polling depending on deployment.)

---

## 📺 Demo Video

Watch the full project demonstration here:  
🔗 [Video Demo](https://drive.google.com/drive/folders/1TDNILCOFfVENKyc-CCbK3V-lNyYy4pZm?usp=drive_link)

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

### 2. 🚙 Ride Management

- Create a ride with:
  - driver details
  - vehicle details
  - pickup & dropoff locations
  - departure time, fare, available seats
  - ride preferences (women-only, music, AC, pets, smoking, luggage)
- Manage passengers:
  - `approved_passengers` array
  - `pending_passengers` array
- Ride status lifecycle:
  - `ACTIVE` → `IN_PROGRESS` → `RIDE_FINISHED` / `CANCELLED`

---

### 3. 💬 Feedback & Driver Sentiment Engine

- Collects feedback for multiple entities:
  - `DRIVER`
  - `TRIP`
  - `APP` (mobile app experience)
  - `MARSHAL` (on-ground ops staff)
- Each feedback includes:
  - `entityType` (DRIVER / TRIP / APP / MARSHAL)
  - `entityId` (e.g. driver user `_id` for DRIVER)
  - `rating` (1–5)
  - `comment` (free text)
  - `createdBy` (optional reference to User)
- Efficient aggregation pipelines to compute:
  - overall sentiment summary
  - per-driver average rating & feedback counts
- API endpoints:
  - `POST /feedback` – submit feedback
  - `GET /feedback/sentiment-summary` – global sentiment stats
  - `GET /admin/drivers/stats` – per-driver analytics for admin dashboard

---

### 4. 🚨 Alert System for Risky Drivers

- Automatic detection of **low-performing drivers** whose average score drops below a configurable threshold (e.g. `2.5/5`)
- `Alert` model stores:
  - driver
  - average rating at alert time
  - threshold
  - total feedback at alert time
  - status: `OPEN` / `RESOLVED`
  - timestamps (`createdAt`, `resolvedAt`, `lastNotifiedAt`)
- Alert behavior:
  - On every `DRIVER` feedback:
    - Recompute driver’s average rating
    - If below threshold → **raise or update alert**
    - If above threshold → **auto-resolve existing alerts**
  - Cooldown to avoid spam:
    - No repeated alerts for same driver within X minutes (`ALERT_COOLDOWN_MINUTES`)
- Endpoints:
  - `GET /feedback/alerts` – list recent alerts (OPEN first)
  - `PATCH /feedback/alerts/:id/resolve` – admin manually resolves an alert

---

### 5. ⚙️ Configurable Thresholds & Feature Flags

- `/config` endpoint can expose:
  - `feedbackFlags` – enable/disable feedback types (Driver / Trip / App / Marshal) without code changes
  - `alertThreshold` – can be changed at runtime or via environment variables
- Designed so frontend can build a **configurable Feedback UI** and **Admin Dashboard** using this config.

---

### 6. 🧠 Design & Implementation Notes (Plus Points)

- **Authentication** – secure JWT with role-based authorization; cookies supported.
- **Time & Space Efficiency**
  - MongoDB aggregations for:
    - per-driver stats
    - sentiment summary
  - Uses incremental updates (only aggregates on the driver being updated) instead of recomputing all drivers.
- **Failure Handling**
  - Controllers wrap logic in `try/catch` with appropriate HTTP status codes.
  - Separation of concerns between feedback, analytics, and alerts makes recovery simpler.
- **OOP & Modularity**
  - Separate Mongoose models: `User`, `Ride`, `Feedback`, `Alert`.
  - Controller modules encapsulate specific responsibilities:
    - `feedback.controller`
    - `feedbackAnalytics.controller`
    - `auth.controller`
    - `ride.controller`
- **Trade-offs**
  - Real-time behavior is simulated via fast HTTP + MongoDB aggregation; a queue/stream (Kafka/SQS) could be plugged in later if volume grows.
  - Alert system stores alerts in DB for auditability instead of purely in memory/cache.
- **Monitoring & Observability** (extendable)
  - API design supports adding logs/metrics for:
    - number of alerts
    - distribution of ratings per driver
  - Can be plugged into tools like Prometheus/Grafana, ELK, etc.
- **Caching Ready**
  - Clear boundaries around read-heavy endpoints (e.g., `/admin/drivers/stats`, `/feedback/sentiment-summary`) make them easy to cache later (Redis, in-memory cache).

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas or local)
- **Auth:** JWT (with cookies support)
- **ORM:** Mongoose

---
### ENV FILE

```
PORT=8080
DB_URL=your_mongodb_connection_string
SECRET=your_jwt_secret

# Optional alert config (with defaults)
ALERT_THRESHOLD=2.5
ALERT_COOLDOWN_MINUTES=30
```

