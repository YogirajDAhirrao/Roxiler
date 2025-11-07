# 🌟 Roxiler Rating Platform

A **full-stack web application** for managing and rating stores — built with **React, Express, PostgreSQL, and Prisma**.

---

## 🧑‍💼 Roles Supported

* **Admin** – Manage users and stores
* **Store Owner** – View their store & customer ratings
* **Normal User** – Browse stores and rate them

---

## 🚀 Tech Stack

### 🖥️ Frontend

* **React + Vite**
* **React Router DOM**
* **TailwindCSS**
* **Context API** (for Authentication)
* **Cookie-based Auth Persistence**

### ⚙️ Backend

* **Node.js + Express**
* **PostgreSQL (via Prisma ORM)**
* **JWT Authentication** (stored in HTTP-only cookies)
* **Role-Based Access Control (RBAC)**
* **Zod** (optional) for validation

---

## 📂 Folder Structure

### 🧩 Backend (`Roxiler_rating_backend/`)

```
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── client.js
│
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── stores/
│   │   └── ratings/
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── hash.ts
│   ├── app.ts
│   └── server.ts
│
├── .env
└── package.json
```

### 🖾️ Frontend (`Roxiler_rating_frontend/`)

```
├── src/
│   ├── api/
│   │   ├── client.js
│   │   ├── auth.api.js
│   │   ├── store.api.js
│   │   └── rating.api.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Stores.jsx
│   │   └── StoreOwnerDashboard.jsx
│   ├── ui/
│   │   └── AppLayout.jsx
│   ├── App.jsx
│   └── main.jsx
│
└── tailwind.config.js
```

---

## 🧠 Features

### 👩‍💼 Admin

* Add new stores, users, and admins
* View dashboard with totals for:

  * Users
  * Stores
  * Ratings
* Filter users and stores by name/email/address
* Manage all users and stores

### 👨‍💻 Normal User

* Register / Login / Logout
* View all stores with:

  * Name
  * Address
  * Average Rating
  * Their Own Rating
* Submit or modify ratings (1–5)

### 🏪 Store Owner

* View their store and customer ratings
* See average rating for their store
* View list of users who rated their store

---

## 🔐 Authentication

* **JWT tokens** stored in **HTTP-only cookies** for enhanced security
* **Role-based access control (RBAC)** via middleware:

  * `authMiddleware` → verifies JWT & sets `req.user`
  * `roleMiddleware(["ADMIN", "STORE_OWNER"])` → restricts access
* **Persistent session** (auto-login on refresh)

---

## ⚙️ Environment Variables (`.env`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/roxiler_db"
JWT_SECRET="SuperSecretKey"
PORT=5000
```

---

## 🗃️ Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# View database in browser
npx prisma studio
```

---

## ▶️ Run Locally

### 🔧 Backend

```bash
cd Roxiler_rating_backend
npm install
npm run dev
```

### 🖥️ Frontend

```bash
cd Roxiler_rating_frontend
npm install
npm run dev
```

---

### 🌐 Visit

👉 **Frontend:** [http://localhost:5173](http://localhost:5173)
👉 **Backend:** [http://localhost:5000/api](http://localhost:5000/api)
