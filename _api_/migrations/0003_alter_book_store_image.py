# Generated by Django 4.1.9 on 2024-03-14 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('_api_', '0002_book_store'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book_store',
            name='image',
            field=models.FileField(upload_to='book'),
        ),
    ]
