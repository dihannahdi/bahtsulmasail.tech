from celery import shared_task
from django.shortcuts import get_object_or_404
from .models import (
    AnalysisTask, SemanticAnalysis, ArgumentAnalysis,
    PrincipleAnalysis, DocumentSummary, KnowledgeGraphUpdate,
    SchoolComparison
)
from documents.models import Document
import logging

logger = logging.getLogger(__name__)

@shared_task
def process_semantic_analysis(task_id, parameters):
    """Process semantic analysis task"""
    try:
        task = get_object_or_404(AnalysisTask, id=task_id)
        task.status = 'processing'
        task.save()

        document = get_object_or_404(Document, id=task.document_id)
        
        # Local AI model integration for semantic analysis
        import spacy
        from transformers import AutoTokenizer, AutoModel
        import torch
        import json

        # Load IndoBERT or multilingual model (ensure downloaded in Docker build or first run)
        tokenizer = AutoTokenizer.from_pretrained('indobenchmark/indobert-base-p1')
        model = AutoModel.from_pretrained('indobenchmark/indobert-base-p1')
        nlp = spacy.blank('id')  # Use blank for Indonesian; add custom components as needed

        text = document.ocr_result.get('text', '') if hasattr(document, 'ocr_result') else ''
        # Embedding extraction
        inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)
        with torch.no_grad():
            outputs = model(**inputs)
            embedding = outputs.last_hidden_state.mean(dim=1).squeeze().tolist()

        # Topic extraction (placeholder: keyword extraction)
        doc = nlp(text)
        keywords = list(set([token.text for token in doc if token.is_alpha and not token.is_stop]))[:10]
        # Sentiment placeholder (can use rule-based or add a model)
        sentiment = {'score': 0.0, 'label': 'neutral'}

        analysis_result = {
            'topics': keywords,
            'themes': [],
            'sentiment': sentiment,
            'results': {'embedding': embedding}
        }

        # Create analysis result
        analysis = SemanticAnalysis.objects.create(
            task=task,
            topics=analysis_result['topics'],
            themes=analysis_result['themes'],
            sentiment=analysis_result['sentiment'],
            results=analysis_result['results']
        )

        task.status = 'completed'
        task.save()

        return analysis.id

    except Exception as e:
        logger.error(f"Error processing semantic analysis task {task_id}: {str(e)}")
        task.status = 'failed'
        task.error_message = str(e)
        task.save()
        raise

@shared_task
def process_argument_analysis(task_id, parameters):
    """Process argument analysis task"""
    try:
        task = get_object_or_404(AnalysisTask, id=task_id)
        task.status = 'processing'
        task.save()

        document = get_object_or_404(Document, id=task.document_id)
        
        # Local AI model integration for argument analysis
        import spacy
        from transformers import AutoTokenizer, AutoModel
        import torch

        tokenizer = AutoTokenizer.from_pretrained('indobenchmark/indobert-base-p1')
        model = AutoModel.from_pretrained('indobenchmark/indobert-base-p1')
        nlp = spacy.blank('id')  # Use blank for Indonesian; add custom components as needed

        text = document.ocr_result.get('text', '') if hasattr(document, 'ocr_result') else ''
        doc = nlp(text)
        # Simple argument extraction: sentences containing modal verbs or legal terms
        arguments = []
        evidence = []
        relationships = []
        for sent in doc.sents:
            if any(modal in sent.text.lower() for modal in ['harus', 'boleh', 'dilarang', 'wajib']):
                arguments.append({'text': sent.text})
        # Placeholder for evidence (can use NER or patterns)
        for ent in doc.ents:
            if ent.label_ in ['LAW', 'PERSON', 'ORG']:
                evidence.append({'text': ent.text, 'label': ent.label_})
        # Relationships: placeholder as empty

        analysis_result = {
            'arguments': arguments,
            'evidence': evidence,
            'relationships': relationships
        }

        # Create analysis result
        analysis = ArgumentAnalysis.objects.create(
            task=task,
            arguments=analysis_result['arguments'],
            evidence=analysis_result['evidence'],
            relationships=analysis_result['relationships']
        )

        task.status = 'completed'
        task.save()

        return analysis.id

    except Exception as e:
        logger.error(f"Error processing argument analysis task {task_id}: {str(e)}")
        task.status = 'failed'
        task.error_message = str(e)
        task.save()
        raise

@shared_task
def process_principle_analysis(task_id, parameters):
    """Process principle analysis task"""
    try:
        task = get_object_or_404(AnalysisTask, id=task_id)
        task.status = 'processing'
        task.save()

        document = get_object_or_404(Document, id=task.document_id)
        
        # TODO: Implement actual AI model integration
        analysis_result = {
            'principles': [],
            'rulings': [],
            'methodologies': [],
            'references': []
        }

        analysis = PrincipleAnalysis.objects.create(
            task=task,
            principles=analysis_result['principles'],
            rulings=analysis_result['rulings'],
            methodologies=analysis_result['methodologies'],
            references=analysis_result['references']
        )

        task.status = 'completed'
        task.save()

        return analysis.id

    except Exception as e:
        logger.error(f"Error processing principle analysis task {task_id}: {str(e)}")
        task.status = 'failed'
        task.error_message = str(e)
        task.save()
        raise

@shared_task
def process_document_summary(task_id, parameters):
    """Process document summary task"""
    try:
        task = get_object_or_404(AnalysisTask, id=task_id)
        task.status = 'processing'
        task.save()

        document = get_object_or_404(Document, id=task.document_id)
        
        # TODO: Implement actual AI model integration
        summary_result = {
            'content': '',
            'type': parameters.get('type', 'abstractive'),
            'metadata': {}
        }

        summary = DocumentSummary.objects.create(
            task=task,
            summary_type=summary_result['type'],
            content=summary_result['content'],
            metadata=summary_result['metadata']
        )

        task.status = 'completed'
        task.save()

        return summary.id

    except Exception as e:
        logger.error(f"Error processing document summary task {task_id}: {str(e)}")
        task.status = 'failed'
        task.error_message = str(e)
        task.save()
        raise

@shared_task
def process_knowledge_graph_update(task_id, parameters):
    """Process knowledge graph update task"""
    try:
        task = get_object_or_404(AnalysisTask, id=task_id)
        task.status = 'processing'
        task.save()

        document = get_object_or_404(Document, id=task.document_id)
        
        # TODO: Implement actual knowledge graph update logic
        update_result = {
            'entities': [],
            'relationships': [],
            'status': 'pending'
        }

        update = KnowledgeGraphUpdate.objects.create(
            task=task,
            entities=update_result['entities'],
            relationships=update_result['relationships'],
            status=update_result['status']
        )

        # TODO: Apply updates to the knowledge graph
        # This would typically involve interacting with a graph database
        update.status = 'applied'
        update.save()

        task.status = 'completed'
        task.save()

        return update.id

    except Exception as e:
        logger.error(f"Error processing knowledge graph update task {task_id}: {str(e)}")
        task.status = 'failed'
        task.error_message = str(e)
        task.save()
        raise

@shared_task
def process_school_comparison(task_id, parameters):
    """Process school comparison task"""
    try:
        task = get_object_or_404(AnalysisTask, id=task_id)
        task.status = 'processing'
        task.save()

        document = get_object_or_404(Document, id=task.document_id)
        comparison_document = get_object_or_404(
            Document,
            id=parameters.get('comparison_document_id')
        )
        
        # TODO: Implement actual AI model integration
        comparison_result = {
            'comparison_type': parameters.get('comparison_type', 'documents'),
            'schools': [],
            'similarities': [],
            'differences': [],
            'analysis': {}
        }

        comparison = SchoolComparison.objects.create(
            task=task,
            comparison_type=comparison_result['comparison_type'],
            schools=comparison_result['schools'],
            similarities=comparison_result['similarities'],
            differences=comparison_result['differences'],
            analysis=comparison_result['analysis']
        )

        task.status = 'completed'
        task.save()

        return comparison.id

    except Exception as e:
        logger.error(f"Error processing school comparison task {task_id}: {str(e)}")
        task.status = 'failed'
        task.error_message = str(e)
        task.save()
        raise 