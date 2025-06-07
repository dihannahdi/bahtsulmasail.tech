# BahtsulMasail.tech: Strategic Implementation Plan & Project Roadmap

## 1. Vision & Strategic Goal

**Vision:** To establish BahtsulMasail.tech as the preeminent digital embodiment of "Bahtsul Masail untuk Islam Digdaya"—an Awwwards-caliber platform showcasing Islamic jurisprudence through exceptional design, intuitive AI, and collaborative scholarship.

**Strategic Goal for this Plan:** To bridge the critical implementation gaps between the powerful backend foundation and the stunning frontend UI, delivering a feature-complete Minimum Viable Product (MVP) within an 8-12 week timeframe. This plan prioritizes creating a live, data-driven user experience.

## 2. Guiding Principles for Implementation

To ensure a focused and efficient development cycle, we will adhere to the following principles:

- **API-First Integration:** The backend team will finalize API endpoint contracts (request/response schemas) before the frontend team begins full-scale integration. This minimizes rework.
- **Single End-to-End Flow:** Our first priority is to make one core user journey fully functional: User Uploads Document → System Processes It → User Searches for and Views It. This will resolve the biggest integration unknowns early.
- **Progressive Feature Activation:** We will build and merge features incrementally, activating them behind feature flags if necessary, to maintain a stable main branch.
- **Pragmatic AI:** We will start with proven, off-the-shelf NLP models (e.g., IndoBERT, Tesseract) to get the AI pipeline working end-to-end. Fine-tuning and custom models will be a post-MVP optimization.
- **User-Centric Validation:** Every completed feature must be viewed from the perspective of the four user roles (Admin, Mushoheh, Katib, Reader) to ensure the permissions and workflows are correct.

## 3. Current State Assessment

### Backend ✅ (Significantly Enhanced)
1. **Models**: 
   - **✅ Core models for Islamic scholarly content (CanonicalSource, QuranVerse, Hadith)**
   - **✅ Knowledge graph models (KnowledgeNode, KnowledgeEdge)**
   - **✅ Document models with enhanced fields (extracted_text, embedding, processing_status)**
   - **✅ Analysis models (AnalysisTask, SemanticAnalysis, ArgumentAnalysis, etc.)**
   - **✅ Citation and annotation models**
   - **✅ Custom User model with role-based permissions**
   - **✅ Complete Tashih workflow models (TaqrirKhass, TaqrirJamai, VerificationStatus)**

2. **Infrastructure**:
   - **✅ PostgreSQL with pgvector extension configured and operational**
   - **✅ Google Cloud Storage integration with file upload/download**
   - **✅ JWT authentication fully implemented**
   - **✅ Docker configuration for main app and Celery workers**
   - **✅ Celery task queue with Redis broker fully operational**
   - **✅ OCR processing pipeline (Tesseract with Arabic/English support)**
   - **✅ Vector embedding generation (sentence-transformers)**
   - **✅ Health check server**

3. **API Structure**:
   - **✅ Complete document upload/management endpoints**
   - **✅ Unified search API with keyword and semantic search**
   - **✅ Full Tashih workflow API endpoints**
   - **✅ Analysis-related views and serializers**
   - **✅ Role-based permission system implemented**
   - **✅ Real-time document processing status tracking**

4. **AI/NLP Pipeline**:
   - **✅ Automated document text extraction via OCR**
   - **✅ Multilingual sentence embeddings generation**
   - **✅ Vector similarity search using pgvector**
   - **✅ Full-text search with PostgreSQL SearchVector**

### Frontend ✅ (Fully Integrated)
1. **Pages**:
   - **✅ Homepage with real-time data integration**
   - **✅ About, FAQ, History pages**
   - **✅ Document management UI with real backend integration**
   - **✅ Functional authentication pages with JWT**
   - **✅ Fully operational search page with results**
   - **✅ Mushoheh dashboard for document review workflow**
   - **✅ Document review forms and status tracking**

2. **UI Components**:
   - **✅ Shadcn/ui integration**
   - **✅ Custom Islamic-themed styling**
   - **✅ Responsive design with Tailwind CSS**
   - **✅ Dark/light mode support**
   - **✅ Real-time status indicators and loading states**
   - **✅ Search result highlighting and pagination**

3. **Data Integration**:
   - **✅ React Query for efficient data fetching and caching**
   - **✅ Centralized API client with authentication**
   - **✅ Real-time document processing status polling**
   - **✅ Complete elimination of mock data**
   - **✅ Form validation and error handling**

4. **Authentication & Authorization**:
   - **✅ JWT-based authentication flow**
   - **✅ Role-based UI rendering (Admin, Mushoheh, Katib, Reader)**
   - **✅ Secure token storage and refresh**

## 4. Phased Implementation Roadmap (12-Week Target)

This roadmap is broken into five overlapping sprints, focusing on a logical sequence of dependencies.

| Phase / Sprint | Primary Focus | Timeline | Status |
|---|---|---|---|
| Sprint 1: The Great Integration | Connect Frontend/Backend; activate core document flow. | Weeks 1-4 | [x] Completed |
| Sprint 2: The Intelligence Core | Implement AI/document processing pipeline. | Weeks 3-6 | [x] Completed |
| Sprint 3: The Discovery Engine | Build functional semantic & keyword search. | Weeks 5-8 | [x] Completed |
| Sprint 4: The Scholarly Workflow | Activate the complete Tashih (verification) loop. | Weeks 7-10 | [x] Completed |
| Sprint 5: Polish & Launch Prep | End-to-end testing, optimization, and documentation. | Weeks 9-12 | [🔄] In Progress |

## 5. Detailed Sprint Breakdown

### Sprint 1: The Great Integration (Weeks 1-4)

**Goal:** Eliminate all mock data. Achieve a fully functional, end-to-end document upload, storage, and retrieval process.

**Key Outcomes:**
- A user can successfully upload a PDF/DOCX document via the frontend
- The uploaded document is stored in Google Cloud Storage
- Document metadata is saved in the PostgreSQL database
- The "Recent Documents" section on the homepage displays real data
- Users can view a list of their managed documents

**Detailed Tasks:**

**[Backend]**
- [ ] **Finalize API Contracts:** Define and document the final OpenAPI/Swagger specification for all Document, User, and Authentication endpoints
- [ ] **Implement Document Upload Logic:** Complete the `/api/documents/upload` endpoint to handle file streams, save to Google Cloud Storage, and create a corresponding Document entry in the database
- [ ] **Implement Document List/Retrieve Endpoints:** Create robust DRF ViewSets for `GET /api/documents/` and `GET /api/documents/{id}`
- [ ] **Refine Authentication:** Ensure the JWT authentication scheme is seamlessly integrated with all protected endpoints

**[Frontend]**
- [ ] **Implement API Client:** Create a centralized API client service (e.g., using Axios) with baked-in authentication headers and error handling
- [ ] **Replace Mock Data:** Systematically remove all mock data files and static JSON
- [ ] **Integrate React Query:** Implement useQuery and useMutation hooks for all data fetching (e.g., useDocuments, useUploadDocument)
- [ ] **Connect Document Upload UI:** Wire the "Upload Document" form to the useUploadDocument mutation. Implement loading states, success messages, and error feedback
- [ ] **Connect Document List UI:** Populate the document management page using the useDocuments query
- [ ] **Connect Auth Pages:** Ensure the Sign In/Sign Up pages communicate with the backend's authentication endpoints, storing the JWT securely

### Sprint 2: The Intelligence Core (Weeks 3-6)

**Goal:** Process uploaded documents to extract text, generate embeddings, and populate analysis models.

**Key Outcomes:**
- Document uploads trigger asynchronous Celery tasks
- OCR processing (Tesseract) extracts raw text from PDF/image-based documents
- Vector embeddings (IndoBERT/SentenceTransformers) are generated from the extracted text and stored in the pgvector column
- Basic metadata (e.g., author, title) is extracted and saved

**Detailed Tasks:**

**[Backend / AI]**
- [x] **Implement Document Processing Celery Task:** Create a `process_document(document_id)` Celery task that is triggered after a successful upload
- [x] **Integrate OCR:** Within the Celery task, implement a module to download the file from GCS, run it through an OCR engine (Tesseract), and save the extracted text to the Document model
- [x] **Implement Embedding Generation:** Add a step in the Celery task to pass the extracted text to a sentence-transformer model (paraphrase-multilingual-MiniLM-L12-v2) and generate a vector embedding
- [x] **Save Embeddings:** Store the generated vector in the `Document.embedding` pgvector field
- [x] **Stub Analysis Models:** For now, the Celery task will also create stub entries in SemanticAnalysis and ArgumentAnalysis to indicate processing is complete, even if detailed analysis isn't done yet

**[Frontend]**
- [x] **Display Processing Status:** On the document management page, show the real-time status of a document (e.g., "Uploading", "Processing", "Completed") by polling the backend with visual indicators

**[DevOps]**
- [x] **Deploy Celery Worker:** Update the Docker and Cloud Build configurations to deploy the Celery worker and connect it to the Redis (Memorystore) broker

**Implementation Notes:**
- Used Tesseract for OCR with Arabic and English language support
- Implemented sentence-transformers with paraphrase-multilingual-MiniLM-L12-v2 model for embeddings
- Added automatic status polling on frontend when documents are processing
- Enhanced document upload view to trigger the new comprehensive processing task
- Created database migrations for new Document fields (extracted_text, embedding)
- Updated Docker configurations with system dependencies for OCR (tesseract-ocr, poppler-utils)
- Status is updated via polling on the frontend with visual indicators and spinners

### Sprint 3: The Discovery Engine (Weeks 5-8)

**Goal:** Enable users to find relevant documents through keyword and semantic search.

**Key Outcomes:**
- The main search bar is fully functional
- Keyword search returns relevant documents based on text matching
- Semantic search returns documents that are conceptually similar, even if keywords don't match
- Search results are displayed cleanly with relevant snippets

**Detailed Tasks:**

**[Backend]**
- [x] **Implement Keyword Search Endpoint:** Create a search API endpoint that uses Django's full-text search capabilities on the extracted text fields
- [x] **Implement Vector Search Endpoint:** Create a separate API endpoint or a parameter on the main search endpoint (`?type=semantic`) that performs a vector similarity search (nearest neighbor) using pgvector
- [x] **Develop Unified Search Logic:** The primary search endpoint should be able to handle both keyword and semantic queries, and potentially blend the results

**[Frontend]**
- [x] **Connect Search UI:** Wire the search bar and search results page to the new backend search endpoints
- [x] **Render Search Results:** Display search results, including highlighting matching terms or indicating that a result is a "semantic match"
- [x] **Implement Basic Filtering:** Add simple frontend filters for search results (e.g., by date, by author), even if the backend logic is not yet faceted

**Implementation Notes:**
- Created unified `/api/documents/search/` endpoint supporting both keyword and semantic search via `type` parameter
- Implemented PostgreSQL full-text search with SearchVector and SearchRank for keyword search
- Used pgvector cosine distance for semantic search with same sentence-transformers model from Sprint 2
- Added comprehensive search serializer with snippet generation and relevance scoring
- Built fully functional search page with URL-based state management and pagination
- Added search bar to main navigation that routes to search page
- Implemented search term highlighting for keyword search results
- Added visual indicators for semantic search results with similarity scores
- Set up React Query for efficient data fetching and caching

### Sprint 4: The Scholarly Workflow (Weeks 7-10)

**Goal:** Implement the full Tashih (verification) and review workflow for scholars.

**Key Outcomes:**
- A Mushoheh (reviewer) can see a dashboard of documents awaiting review
- A Mushoheh can submit a TaqrirKhass (individual review)
- Multiple reviews can be aggregated into a TaqrirJamai (collective review)
- The verification status of a document is updated and visible throughout the UI

**Detailed Tasks:**

**[Backend]**
- [x] **Implement Tashih API Endpoints:** Build the full suite of DRF ViewSets for creating, updating, and viewing TaqrirKhass and TaqrirJamai
- [x] **Implement State Machine Logic:** Enforce the workflow rules (e.g., a document must have 2 TaqrirKhass before a TaqrirJamai can be created) at the API level
- [x] **Refine Permissions:** Double-check that only users with the Mushoheh role can perform review actions

**[Frontend]**
- [x] **Build Mushoheh Dashboard:** Create the dashboard UI for reviewers, fetching and displaying documents that need their attention
- [x] **Build Review Forms:** Develop the forms for submitting individual and collective reviews
- [x] **Integrate Workflow Status:** Display the current VerificationStatus of a document on its main view page, visible to all user roles
- [ ] **(Optional) Add Notifications:** Implement a simple notification system to alert a Mushoheh when a new document is ready for their review

### Sprint 5: Polish & Launch Prep (Weeks 9-12)

**Goal:** Ensure the platform is stable, performant, documented, and ready for a production launch.

**Key Outcomes:**
- A comprehensive suite of end-to-end and integration tests
- Optimized database queries and frontend load times
- Complete user and developer documentation
- A successful deployment to the production Google Cloud Platform environment

**Detailed Tasks:**

**[All Teams]**
- [ ] **End-to-End Testing:** Write and execute test plans covering all major user journeys
- [ ] **Performance Optimization:** Use tools like Django Debug Toolbar and Lighthouse to identify and fix performance bottlenecks
- [ ] **Accessibility (a11y) Audit:** Review the frontend to ensure it meets WCAG 2.1 AA standards
- [ ] **Cross-Browser Testing:** Test the application on major browsers (Chrome, Firefox, Safari)
- [ ] **Documentation:** Write clear user guides for each role and comprehensive developer documentation for the API

**[DevOps]**
- [ ] **Finalize Production CI/CD:** Lock down the main branch and ensure the Google Cloud Build pipeline is configured for production deployment
- [ ] **Database Backups & Monitoring:** Set up automated backups for the Cloud SQL database and monitoring/alerting for all production services

## 6. Feature Prioritization

### Must-Have Features (Sprint 1-2)
1. Document upload and management
2. Basic OCR and text extraction
3. User authentication and roles
4. Document viewing experience
5. Vector embedding generation

### High-Priority Features (Sprint 3-4)
1. Semantic and keyword search
2. Tashih workflow implementation
3. Citation detection and linking
4. Knowledge graph (basic)
5. User dashboards

### Nice-to-Have Features (Post-MVP)
1. Advanced argument visualization
2. School comparison features
3. Real-time collaboration
4. Advanced knowledge graph
5. Learning resources

## 7. Technical Requirements

### Backend
- Django 4.2+ with Django REST Framework
- PostgreSQL with pgvector extension ✅
- Celery with Redis for task queue
- Google Cloud Storage for file storage ✅
- NLP libraries (spaCy, Transformers, Tesseract)
- JWT authentication ✅

### Frontend
- Next.js 14+ with App Router ✅
- Tailwind CSS for styling ✅
- Shadcn/ui for component foundation ✅
- Framer Motion for animations ✅
- React Query for data fetching
- NextAuth.js for authentication ✅

## 8. Success Metrics

### Sprint 1 Success Criteria
- [x] 100% elimination of mock data
- [x] Successful document upload and storage
- [x] Real-time document list display
- [x] Functional authentication flow

### Sprint 2 Success Criteria
- [x] Automated document processing pipeline
- [x] Text extraction from uploaded documents
- [x] Vector embeddings stored in database
- [x] Processing status visible to users

### Sprint 3 Success Criteria
- [x] Functional search with results
- [x] Both keyword and semantic search working
- [x] Search results with proper formatting
- [x] Basic filtering capabilities

### Sprint 4 Success Criteria
- [x] Complete Tashih workflow functional
- [x] Role-based document review process
- [x] Verification status tracking
- [x] Mushoheh dashboard operational

### Sprint 5 Success Criteria
- [ ] Production-ready deployment
- [ ] Comprehensive test coverage
- [ ] Performance benchmarks met
- [ ] Complete documentation

## Conclusion

This strategic implementation plan transforms BahtsulMasail.tech from a well-architected foundation into a fully functional, production-ready platform. By following the sprint-based approach with clear deliverables and success criteria, we can achieve our goal of creating a live, data-driven Islamic jurisprudence platform within 12 weeks.

The focus on API-first integration and end-to-end flow prioritization ensures that we tackle the most critical technical challenges early, while the pragmatic AI approach allows us to deliver working intelligence features without getting bogged down in optimization.

Each sprint builds upon the previous one, creating a logical progression from basic functionality to advanced features, culminating in a polished platform ready for launch.
