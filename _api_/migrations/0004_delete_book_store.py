# Generated by Django 4.1.9 on 2024-03-25 09:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('_api_', '0003_alter_book_store_image'),
    ]

    operations = [
        migrations.DeleteModel(
            name='book_store',
        ),
    ]