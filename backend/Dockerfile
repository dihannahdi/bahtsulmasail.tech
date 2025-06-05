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

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Download IndoBERT model and spaCy Indonesian pipeline at build time
RUN python -c "from transformers import AutoTokenizer, AutoModel; AutoTokenizer.from_pretrained('indobenchmark/indobert-base-p1'); AutoModel.from_pretrained('indobenchmark/indobert-base-p1')"
RUN python -m spacy download xx_ent_wiki_sm || true  # Download multilingual spaCy model as fallback

# Copy project
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port (though Gunicorn below binds to $PORT)
EXPOSE 8080

# Run Gunicorn
CMD gunicorn --bind "0.0.0.0:$PORT" core.wsgi:application 