#!/usr/bin/env python
"""
Release Readiness Validation Script for Semantic Search Feature
This script checks various criteria to determine if the feature is ready for release.
"""

import os
import sys
import subprocess
from pathlib import Path
import json

def check_file_exists(file_path, description):
    """Check if a file exists and return the result."""
    exists = Path(file_path).exists()
    status = "✅" if exists else "❌"
    print(f"{status} {description}: {file_path}")
    return exists

def check_dependency_in_requirements(dependency, requirements_file="backend/requirements.txt"):
    """Check if a dependency is listed in requirements.txt."""
    try:
        with open(requirements_file, 'r') as f:
            content = f.read()
            exists = dependency in content
            status = "✅" if exists else "❌"
            print(f"{status} Dependency '{dependency}' in requirements.txt")
            return exists
    except FileNotFoundError:
        print(f"❌ Requirements file not found: {requirements_file}")
        return False

def check_docker_includes_dependency(dependency, dockerfile="backend/Dockerfile"):
    """Check if Dockerfile includes a specific dependency or installation."""
    try:
        with open(dockerfile, 'r') as f:
            content = f.read()
            exists = dependency in content
            status = "✅" if exists else "❌"
            print(f"{status} Dockerfile includes '{dependency}'")
            return exists
    except FileNotFoundError:
        print(f"❌ Dockerfile not found: {dockerfile}")
        return False

def check_environment_variable_in_cloudbuild(var_name, cloudbuild_file="cloudbuild.yaml"):
    """Check if environment variable is set in cloudbuild.yaml."""
    try:
        with open(cloudbuild_file, 'r') as f:
            content = f.read()
            exists = var_name in content
            status = "✅" if exists else "❌"
            print(f"{status} Environment variable '{var_name}' in cloudbuild.yaml")
            return exists
    except FileNotFoundError:
        print(f"❌ Cloud build file not found: {cloudbuild_file}")
        return False

def run_code_validation():
    """Validate code implementation completeness."""
    print("=" * 60)
    print("🔧 CODE IMPLEMENTATION VALIDATION")
    print("=" * 60)
    
    score = 0
    total = 0
    
    # Backend files
    backend_files = [
        ("backend/documents/models.py", "TextChunk Model"),
        ("backend/documents/views.py", "API Views"),
        ("backend/documents/serializers.py", "Serializers"),
        ("backend/documents/urls.py", "URL Configuration"),
        ("backend/documents/management/commands/process_books.py", "Management Command"),
    ]
    
    for file_path, description in backend_files:
        if check_file_exists(file_path, description):
            score += 1
        total += 1
    
    # Frontend files
    frontend_files = [
        ("frontend/components/search/SemanticSearch.tsx", "Search Component"),
        ("frontend/app/search/page.tsx", "Search Page"),
        ("frontend/app/globals.css", "Global Styles with Arabic Font"),
    ]
    
    for file_path, description in frontend_files:
        if check_file_exists(file_path, description):
            score += 1
        total += 1
    
    # Dependencies
    dependencies = [
        "pgvector",
        "sentence-transformers",
        "transformers",
        "torch",
        "pdf2image",
        "pytesseract",
    ]
    
    for dep in dependencies:
        if check_dependency_in_requirements(dep):
            score += 1
        total += 1
    
    print(f"\n📊 Code Implementation Score: {score}/{total} ({score/total*100:.1f}%)")
    return score / total

def run_deployment_validation():
    """Validate deployment configuration."""
    print("\n" + "=" * 60)
    print("🐳 DEPLOYMENT CONFIGURATION VALIDATION")
    print("=" * 60)
    
    score = 0
    total = 0
    
    # Docker configuration
    docker_checks = [
        ("sentence-transformers", "Sentence Transformers Model"),
        ("tesseract-ocr", "OCR Support"),
        ("gunicorn", "Production Server"),
    ]
    
    for item, description in docker_checks:
        if check_docker_includes_dependency(item):
            score += 1
        total += 1
    
    # Cloud build configuration
    env_vars = [
        "USE_POSTGRESQL",
        "DJANGO_SETTINGS_MODULE",
        "DB_NAME",
    ]
    
    for var in env_vars:
        if check_environment_variable_in_cloudbuild(var):
            score += 1
        total += 1
    
    # Deployment files
    deployment_files = [
        ("cloudbuild.yaml", "Cloud Build Configuration"),
        ("backend/Dockerfile", "Backend Dockerfile"),
        ("frontend/Dockerfile", "Frontend Dockerfile"),
    ]
    
    for file_path, description in deployment_files:
        if check_file_exists(file_path, description):
            score += 1
        total += 1
    
    print(f"\n📊 Deployment Configuration Score: {score}/{total} ({score/total*100:.1f}%)")
    return score / total

def run_documentation_validation():
    """Validate documentation completeness."""
    print("\n" + "=" * 60)
    print("📚 DOCUMENTATION VALIDATION")
    print("=" * 60)
    
    score = 0
    total = 0
    
    docs = [
        ("SEMANTIC_SEARCH_IMPLEMENTATION.md", "Implementation Guide"),
        ("DEPLOYMENT_INTEGRATION.md", "Deployment Guide"),
        ("PRACTICAL_USAGE_GUIDE.md", "Usage Guide"),
        ("demo_book_processing.py", "Demo Script"),
        ("SEMANTIC_SEARCH_RELEASE_CHECKLIST.md", "Release Checklist"),
    ]
    
    for file_path, description in docs:
        if check_file_exists(file_path, description):
            score += 1
        total += 1
    
    print(f"\n📊 Documentation Score: {score}/{total} ({score/total*100:.1f}%)")
    return score / total

def check_critical_blockers():
    """Check for critical blockers that prevent release."""
    print("\n" + "=" * 60)
    print("🚨 CRITICAL BLOCKERS CHECK")
    print("=" * 60)
    
    blockers = []
    
    # Check if pgvector is properly handled
    try:
        with open("backend/documents/models.py", 'r') as f:
            content = f.read()
            if "pgvector" not in content:
                blockers.append("pgvector not imported in models")
            elif "VectorField" not in content:
                blockers.append("VectorField not used in models")
            else:
                print("✅ pgvector integration in models")
    except:
        blockers.append("Cannot read models.py file")
    
    # Check if TextChunk model exists
    try:
        with open("backend/documents/models.py", 'r') as f:
            content = f.read()
            if "class TextChunk" not in content:
                blockers.append("TextChunk model not found")
            else:
                print("✅ TextChunk model exists")
    except:
        blockers.append("Cannot verify TextChunk model")
    
    # Check if semantic search endpoint exists
    try:
        with open("backend/documents/views.py", 'r') as f:
            content = f.read()
            if "semantic_search" not in content:
                blockers.append("semantic_search endpoint not found")
            else:
                print("✅ Semantic search endpoint exists")
    except:
        blockers.append("Cannot verify semantic search endpoint")
    
    # Check if process_books command exists
    process_books_path = "backend/documents/management/commands/process_books.py"
    if not Path(process_books_path).exists():
        blockers.append("process_books management command missing")
    else:
        print("✅ process_books command exists")
    
    return blockers

def generate_release_recommendation(code_score, deployment_score, docs_score, blockers):
    """Generate release recommendation based on scores and blockers."""
    print("\n" + "=" * 60)
    print("🎯 RELEASE RECOMMENDATION")
    print("=" * 60)
    
    overall_score = (code_score + deployment_score + docs_score) / 3
    
    print(f"📊 Overall Readiness Score: {overall_score:.2f}/1.00 ({overall_score*100:.1f}%)")
    print(f"   - Code Implementation: {code_score:.2f} ({code_score*100:.1f}%)")
    print(f"   - Deployment Config: {deployment_score:.2f} ({deployment_score*100:.1f}%)")
    print(f"   - Documentation: {docs_score:.2f} ({docs_score*100:.1f}%)")
    
    if blockers:
        print(f"\n🚨 Critical Blockers Found ({len(blockers)}):")
        for blocker in blockers:
            print(f"   ❌ {blocker}")
    else:
        print("\n✅ No Critical Blockers Found")
    
    print("\n" + "=" * 40)
    
    if len(blockers) > 0:
        print("🔴 STATUS: NOT READY FOR RELEASE")
        print("   Critical blockers must be resolved first")
    elif overall_score >= 0.9:
        print("🟢 STATUS: READY FOR PRODUCTION")
        print("   All major criteria met")
    elif overall_score >= 0.7:
        print("🟡 STATUS: READY FOR STAGING/BETA")
        print("   Good for limited deployment")
    else:
        print("🔴 STATUS: NOT READY FOR RELEASE")
        print("   Significant work needed")
    
    print("\n📋 Next Steps:")
    if blockers:
        print("   1. Fix critical blockers listed above")
        print("   2. Re-run validation")
    else:
        print("   1. Deploy to staging environment")
        print("   2. Enable pgvector in Cloud SQL")
        print("   3. Run database migrations")
        print("   4. Process Arabic books")
        print("   5. Test end-to-end functionality")
    
    return overall_score, len(blockers) == 0

def main():
    """Main validation function."""
    print("🚀 SEMANTIC SEARCH FEATURE - RELEASE READINESS VALIDATION")
    print("=" * 80)
    
    # Run all validations
    code_score = run_code_validation()
    deployment_score = run_deployment_validation()
    docs_score = run_documentation_validation()
    blockers = check_critical_blockers()
    
    # Generate recommendation
    overall_score, ready = generate_release_recommendation(
        code_score, deployment_score, docs_score, blockers
    )
    
    # Exit with appropriate code
    if ready and overall_score >= 0.7:
        sys.exit(0)  # Success
    else:
        sys.exit(1)  # Not ready

if __name__ == "__main__":
    main() 