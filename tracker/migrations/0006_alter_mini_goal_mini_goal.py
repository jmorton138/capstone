# Generated by Django 3.2 on 2021-05-11 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0005_mini_goal_consistency'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mini_goal',
            name='mini_goal',
            field=models.TextField(default=None, max_length=300),
        ),
    ]