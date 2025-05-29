# 🚀 BudgetTracker

A simple full-stack budgeting application to track income and expenses.

---

## 📦 Project Structure

```
BudgetTracker/
├── backend/       # Express server (Node.js)
├── frontend/      # React frontend (Vite)
├── package.json   # Root scripts for running both
└── README.md
```

---

## 🛠️ Getting Started

Follow these steps to run the app locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/BudgetTracker.git
cd BudgetTracker
```

### 2. Install dependencies

- **Install root dependencies** (concurrently, etc.):

```bash
npm install
```

- **Install backend dependencies**:

```bash
cd backend
npm install
```

- **Install frontend dependencies**:

```bash
cd ../frontend
npm install
```

---

## ✅ Running the App

From the **root directory**, run:

```bash
npm run dev
```

This will:

- Start the **Express backend** on `http://localhost:3001`
- Start the **Vite frontend** on `http://localhost:5173`

Make sure `nodemon` is installed (it should be added in `devDependencies`).

---
