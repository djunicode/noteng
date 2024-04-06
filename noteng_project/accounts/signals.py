from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import CalendarModel, PostModel

@receiver(post_save, sender=PostModel)
def create_or_update_calendar_event(sender, instance, created, **kwargs):
    if instance.is_interested:
        if created:
            # Create a new calendar event if the post is newly created and is_interested is True
            CalendarModel.objects.create(
                user=instance.user,
                date=instance.deadline,
                title=instance.title,
                description=instance.description,
                note="Automatically added from post"
            )
        else:
            # Update the calendar event if the post is updated and is_interested is True
            calendar_event = CalendarModel.objects.filter(user=instance.user, date=instance.deadline).first()
            if calendar_event:
                calendar_event.title = instance.title
                calendar_event.description = instance.description
                calendar_event.save()

@receiver(post_delete, sender=PostModel)
def delete_calendar_event(sender, instance, **kwargs):
    # Delete the associated calendar event when the post is deleted
    calendar_event = CalendarModel.objects.filter(user=instance.user, date=instance.deadline).first()
    if calendar_event:
        calendar_event.delete()
