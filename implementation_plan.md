# BahtsulMasail.tech Implementation Plan

## Current State Assessment

After examining the codebase, I've identified the following current state:

### Backend
1. **Models**: 
   - Core models for Islamic scholarly content (CanonicalSource, QuranVerse, Hadith)
   - Knowledge graph models (KnowledgeNode, KnowledgeEdge)
   - Document models (Document, DocumentVersion, DocumentAnnotation, DocumentCrossReference)
   - Analysis models (AnalysisTask, SemanticAnalysis, ArgumentAnalysis, etc.)
   - Citation and annotation models

2. **API Structure**:
   - Basic API endpoints defined
   - Analysis-related views and serializers
   - Document-related views and serializers

3. **Infrastructure**:
   - Docker configuration for main app and Celery
   - Celery tasks defined but implementation incomplete
   - Health check server

### Frontend
1. **Pages**:
   - Homepage with various sections
   - About, FAQ, History pages
   - Document management UI (mock data)
   - Authentication pages
   - Search page (placeholder)
   - Admin dashboard (placeholder)

2. **UI Components**:
   - Shadcn/ui integration
   - Custom Islamic-themed styling
   - Responsive design with Tailwind CSS
   - Dark/light mode support

3. **Authentication**:
   - NextAuth.js integration with mock credentials provider

## Implementation Gaps

Based on the project vision and current state, the following gaps need to be addressed:

### 1. Backend Implementation Gaps

#### Core Infrastructure
- [ ] Complete Django models for Tashih workflow (TaqrirKhass, TaqrirJamai, verification statuses)
- [ ] Implement custom user model with role-based permissions
- [ ] Set up PostgreSQL with pgvector for vector embeddings
- [ ] Configure proper authentication with JWT and role-based access control
- [ ] Implement file storage with Google Cloud Storage

#### API Endpoints
- [ ] Document upload and processing endpoints
- [ ] OCR processing pipeline
- [ ] AI analysis endpoints (semantic analysis, argument mapping, etc.)
- [ ] Search endpoints (keyword, semantic, faceted)
- [ ] Tashih workflow endpoints
- [ ] User management endpoints

#### Asynchronous Tasks
- [ ] Document processing Celery tasks
- [ ] OCR and text extraction
- [ ] AI analysis tasks
- [ ] Search indexing tasks
- [ ] Notification tasks

### 2. Frontend Implementation Gaps

#### Core Features
- [ ] Connect frontend to backend API (replace mock data)
- [ ] Implement document upload and management UI
- [ ] Build document viewing experience with typography and focus mode
- [ ] Create AI analysis visualization components
- [ ] Develop advanced search interface
- [ ] Build Tashih workflow UI

#### User Experience
- [ ] Enhance homepage with real data
- [ ] Complete admin dashboard
- [ ] Implement user profile management
- [ ] Add notifications system
- [ ] Improve accessibility and performance

## Implementation Roadmap

### Phase 1: Core Infrastructure (2 weeks) ✓
1. [x] Set up PostgreSQL with pgvector
   - [x] Update database configuration to use PostgreSQL
   - [x] Configure pgvector extension and models
   - [x] Set up vector indexes for similarity search
2. [x] Implement custom user model with roles
   - [x] Create User model extending AbstractUser
   - [x] Add role-based permissions (admin, mushoheh, katib, reader)
   - [x] Set up permission fields for Tashih workflow, documents, and analysis
   - [x] Create migrations for the custom user model
3. [x] Configure Google Cloud Storage integration
   - [x] Set up GCS settings in settings.py
   - [x] Implement custom storage classes (MediaStorage, DocumentStorage)
   - [x] Configure file access control and URL generation
4. [x] Set up proper authentication and authorization
   - [x] Frontend authentication with NextAuth.js implemented
   - [x] Backend JWT authentication with token endpoints
   - [x] JWT configuration in settings.py
5. [x] Complete Tashih workflow models
   - [x] Implement VerificationStatus model for tracking verification status
   - [x] Implement TaqrirKhass model for individual reviews/reports
   - [x] Implement TaqrirJamai model for collective reviews/reports
   - [x] Implement TaqrirJamaiReview model for tracking reviews by multiple Mushoheh
   - [x] Create migrations for the Tashih workflow models

### Phase 2: Document Management (3 weeks) *
1. Implement document upload API endpoints *
   - [ ] Create API endpoints for document upload
   - [ ] Implement file validation and processing
   - [ ] Set up document metadata extraction
2. Create OCR processing pipeline
3. Build document metadata extraction
4. Connect frontend document UI to backend
   - [x] Frontend UI for document upload and management implemented
   - [x] Document list interface with basic client-side pagination
   - [ ] Backend connection pending
5. Implement document version control

### Phase 3: AI Analysis & Knowledge Extraction (2 weeks)

**Goal:** Enable semantic search, argument mapping, citation detection, and knowledge graph generation for all uploaded documents, with all AI/NLP performed locally (no external API, no credit consumption).

**Backend:**
1. Implement Celery tasks for semantic analysis, argument extraction, citation detection, and knowledge graph updates
2. Integrate only local NLP models: HuggingFace Transformers (IndoBERT) and spaCy (Indonesian pipeline)
3. Download and cache models at Docker build time—no runtime downloads required
4. Store analysis results in dedicated models
5. Expose REST API endpoints for triggering and retrieving analysis
6. Update requirements and Dockerfiles for all dependencies and local model setup

**Frontend:**
1. Add React Query hooks and API utilities for analysis endpoints
2. Build UI components for semantic topics, arguments, citations, and knowledge graph
3. Connect frontend visualizations to analysis results

**Notes:**
- All AI/NLP runs on your own infrastructure; no external inference, API keys, or credits required.
- Supports Indonesian (default), with potential for Arabic/English if needed by adding more models.
- Ready for privacy-focused, production deployment.

### Phase 4: Search & Discovery (2 weeks)
1. Implement keyword search
2. Build semantic search with vector embeddings
3. Create faceted search filters
4. Develop knowledge graph traversal
5. Connect frontend search UI to backend

### Phase 5: Tashih Workflow (3 weeks)
1. Implement Tashih API endpoints
2. Build TaqrirKhass and TaqrirJamai pages
3. Create Mushoheh dashboard
4. Implement verification status tracking
5. Add notification system for workflow events

### Phase 6: Polish & Launch Preparation (2 weeks)
1. Comprehensive testing
2. Performance optimization
3. Accessibility improvements
4. Documentation
5. Deployment preparation

## Feature Prioritization

### Must-Have Features
1. Document upload and management
2. Basic OCR and text extraction
3. User authentication and roles
4. Document viewing experience
5. Basic search functionality

### High-Priority Features
1. Semantic analysis
2. Citation detection and linking
3. Tashih workflow
4. Knowledge graph (basic)
5. Advanced search

### Nice-to-Have Features
1. Argument visualization
2. School comparison
3. Real-time collaboration
4. Advanced knowledge graph
5. Learning resources

## Technical Requirements

### Backend
1. Django 4.2+ with Django REST Framework
2. PostgreSQL with pgvector extension
3. Celery with Redis for task queue
4. Google Cloud Storage for file storage
5. NLP libraries (spaCy, Transformers, etc.)
6. Vector database capabilities

### Frontend
1. Next.js 14+ with App Router
2. Tailwind CSS for styling
3. Shadcn/ui for component foundation
4. Framer Motion for animations
5. React Query for data fetching
6. NextAuth.js for authentication

## Additional Completed Components

### Frontend Pages and Components
- [x] About page aligned with "Narratives of Purpose" & "Islam Digdaya" vision
- [x] "History of Bahtsul Masail" page with placeholder content
- [x] FAQ page with accordion for questions and answers
- [~] Homepage with partial implementation:
  - [x] Purposeful navigation with clear visual cues
  - [x] "Narratives of Impact" sections
  - [~] Prominent semantic search bar (mockup implemented)
  - [ ] Other homepage elements pending

## Conclusion

BahtsulMasail.tech has a solid foundation with well-defined models and UI components, but significant implementation work is needed to fulfill its ambitious vision. By following this implementation plan, the project can be completed in a structured manner, prioritizing core functionality while building toward the full feature set.

The most critical gaps are in connecting the frontend to the backend, implementing the document processing pipeline, and building the AI analysis features. With focused effort on these areas, the platform can achieve its goal of becoming a preeminent digital embodiment of "Bahtsul Masail untuk Islam Digdaya."
