# 🧠 Collaborative Task Manager

A real-time collaborative task management application built with **Next.js**, **React Query**, **Node.js**, **Express**, **Prisma**, and **Socket.IO**.

This project demonstrates **full-stack CRUD operations**, **authentication**, **role-based UI behavior**, and **real-time synchronization** between multiple users.

---

## ✨ Features

### 🔐 Authentication

* User registration & login
* HTTP-only cookie–based JWT authentication
* Protected APIs and pages

### 📝 Task Management (CRUD)

* Create, update, delete tasks
* Task fields:

  * Title
  * Description
  * Priority (LOW / MEDIUM / HIGH / URGENT)
  * Status (TODO / IN_PROGRESS / REVIEW / COMPLETED)
  * Due date
  * Creator
  * Optional assignee

### 👥 Collaboration Rules

* **Only the creator** can:

  * Edit task details
  * Delete tasks
  * Change task status
* Any user can:

  * View tasks
  * See assigned / unassigned tasks

### ⚡ Real-Time Updates

* Socket.IO broadcasts:

  * Task creation
  * Task updates
  * Task deletion
* UI updates instantly across open sessions

### 🧭 Task Views

* **All Tasks**
* **Assigned to Me**
* **Unassigned Tasks**
* Additional filtering by:

  * Status
  * Priority
  * Due date (ascending / descending)

### 🎨 UI & UX

* Dark-mode professional UI
* Skeleton loaders
* Optimistic updates (instant UI response)
* Conditional buttons (Edit / Delete shown only to creators)

---

## 🏗️ Tech Stack

### Frontend

* **Next.js (Pages Router)**
* **TypeScript**
* **Tailwind CSS**
* **React Query**
* **Socket.IO Client**

### Backend

* **Node.js**
* **Express**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **Socket.IO**
* **JWT Authentication**

---

## 🧩 Architecture Overview

```
Frontend (Next.js)
 ├─ Auth Pages (Login / Signup)
 ├─ Tasks Page (Filters, Tabs, Modals)
 ├─ Dashboard
 ├─ React Query (Data Fetching)
 └─ Socket.IO Client
        │
        ▼
Backend (Express)
 ├─ Auth Routes (login, register, me)
 ├─ Task Routes (CRUD)
 ├─ Prisma ORM
 ├─ JWT Middleware
 └─ Socket.IO Server
        │
        ▼
Database (PostgreSQL)
 ├─ User
 └─ Task
```

---

## 🔄 Real-Time Flow (Sockets)

1. User logs in → joins:

   * Personal room (`userId`)
   * Global task room (`tasks`)
2. When a task is created/updated/deleted:

   * Server emits socket events
   * All connected clients receive updates
3. React Query cache is invalidated
4. UI updates instantly without refresh

---

## 🔒 Authorization Logic

| Action        | Creator | Other Users |
| ------------- | ------- | ----------- |
| View tasks    | ✅       | ✅           |
| Create task   | ✅       | ✅           |
| Edit task     | ✅       | ❌           |
| Delete task   | ✅       | ❌           |
| Change status | ✅       | ❌           |
| Assign user   | ✅       | ❌           |

> This logic is enforced **both in backend APIs and frontend UI**.

---

## 🚫 Skipped by Design

The following were intentionally **not implemented** to keep the system clean and performant:

* Activity logs / audit tables
* Excessive socket events
* Over-engineering (roles, permissions tables)

This keeps the app **focused, maintainable, and assignment-appropriate**.

---

## ▶️ Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ensure `.env` files are configured correctly for:

* Database URL
* JWT secret
* Frontend API URL

---

## 📌 Key Learning Outcomes

* End-to-end full-stack development
* Real-time collaboration with Socket.IO
* Secure authentication & authorization
* Clean UI state management with React Query
* Production-ready code structure

---

## 🧑‍💻 Author

**Vaishali**
Full-Stack Developer
Built as part of an Internshala assignment to demonstrate real-world engineering practices.
