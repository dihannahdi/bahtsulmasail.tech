# Generated manually for Sprint 2 implementation

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import pgvector.django
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('file_path', models.CharField(max_length=1024)),
                ('file_size', models.BigIntegerField()),
                ('mime_type', models.CharField(max_length=127)),
                ('checksum', models.CharField(max_length=64)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_public', models.BooleanField(default=False)),
                ('metadata', models.JSONField(default=dict)),
                ('ocr_status', models.CharField(choices=[('pending', 'Pending'), ('processing', 'Processing'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending', max_length=20)),
                ('ocr_result', models.JSONField(blank=True, null=True)),
                ('extracted_text', models.TextField(blank=True, help_text='Full text extracted from the document')),
                ('embedding', pgvector.django.VectorField(blank=True, dimensions=768, help_text='Vector embedding of the document', null=True)),
                ('language', models.CharField(default='id', help_text='ISO 639-1 language code', max_length=10)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='created_documents', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ArgumentComponent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('component_type', models.CharField(choices=[('claim', 'Claim'), ('premise', 'Premise')], max_length=20)),
                ('text_span', models.TextField(help_text='The text of the argument component')),
                ('start_char', models.IntegerField(help_text='Starting character position in the document')),
                ('end_char', models.IntegerField(help_text='Ending character position in the document')),
                ('confidence_score', models.FloatField(help_text='Confidence score of extraction')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='argument_components', to='documents.document')),
            ],
        ),
        migrations.CreateModel(
            name='Citation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cited_source_identifier', models.TextField(help_text='Identifier of the cited source')),
                ('text_span', models.TextField(help_text='The text of the citation')),
                ('start_char', models.IntegerField(help_text='Starting character position in the document')),
                ('end_char', models.IntegerField(help_text='Ending character position in the document')),
                ('normalized_citation', models.TextField(help_text='Normalized/standardized form of the citation')),
                ('context', models.TextField(help_text='Surrounding context of the citation')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='citations', to='documents.document')),
            ],
        ),
        migrations.CreateModel(
            name='DocumentAnalysisStatus',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('analysis_type', models.CharField(choices=[('semantic', 'Semantic Analysis'), ('argument', 'Argument Extraction'), ('citation', 'Citation Detection'), ('knowledge_graph', 'Knowledge Graph')], max_length=20)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('processing', 'Processing'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending', max_length=20)),
                ('started_at', models.DateTimeField(blank=True, null=True)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('error_message', models.TextField(blank=True)),
                ('task_id', models.CharField(blank=True, max_length=255, null=True)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='analysis_statuses', to='documents.document')),
            ],
        ),
        migrations.CreateModel(
            name='DocumentAnnotation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('target_type', models.CharField(choices=[('text', 'Text'), ('image', 'Image'), ('page', 'Page')], max_length=20)),
                ('target_data', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_public', models.BooleanField(default=True)),
                ('tags', models.JSONField(default=list)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='annotations', to='documents.document')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='documents.documentannotation')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DocumentCrossReference',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('source_element', models.JSONField(blank=True, null=True)),
                ('target_element', models.JSONField(blank=True, null=True)),
                ('reference_type', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('notes', models.TextField(blank=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('source_document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='outgoing_references', to='documents.document')),
                ('target_document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='incoming_references', to='documents.document')),
            ],
        ),
        migrations.CreateModel(
            name='DocumentVersion',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('version_number', models.PositiveIntegerField()),
                ('file_path', models.CharField(max_length=1024)),
                ('checksum', models.CharField(max_length=64)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('change_notes', models.TextField(blank=True)),
                ('metadata', models.JSONField(default=dict)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='versions', to='documents.document')),
            ],
        ),
        migrations.CreateModel(
            name='KnowledgeGraphNode',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('node_id', models.CharField(help_text='Unique identifier for the node', max_length=255, unique=True)),
                ('label', models.CharField(help_text='Display label for the entity', max_length=255)),
                ('node_type', models.CharField(choices=[('person', 'Person'), ('organization', 'Organization'), ('location', 'Location'), ('concept', 'Concept'), ('event', 'Event'), ('other', 'Other')], help_text='Type of entity', max_length=50)),
                ('properties', models.JSONField(default=dict, help_text='Additional properties of the entity')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='SemanticTopic',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('topic_keywords', models.JSONField(help_text='List of keywords or terms that define the topic')),
                ('relevance_score', models.FloatField(help_text='Score indicating relevance of topic to document')),
                ('metadata', models.JSONField(default=dict, help_text='Additional metadata about the topic')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='semantic_topics', to='documents.document')),
            ],
        ),
        migrations.CreateModel(
            name='KnowledgeGraphEdge',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('label', models.CharField(help_text='Relationship label', max_length=255)),
                ('properties', models.JSONField(default=dict, help_text='Additional properties of the relationship')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('document', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='knowledge_graph_edges', to='documents.document')),
                ('source_node', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='outgoing_edges', to='documents.knowledgegraphnode')),
                ('target_node', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='incoming_edges', to='documents.knowledgegraphnode')),
            ],
        ),
        migrations.CreateModel(
            name='ArgumentRelation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('relation_type', models.CharField(choices=[('support', 'Support'), ('attack', 'Attack'), ('neutral', 'Neutral')], max_length=20)),
                ('confidence_score', models.FloatField(help_text='Confidence score of relation extraction')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('source_component', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='outgoing_relations', to='documents.argumentcomponent')),
                ('target_component', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='incoming_relations', to='documents.argumentcomponent')),
            ],
        ),
        # Add indexes
        migrations.AddIndex(
            model_name='document',
            index=models.Index(fields=['created_at'], name='documents_d_created_b0e8e8_idx'),
        ),
        migrations.AddIndex(
            model_name='document',
            index=models.Index(fields=['created_by'], name='documents_d_created_c8b7e8_idx'),
        ),
        migrations.AddIndex(
            model_name='document',
            index=models.Index(fields=['is_public'], name='documents_d_is_publ_f8b7e8_idx'),
        ),
        migrations.AddIndex(
            model_name='document',
            index=models.Index(fields=['ocr_status'], name='documents_d_ocr_sta_a8b7e8_idx'),
        ),
        migrations.AddIndex(
            model_name='document',
            index=models.Index(fields=['language'], name='documents_d_languag_b8b7e8_idx'),
        ),
        # Add unique constraints
        migrations.AlterUniqueTogether(
            name='documentversion',
            unique_together={('document', 'version_number')},
        ),
        migrations.AlterUniqueTogether(
            name='documentanalysisstatus',
            unique_together={('document', 'analysis_type')},
        ),
    ] 