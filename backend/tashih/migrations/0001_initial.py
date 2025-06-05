from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('documents', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VerificationStatus',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_final', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name_plural': 'Verification Statuses',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='TaqrirKhass',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('review_notes', models.TextField(blank=True)),
                ('review_date', models.DateTimeField(blank=True, null=True)),
                ('metadata', models.JSONField(default=dict)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='created_taqrir_khass', to='users.user')),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='taqrir_khass', to='documents.document')),
                ('reviewer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviewed_taqrir_khass', to='users.user')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tashih.verificationstatus')),
            ],
            options={
                'verbose_name_plural': 'Taqrir Khass',
                'ordering': ['-created_at'],
                'indexes': [models.Index(fields=['document'], name='tashih_taqr_documen_e5c9a9_idx'), models.Index(fields=['created_by'], name='tashih_taqr_created_c7d7a9_idx'), models.Index(fields=['reviewer'], name='tashih_taqr_reviewe_a8a1a9_idx'), models.Index(fields=['status'], name='tashih_taqr_status_9a4e1c_idx'), models.Index(fields=['created_at'], name='tashih_taqr_created_f2c0a9_idx')],
            },
        ),
        migrations.CreateModel(
            name='TaqrirJamai',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('metadata', models.JSONField(default=dict)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='created_taqrir_jamai', to='users.user')),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='taqrir_jamai', to='documents.document')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tashih.verificationstatus')),
                ('taqrir_khass', models.ManyToManyField(related_name='taqrir_jamai', to='tashih.taqrirkhass')),
            ],
            options={
                'verbose_name_plural': 'Taqrir Jamai',
                'ordering': ['-created_at'],
                'indexes': [models.Index(fields=['document'], name='tashih_taqr_documen_e5c9a9_idx'), models.Index(fields=['created_by'], name='tashih_taqr_created_c7d7a9_idx'), models.Index(fields=['status'], name='tashih_taqr_status_9a4e1c_idx'), models.Index(fields=['created_at'], name='tashih_taqr_created_f2c0a9_idx')],
            },
        ),
        migrations.CreateModel(
            name='TaqrirJamaiReview',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('review_notes', models.TextField(blank=True)),
                ('review_date', models.DateTimeField(auto_now_add=True)),
                ('is_approved', models.BooleanField(default=False)),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
                ('taqrir_jamai', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tashih.taqrirjamai')),
            ],
            options={
                'unique_together': {('taqrir_jamai', 'reviewer')},
                'indexes': [models.Index(fields=['taqrir_jamai', 'reviewer'], name='tashih_taqr_taqrir__e5c9a9_idx'), models.Index(fields=['review_date'], name='tashih_taqr_review__c7d7a9_idx'), models.Index(fields=['is_approved'], name='tashih_taqr_is_appr_a8a1a9_idx')],
            },
        ),
        migrations.AddField(
            model_name='taqrirjamai',
            name='reviewers',
            field=models.ManyToManyField(related_name='reviewed_taqrir_jamai', through='tashih.TaqrirJamaiReview', to='users.user'),
        ),
    ]