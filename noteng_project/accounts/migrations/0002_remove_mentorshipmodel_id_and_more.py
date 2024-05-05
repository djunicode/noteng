# Generated by Django 5.0.2 on 2024-05-05 08:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="mentorshipmodel",
            name="id",
        ),
        migrations.AddField(
            model_name="mentorshipmodel",
            name="mentorship_id",
            field=models.AutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
