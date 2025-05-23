# BahtsulMasail.tech

**Tagline:** Bahtsul Masail untuk Islam Digdaya. (Sub-tagline: Illuminating Jurisprudence, Empowering Understanding.)

## Core Vision

BahtsulMasail.tech aims to be the preeminent digital embodiment of "Bahtsul Masail untuk Islam Digdaya." It is envisioned as an Awwwards-caliber platform where the depth, dynamism, and intellectual rigor of Islamic jurisprudence are showcased through exceptional design, intuitive AI-powered tools, and collaborative scholarly engagement. The platform seeks to preserve, analyze, and present these crucial discussions in a way that inspires intellectual confidence, fosters enlightened understanding, and contributes to a vibrant, forward-looking Islamic civilization.

## Technology Stack

*   **Frontend:** Next.js (React, TypeScript), Tailwind CSS, shadcn-ui (as a foundation), React Query, NextAuth.js (planned)
*   **Backend:** Django + Django REST Framework (Python)
*   **Database:** PostgreSQL (Google Cloud SQL)
*   **Asynchronous Tasks:** Celery with Redis (Google Memorystore for Redis)
*   **File Storage:** Google Cloud Storage (GCS)
*   **Deployment:** Google Cloud Run, orchestrated by Google Cloud Build (CI/CD)
*   **Containerization:** Docker

## Key Features (Envisioned)

*   **The "Minbar Al-Hikmah" (Pulpit of Wisdom):** Empowering homepage & intuitive navigation.
*   **Smart Document Management:** Secure upload, OCR, metadata tagging, and version control for Bahtsul Masail documents.
*   **AI-Powered Deep Text Analysis:**
    *   "Burhan" (Proof/Evidence) Visualizations: Tracing arguments and evidence.
    *   Luminous Citation Presentation: Quranic verses and Hadith.
    *   "Khulasah" (Essence) Cards: AI-generated summaries.
*   **"Al-Furqan" (The Criterion/Distinguisher):** Advanced semantic search experience.
*   **"Pathways of Ijtihad" Mode:** Visual mapping of connections between rulings.
*   **The "Sahifah" (Scroll/Page):** Masterful typography and a focused reading experience.
*   **"Majlis Al-Musyawarah" (The Council of Consultation):** Structured Tashih (verification) workflow for scholarly review, with dedicated Taqrir Khass pages.
*   **User Authentication & Authorization:** Role-based access for users, Mushohehs (verifiers), and Admins.

## Prerequisites for Local Development

*   [Python](https://www.python.org/) (version 3.10+ recommended, check `backend/Dockerfile` for version used in deployment)
*   [Node.js](https://nodejs.org/) (version 18+ recommended, check `frontend/Dockerfile` for version used in deployment)
*   [Docker](https://www.docker.com/) & Docker Compose (Optional, but helpful for managing local services like Postgres/Redis if not using cloud instances for dev)
*   [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (Optional, for manual gcloud commands, local connection to cloud services like Cloud SQL Proxy)
*   Git

## Setup and Installation (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dihannahdi/bahtsulmasail.tech.git
    cd bahtsulmasail.tech
    ```

2.  **Backend Setup (`/backend` directory):**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Create and activate a Python virtual environment:
        ```bash
        # For Windows PowerShell:
        python -m venv venv
        .\venv\Scripts\Activate.ps1
        # For Linux/macOS:
        # python3 -m venv venv
        # source venv/bin/activate
        ```
    *   Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    *   **Environment Variables (Backend):**
        Create a `.env` file in the `backend/` directory. This file is ignored by Git. For local development, you might use local instances of Postgres and Redis, or connect to your cloud instances (e.g., via Cloud SQL Proxy).
        Example `backend/.env` (adapt as needed):
        ```env
        # For local SQLite (default if cloud vars not set in settings.py)
        # No specific DB vars needed if using local SQLite

        # Example for local PostgreSQL if you set it up:
        # DB_NAME=your_local_db_name
        # DB_USER=your_local_db_user
        # DB_PASSWORD=your_local_db_password
        # DB_HOST=localhost
        # DB_PORT=5432

        # Example for local Redis:
        # REDIS_HOST=localhost
        # REDIS_PORT=6379

        # Django Secret Key (generate a new one for local dev if needed)
        DJANGO_SECRET_KEY='your-strong-local-secret-key-here'
        DJANGO_DEBUG=True

        # For GCS (optional for local dev, can use local media storage)
        # GS_BUCKET_NAME=your-gcs-bucket-name 
        # GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/gcp-service-account-key.json
        ```
        *Note: In production on Cloud Run, these are set as environment variables and secrets directly in the Cloud Run service configuration.*
    *   Run initial database migrations (if using a local Postgres or connecting to cloud and it\'s empty):
        ```bash
        python manage.py makemigrations
        python manage.py migrate
        ```

3.  **Frontend Setup (`/frontend` directory):**
    *   Navigate to the frontend directory:
        ```bash
        cd ../frontend 
        # or from root: cd frontend
        ```
    *   Install Node.js dependencies:
        ```bash
        npm install
        # or if you prefer yarn:
        # yarn install
        ```
    *   **Environment Variables (Frontend):**
        Create a `.env.local` file in the `frontend/` directory. This file is ignored by Git.
        Example `frontend/.env.local`:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1 
        # Change if your backend runs on a different port/path locally
        ```

## Running Locally

1.  **Start the Backend Django Development Server:**
    *   In the `backend/` directory (with virtual environment activated):
        ```bash
        python manage.py runserver 0.0.0.0:8000 
        # Or just `python manage.py runserver`
        ```
    *   The backend API should be accessible at `http://localhost:8000`.

2.  **Start the Frontend Next.js Development Server:**
    *   In the `frontend/` directory:
        ```bash
        npm run dev
        # or if using yarn:
        # yarn dev
        ```
    *   The frontend should be accessible at `http://localhost:3000` (or another port if 3000 is busy).

3.  **Start Celery Worker (for asynchronous tasks, if developing features that use it):**
    *   In the `backend/` directory (with virtual environment activated):
        ```bash
        celery -A core worker -l info
        ```
    *   This requires a Redis instance to be running and configured in `settings.py` (or via env vars).

## Environment Variables Overview

The application relies on several environment variables, especially for production deployment. These are managed via Cloud Run service configuration and Google Secret Manager.

**Backend (`core.settings.py`):**
*   `DJANGO_SECRET_KEY`: Django\'s secret key for cryptographic signing. **(Managed by Secret Manager in Prod)**
*   `DJANGO_DEBUG`: Set to `True` for local development, `False` for production.
*   `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `CLOUD_SQL_CONNECTION_NAME` (for Cloud Run) or `DB_HOST`, `DB_PORT` (for local/proxy): PostgreSQL connection details. `DB_PASSWORD` **(Managed by Secret Manager in Prod)**.
*   `REDIS_HOST`, `REDIS_PORT`: Redis connection details for Celery.
*   `GS_BUCKET_NAME`: Google Cloud Storage bucket name for media file uploads.
*   `GOOGLE_APPLICATION_CREDENTIALS` (implicitly used by GCS library if set, for local dev with GCS).

**Frontend (`.env.local` or build-time variables):**
*   `NEXT_PUBLIC_API_URL`: The base URL for the backend API.

## Deployment

This project is configured for continuous integration and deployment (CI/CD) to **Google Cloud Run** using **Google Cloud Build**. The deployment pipeline is defined in `cloudbuild.yaml`.

Key Google Cloud services used in deployment:
*   Google Cloud Run (for hosting frontend, backend, and Celery services)
*   Google Cloud SQL (PostgreSQL)
*   Google Memorystore for Redis
*   Google Cloud Storage (GCS)
*   Google Artifact Registry (for Docker images)
*   Google Secret Manager (for sensitive credentials)
*   Serverless VPC Access Connector (for Cloud Run to access Redis/SQL privately)

## Project Structure

```
.
├── backend/                # Django backend application
│   ├── core/               # Core Django project (settings, main urls, wsgi, celery)
│   ├── api/                # Django app for API endpoints
│   ├── venv/               # Python virtual environment (ignored by Git)
│   ├── Dockerfile          # Dockerfile for Django backend
│   ├── Dockerfile.celery   # Dockerfile for Celery worker
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend application
│   ├── src/                # Main source code (pages, components, etc.)
│   ├── public/             # Static assets
│   ├── node_modules/       # Node.js dependencies (ignored by Git)
│   └── Dockerfile          # Dockerfile for Next.js frontend
├── .github/workflows/      # (Optional) GitHub Actions workflows
├── cloudbuild.yaml         # Google Cloud Build configuration
├── README.md               # This file
└── .gitignore              # Specifies intentionally untracked files that Git should ignore
```

## Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

---

This README provides a good starting point. You can expand it further as the project develops. 