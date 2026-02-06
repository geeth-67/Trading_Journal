# 📘 TRADING JOURNAL – Docker Development Guide

This project uses **Docker** to provide a **stable and consistent environment** (fixing Python version issues and dependency conflicts).

> ✅ **The Backend and Database run together in harmony**
> ❌ **Never run `uvicorn` manually from your local machine (unless testing outside Docker)**

---

## 🧠 Core Concept

- Docker runs your "backend" and "database" as separate services that talk to each other.
- It fixes the issue where "It works on my machine but not yours".

---

## 1️⃣ First-Time Setup Guide

Follow these steps **only once** to get started.

### ✅ Prerequisites

- Docker Desktop (**must be running**)

### 🚀 Initial Setup Steps

#### 1️⃣ Create .env file (VERY IMPORTANT)

We need to give Docker your secrets (Keys).

**Create a file named `.env` in the ROOT folder (next to `docker-compose.yml`)** and paste this:

```env
# Database Configuration (Docker Internal)
DATABASE_URL=postgresql://vishwageethanjana:password@db:5432/trading_journal
POSTGRES_USER=vishwageethanjana
POSTGRES_PASSWORD=password
POSTGRES_DB=trading_journal

# Security Config
SECRET_KEY=supersecretkey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email Config (Brevo)
BREVO_API_KEY=xkeysib-YOUR_ACTUAL_KEY_HERE
SENDER_EMAIL=your_email@example.com
```

⚠️ **Replace `BREVO_API_KEY` and `SENDER_EMAIL` with your actual values!**

---

#### 2️⃣ Clean Start

Run this to make sure no old containers are blocking us.

```bash
docker-compose down -v
```

---

#### 3️⃣ Start Docker services

```bash
docker-compose up --build
```

This will automatically:

- Download Python 3.10
- Install all libraries (psycopg2, fastapi, etc.)
- Start PostgreSQL
- Start the API at `http://localhost:8000`

---

#### 4️⃣ Verify everything is running

- **API Documentation:** `http://localhost:8000/docs`
- **Frontend Dashboard:** Open `frontend/index.html` in your browser.

---

## 2️⃣ Daily Development Guide

Use this every day.

### 🌅 Start of the day

```bash
docker-compose up
```

_(You don't need `--build` unless you added new libraries to requirements.txt)_

### 📝 Adding New Libraries

If you update `backend/requirements.txt`, you MUST rebuild:

```bash
docker-compose up --build
```

### 🌙 End of the day

```bash
docker-compose down
```

---

## 3️⃣ Troubleshooting

### Issue: "Module not found: backend"

**Solution:**
We fixed this by setting `PYTHONPATH`. Ensure your `Dockerfile` and `docker-compose.yml` match the latest version we created.

### Issue: "Database connection failed"

**Solution:**
Ensure your `DATABASE_URL` in root `.env` points to `@db:5432`, NOT `@localhost`. Inside Docker, the database is named `db`.

### Issue: "Port already in use"

**Solution:**
Check if you have another `uvicorn` running in a terminal. Close it. Docker needs port 8000.

---

## 4️⃣ Important Commands (Quick Ref)

| Goal                   | Command                                  |
| :--------------------- | :--------------------------------------- |
| **Start Services**     | `docker-compose up`                      |
| **Rebuild (New Libs)** | `docker-compose up --build`              |
| **Stop Services**      | `docker-compose down`                    |
| **Reset Database**     | `docker-compose down -v` (Deletes Data!) |

---

**Last Updated:** Today
**Maintained by:** Antigravity & User
