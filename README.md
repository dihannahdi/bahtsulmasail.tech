# BahtsulMasail.tech

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/dihannahdi/bahtsulmasail.tech)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black)](https://nextjs.org/)
[![Django](https://img.shields.io/badge/Django-4+-green.svg)](https://www.djangoproject.com/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](CONTRIBUTING.md)

> **Bahtsul Masail untuk Islam Digdaya** - Illuminating Jurisprudence, Empowering Understanding.

A cutting-edge digital platform that transforms Islamic jurisprudence discourse through AI-powered analysis, collaborative scholarly engagement, and exceptional user experience. BahtsulMasail.tech preserves, analyzes, and presents crucial Islamic legal discussions to inspire intellectual confidence and contribute to a vibrant, forward-looking Islamic civilization.

<!-- Add a screenshot or GIF of the project in action here -->

## ✨ Key Features

- 🧠 **AI-Powered Text Analysis** - Advanced semantic analysis with argument tracing and evidence visualization
- 📚 **Smart Document Management** - Secure upload, OCR processing, metadata tagging, and version control
- 🔍 **Advanced Semantic Search** - Find relevant jurisprudential content with intelligent search capabilities  
- 🎨 **Luminous Citation Presentation** - Beautiful display of Quranic verses and Hadith references
- 🗺️ **Visual Mapping** - Interactive connections between legal rulings and precedents
- ✅ **Structured Tashih Workflow** - Dedicated verification process for scholarly review
- 👥 **Role-Based Access Control** - Secure authentication for users, verifiers (Mushohehs), and administrators
- 📱 **Responsive Design** - Masterful typography and focused reading experience across all devices

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started) (optional, for containerized development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dihannahdi/bahtsulmasail.tech.git
   cd bahtsulmasail.tech
   ```

2. **Set up the Backend (Django)**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment (Windows PowerShell)
   .\venv\Scripts\Activate.ps1
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Set up environment variables
   copy .env.example .env
   # Edit .env with your configuration
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Set up the Frontend (Next.js)**
   ```bash
   cd ../frontend
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   copy .env.example .env.local
   # Edit .env.local with your configuration
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   python manage.py runserver 0.0.0.0:8000
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Documentation: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

## 🛠️ Technology Stack

**Frontend:**
- Next.js (React, TypeScript)
- Tailwind CSS & shadcn-ui
- React Query
- NextAuth.js

**Backend:**
- Django + Django REST Framework
- PostgreSQL (Google Cloud SQL)
- Celery with Redis
- Google Cloud Storage

**Infrastructure:**
- Google Cloud Run
- Docker & Docker Compose
- Google Cloud Build (CI/CD)

## ⚙️ Configuration

### Environment Variables

Create the following environment files:

**Backend** (`backend/.env`):
```env
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
REDIS_HOST=localhost
REDIS_PORT=6379
GS_BUCKET_NAME=your-gcs-bucket-name
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Optional: Running with Docker

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d
```

## 📖 Usage Examples

### Basic Document Upload

```python
# Example API usage for document upload
import requests

url = "http://localhost:8000/api/v1/documents/"
files = {"document": open("masail_document.pdf", "rb")}
data = {"title": "Fatwa on Digital Transactions", "category": "muamalat"}

response = requests.post(url, files=files, data=data)
print(response.json())
```

### Semantic Search

```javascript
// Frontend search implementation
const searchResults = await fetch('/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: "hukum jual beli online",
    filters: { category: "muamalat" }
  })
});
```

## 📁 Project Structure

```
.
├── backend/                # Django backend application
│   ├── core/              # Core Django project configuration
│   ├── api/               # REST API endpoints
│   ├── documents/         # Document management app
│   ├── search/            # Search functionality
│   └── requirements.txt   # Python dependencies
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Next.js pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
├── docker-compose.yml     # Docker services configuration
├── cloudbuild.yaml        # Google Cloud Build CI/CD
└── README.md              # This file
```

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information about our development process, coding standards, and how to submit pull requests.

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Islamic scholars and institutions who inspire this work
- The open-source community for the amazing tools and libraries
- Contributors who help improve this platform

## 📞 Support

- 📧 Email: [support@bahtsulmasail.tech](mailto:support@bahtsulmasail.tech)
- 🐛 Issues: [GitHub Issues](https://github.com/dihannahdi/bahtsulmasail.tech/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/dihannahdi/bahtsulmasail.tech/discussions)

---

<div align="center">
  <strong>Built with ❤️ for the Islamic scholarly community</strong>
</div> 