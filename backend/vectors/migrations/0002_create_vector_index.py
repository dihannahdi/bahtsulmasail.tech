from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('vectors', '0001_initial'),
    ]
    
    operations = [
        migrations.RunSQL(
            sql="""
            CREATE INDEX embedding_vector_idx ON vectors_embedding USING ivfflat (embedding vector_cosine_ops)
            WITH (lists = 100);
            """,
            reverse_sql="DROP INDEX IF EXISTS embedding_vector_idx;"
        ),
    ]