# BahtsulMasail.tech Project Progress

## I. Core Content & Interaction Features

### 1. Smart Document Management

**Backend:**
- [ ] Django models for documents (metadata, versions, relationships)
- [ ] API endpoints for document upload (PDF, DOCX, TXT, images)
- [ ] OCR & text extraction logic (Celery tasks)
- [ ] API endpoints for tagging, version management, and document retrieval

**Frontend:**
- [x] UI for document upload and management (Admin/privileged users)
  - [x] Document upload form (modal)
  - [x] File type and size validation
  - [x] Mock upload process with UI feedback
  - [x] Document list display
  - [x] Edit metadata modal
  - [x] Delete confirmation modal
  - [x] View details modal
- [ ] Document list interface with advanced filtering/sorting (Awwwards-caliber design)
  - [x] Basic list interface with advanced client-side pagination
  - [ ] Advanced filtering (by status, date range, etc.)
  - [ ] Sorting (by title, date, status)
  - [ ] Awwwards-caliber visual design and UX enhancements

### 2. AI-Powered Deep Text Analysis

**Backend (Celery Tasks & API Endpoints):**
- [ ] Implement NLP Tasks:
    - [ ] Language support (Indonesian, Arabic)
    - [ ] Topic modeling
    - [ ] Legal concept extraction (Qiyas, Istihsan, Ijtihad, etc.)
    - [ ] Quranic verse detection & linking
    - [ ] Hadith narration detection & referencing
    - [ ] Named Entity Recognition (scholars, places, texts)
    - [ ] Summarization (Future)
- [ ] Integrate vector embedding models (e.g., Sentence Transformers, OpenAI Embeddings)
- [ ] Store/query embeddings (PostgreSQL with pgvector or Qdrant)

**Frontend (Display of AI Insights):**
- [ ] "Burhan" (Proof/Evidence) Visualizations
- [ ] "Luminous Citation Presentation" for Quran/Hadith
- [ ] "Khulasah" (Essence) Cards for AI summaries

### 3. "Al-Furqan" (Advanced Search Experience)

**Backend:**
- [ ] API endpoints for:
    - [ ] Keyword search with filters
    - [ ] Semantic search (vector embeddings)
    - [ ] Faceted search (metadata & AI analysis)

**Frontend:**
- [ ] Dynamic search interface (enhancing placeholder `/search`)
- [ ] Results display: "scholarly briefs" / "insight tiles"
- [ ] Sleek, responsive faceted search filters
- [ ] "Pathways of Ijtihad" mode (visual connections)

### 4. "The Sahifah" (Document Viewing Experience)

**Frontend:**
- [ ] Dedicated document viewing component/page
- [ ] Masterful typography (Arabic & Latin)
- [ ] "Tajrīd" (Abstraction/Focus) reading mode
- [ ] Contextual UI for AI-identified concepts & related materials

### 5. "Majlis Al-Musyawarah" (Tashih Workflow)

**Backend:**
- [ ] Django models: `TaqrirKhass`, `TaqrirJamai`, Mushoheh profiles, verification statuses, roles
- [ ] API endpoints for Tashih lifecycle (create, submit, assign, review, revise, approve)

**Frontend:**
- [ ] `TaqrirKhass` pages (e.g., `/tashih/taqrir-khass/[id]/[slug]`) - Awwwards design
- [ ] Mushoheh Dashboard ("Markaz At-Tashih")
- [ ] User-friendly forms for `Taqrir` creation/editing

## II. Foundational Platform Features

### 6. "Minbar Al-Hikmah" (Homepage & Core Navigation)

**Frontend:**
- [~] Design and implement Awwwards-caliber homepage (enhancing placeholder `/`)
    - [ ] Bold typography, dynamic geometric patterns
    - [~] Prominent semantic search bar (mockup implemented, glow effect added)
    - [x] Purposeful navigation with clear visual cues (Navbar styling enhanced: active links, button colors, site title font, links updated)
    - [x] "Narratives of Impact" sections (Scholarly Quotes beautified with light theme, Testimonials removed)
    - [ ] Hero section with compelling visuals/messaging (search bar glow added)
    - [ ] Call to Action (CTA) refinement

### 7. User Authentication & Authorization

**Backend:**
- [ ] Django auth integration, custom user models (if needed)
- [ ] Role-based permissions for API endpoints

**Frontend:**
- [x] `NextAuth.js` (or similar) integration for login, registration, session management
    - [x] Mock CredentialsProvider setup
    - [x] JWT session strategy with custom callbacks (user ID, accessToken)
    - [x] Custom sign-in page (`/auth/signin`)
    - [x] `SessionProvider` wrapping the application
    - [x] Conditional Sign In/Sign Out in Navbar
    - [x] Augment `Session` and `User` types (`next-auth.d.ts`)
- [ ] Profile management UI

### 8. Admin Dashboard

**Backend:**
- [ ] APIs to support admin functionalities

**Frontend:**
- [ ] Dedicated admin interface for:
    - [ ] User management (roles, permissions)
    - [ ] Document upload/processing oversight
    - [ ] Tashih workflow management
    - [ ] System monitoring (Celery tasks - Flower or custom UI)
    - [ ] Content management for informational pages

### 9. Informational Pages

**Frontend:**
- [x] Align `AboutPage` with "Narratives of Purpose" & "Islam Digdaya" vision (extensive beautification and styling alignment done, including specific section repairs)
- [x] Create "History of Bahtsul Masail" page (placeholder content)
- [x] Create "FAQ" page (placeholder content with accordion)
- [ ] Create "Privacy Policy" page
- [ ] Create "Terms of Use" page
- [ ] Create "Contact" page

## III. Design & UI/UX Philosophy (Cross-Cutting)

- [ ] Detailed Design Work (Wireframes, Mockups, Prototypes)
- [ ] Meticulous Frontend Implementation:
    - [~] Purposeful animation & micro-interactions (GSAP/Framer Motion used, glow effect JS, homepage section animations)
    - [ ] Bespoke iconography & visual motifs
    - [x] Empowering color palette (thematic colors refined across About page, Scholarly Quotes, Navbar)
    - [x] Heavy customization of Tailwind CSS & `shadcn-ui` (globals.css updates, component-specific styling)
- [ ] Accessibility (WCAG AA/AAA) considerations
- [ ] Performance Optimization (Ongoing)

## IV. Specific Technology Integrations

- [ ] **Frontend Libraries:**
    - [ ] Deeper integration: `React Query` (or similar)
    - [ ] Utilization: GSAP/Framer Motion
    - [ ] Utilization: `shadcn-ui`
- [ ] **Backend Database:**
    - [ ] Setup and use `pgvector` in Cloud SQL
- [ ] **Celery Task Implementation:**
    - [ ] Define and implement Python functions for async tasks (OCR, NLP, etc.) 