# Python base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8080 # Standard port for Cloud Run, Gunicorn will use this

# Set work directory
WORKDIR /app

# Create and activate virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install system dependencies for OCR
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-ara \
    tesseract-ocr-eng \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Download sentence-transformers model and spaCy pipeline at build time
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')"
RUN python -m spacy download xx_ent_wiki_sm || true  # Download multilingual spaCy model as fallback

# Copy project
COPY . /app/

# Collect static files with dummy SECRET_KEY for build time
ENV DJANGO_SECRET_KEY=dummy-secret-key-for-build-only
RUN python manage.py collectstatic --noinput

# Expose port (though Gunicorn below binds to $PORT)
EXPOSE 8080

# Run Gunicorn
CMD gunicorn --bind "0.0.0.0:$PORT" core.wsgi:application 