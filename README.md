# 📈 Trading Journal App

Trading Journal is a comprehensive web application designed to help traders log, analyze, and improve their trading performance. It provides a secure and structured environment for tracking trades, monitoring win rates, and managing user profiles.

## 🌟 Key Features

- **User Authentication**: Secure registration, login, and logout functionality using JWT tokens and password hashing (Bcrypt).
- **Trade Logging**: (Planned) Log entry/exit points, profit/loss, and trade notes.
- **Performance Analytics**: (Planned) Visual dashboards showing win rates, equity curves, and monthly performance.
- **Journaling**: (Planned) Attach notes and screenshots to individual trades for review.
- **Role-Based Security**: Secure backend API protecting user data.
- **Email Integration**: Password reset functionality using Brevo integration.

## 🛠 Technology Stack

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10)
- **Database**: PostgreSQL with [SQLAlchemy](https://www.sqlalchemy.org/) ORM
- **Containerization**: [Docker](https://www.docker.com/) & Docker Compose
- **Frontend**: Multi-Page Application (HTML, Vanilla CSS, Vanilla JavaScript)
- **Security**: OAuth2 with Password Flow + Bearer Tokens (JWT)

## 🚀 Getting Started

### Prerequisites

- Docker Desktop (Recommended)
- Git

### Quick Start with Docker

1.  **Clone the Repository**:

    ```bash
    git clone <your-repo-url>
    cd Trading_Journal
    ```

2.  **Environment Setup**:
    Create a `.env` file in the root directory.

    ```bash
    cp .env.example .env
    ```

    _(See [Docker Guide](DOCKER_GUIDE.md) for full variable list)_

3.  **Run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```

    - The API will be available at `http://localhost:8000`
    - Swagger documentation at `http://localhost:8000/docs`
    - Frontend at `frontend/index.html` (Local file access or served via web server)

For detailed setup instructions, please refer to:

- [Docker Development Guide](DOCKER_GUIDE.md)

## 📁 Project Structure

```
Trading_Journal/
├── backend/            # FastAPI Application
│   ├── app/
│   │   ├── core/       # Config & Security
│   │   ├── models/     # Database Models
│   │   ├── routes/     # API Endpoints
│   │   ├── schemas/    # Pydantic Schemas
│   │   └── services/   # Business Logic (Email, etc.)
│   └── Dockerfile      # Backend Container Config
├── frontend/           # HTML/CSS/JS Application
│   ├── js/             # Logic
│   └── pages/          # UI Views
├── docker-compose.yml  # System Orchestration
└── DOCKER_GUIDE.md     # Detailed Setup Instructions
```

## 📄 License

© 2026 Trading Journal. All rights reserved.
