# Generated by Django 3.2 on 2021-05-07 09:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0003_alter_skill_skill'),
    ]

    operations = [
        migrations.AddField(
            model_name='skill',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
