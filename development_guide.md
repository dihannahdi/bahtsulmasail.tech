# BahtsulMasail.tech Development Guide

This guide is intended for developers who want to contribute to the BahtsulMasail.tech project. It provides instructions for setting up the development environment, understanding the codebase, and contributing to the project.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Development Environment Setup](#development-environment-setup)
3. [Architecture Overview](#architecture-overview)
4. [Backend Development](#backend-development)
5. [Frontend Development](#frontend-development)
6. [Testing](#testing)
7. [Contribution Guidelines](#contribution-guidelines)
8. [Troubleshooting](#troubleshooting)

## Project Overview

BahtsulMasail.tech is a platform for Islamic jurisprudence discussions with advanced features like AI-powered analysis, document management, and scholarly collaboration. The project uses a modern tech stack with Django for the backend and Next.js for the frontend.

### Key Features
- Smart Document Management
- AI-Powered Deep Text Analysis
- Advanced Search Experience
- Document Viewing Experience
- Tashih Workflow (verification workflow)
- User Authentication & Authorization

## Development Environment Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose (optional, but recommended)
- Git
- Google Cloud SDK (optional, for cloud services integration)

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/bahtsulmasail.tech.git
   cd bahtsulmasail.tech
   ```

2. **Set up Python virtual environment**:
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   .\venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   DEBUG=True
   SECRET_KEY=your_secret_key
   DATABASE_URL=sqlite:///db.sqlite3
   REDIS_URL=redis://localhost:6379/0
   GCS_BUCKET_NAME=your-local-bucket-name
   ```

5. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser**:
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the `frontend` directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

### Docker Setup (Optional)

If you prefer to use Docker for development:

1. **Build and start the containers**:
   ```bash
   docker-compose up -d --build
   ```

2. **Run migrations**:
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

3. **Create a superuser**:
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

## Architecture Overview

### Backend Architecture

The backend is built with Django and Django REST Framework, organized into several apps:

- **core**: Contains core models, settings, and configurations
- **api**: Contains API endpoints, serializers, and views
- **documents**: Handles document management functionality
- **users**: (To be implemented) User management and authentication

The backend uses Celery with Redis for asynchronous tasks, particularly for document processing and AI analysis.

### Frontend Architecture

The frontend is built with Next.js using the App Router, organized as follows:

- **app**: Contains pages and layouts using the App Router structure
- **components**: Reusable UI components
- **lib**: Utility functions and hooks
- **public**: Static assets

The frontend uses Tailwind CSS for styling, shadcn/ui for UI components, and NextAuth.js for authentication.

## Backend Development

### Project Structure

```
backend/
├── api/                  # API app
│   ├── migrations/
│   ├── models.py         # Analysis models
│   ├── serializers.py    # API serializers
│   ├── views.py          # API views
│   └── urls.py           # API URLs
├── core/                 # Core app
│   ├── models.py         # Core models
│   ├── settings.py       # Django settings
│   └── urls.py           # Root URLs
├── documents/            # Documents app
│   ├── models.py         # Document models
│   ├── serializers.py    # Document serializers
│   ├── views.py          # Document views
│   └── urls.py           # Document URLs
├── manage.py             # Django management script
└── requirements.txt      # Python dependencies
```

### Key Models

- **Document**: Core document model for storing document metadata
- **DocumentVersion**: Model for tracking document versions
- **AnalysisTask**: Base model for all AI analysis tasks
- **CanonicalSource**: Model for canonical Islamic sources
- **KnowledgeNode/KnowledgeEdge**: Models for knowledge graph

### Adding a New API Endpoint

1. **Define the model** (if needed):
   ```python
   # api/models.py
   class NewModel(models.Model):
       name = models.CharField(max_length=255)
       description = models.TextField()
       created_at = models.DateTimeField(auto_now_add=True)
   ```

2. **Create a serializer**:
   ```python
   # api/serializers.py
   class NewModelSerializer(serializers.ModelSerializer):
       class Meta:
           model = NewModel
           fields = ['id', 'name', 'description', 'created_at']
   ```

3. **Create a view**:
   ```python
   # api/views.py
   class NewModelViewSet(viewsets.ModelViewSet):
       queryset = NewModel.objects.all()
       serializer_class = NewModelSerializer
       permission_classes = [permissions.IsAuthenticated]
   ```

4. **Add URL patterns**:
   ```python
   # api/urls.py
   router.register(r'new-models', NewModelViewSet)
   ```

### Creating a Celery Task

```python
# api/tasks.py
from celery import shared_task

@shared_task
def process_document(document_id):
    # Task implementation
    document = Document.objects.get(id=document_id)
    # Process document
    return {'status': 'success', 'document_id': document_id}
```

## Frontend Development

### Project Structure

```
frontend/
├── app/                  # Next.js App Router
│   ├── about/            # About page
│   ├── admin/            # Admin dashboard
│   ├── auth/             # Authentication pages
│   ├── documents/        # Document pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # UI components
│   ├── ui/               # shadcn/ui components
│   ├── common/           # Common components
│   └── home/             # Homepage components
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   └── api.ts            # API client
├── public/               # Static assets
└── package.json          # Node.js dependencies
```

### Key Components

- **MainLayout**: Root layout with navigation and theme
- **DocumentCard**: Card component for displaying document information
- **SearchBar**: Search input component
- **ThemeToggle**: Theme toggle button

### Adding a New Page

1. **Create a new directory in the app folder**:
   ```
   frontend/app/new-feature/
   ```

2. **Create a page component**:
   ```tsx
   // frontend/app/new-feature/page.tsx
   'use client'
   
   import { useState } from 'react'
   import { Button } from '@/components/ui/button'
   
   export default function NewFeaturePage() {
     const [data, setData] = useState([])
     
     return (
       <div className="container mx-auto py-8">
         <h1 className="text-3xl font-bold mb-4">New Feature</h1>
         <Button>Click Me</Button>
       </div>
     )
   }
   ```

3. **Add the page to navigation** (if needed):
   ```tsx
   // frontend/components/common/Navbar.tsx
   // Add a new link to the navigation
   <Link href="/new-feature" className="nav-link">
     New Feature
   </Link>
   ```

### API Integration

Use React Query for data fetching:

```tsx
// Example component with API integration
'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchDocuments, createDocument } from '@/lib/api'
import { Button } from '@/components/ui/button'

export default function DocumentsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments
  })
  
  const mutation = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      // Handle success
    }
  })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {data.map(doc => (
          <li key={doc.id}>{doc.title}</li>
        ))}
      </ul>
      <Button onClick={() => mutation.mutate({ title: 'New Document' })}>
        Add Document
      </Button>
    </div>
  )
}
```

## Testing

### Backend Testing

1. **Run tests**:
   ```bash
   python manage.py test
   ```

2. **Create a test**:
   ```python
   # api/tests.py
   from django.test import TestCase
   from .models import NewModel
   
   class NewModelTestCase(TestCase):
       def setUp(self):
           NewModel.objects.create(name="Test Model", description="Test Description")
       
       def test_model_creation(self):
           model = NewModel.objects.get(name="Test Model")
           self.assertEqual(model.description, "Test Description")
   ```

### Frontend Testing

1. **Run tests**:
   ```bash
   npm test
   ```

2. **Create a test**:
   ```tsx
   // __tests__/components/Button.test.tsx
   import { render, screen } from '@testing-library/react'
   import { Button } from '@/components/ui/button'
   
   describe('Button', () => {
     it('renders correctly', () => {
       render(<Button>Click Me</Button>)
       expect(screen.getByText('Click Me')).toBeInTheDocument()
     })
   })
   ```

## Contribution Guidelines

### Code Style

- **Backend**: Follow PEP 8 guidelines for Python code
- **Frontend**: Follow the project's ESLint and Prettier configuration

### Git Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**:
   ```bash
   git commit -m "Add your feature description"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a pull request**

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Ensure all tests pass
- Follow the code style guidelines
- Keep changes focused and atomic

## Troubleshooting

### Common Backend Issues

1. **Database migration conflicts**:
   ```bash
   python manage.py migrate --fake
   python manage.py migrate
   ```

2. **Celery not processing tasks**:
   - Ensure Redis is running
   - Check Celery worker logs
   - Verify task registration

### Common Frontend Issues

1. **Next.js build errors**:
   - Check for TypeScript errors
   - Verify import paths
   - Check for missing dependencies

2. **API connection issues**:
   - Verify API URL in environment variables
   - Check CORS configuration in backend
   - Verify authentication tokens

---

This development guide should help you get started with contributing to the BahtsulMasail.tech project. If you have any questions or need further assistance, please reach out to the project maintainers.