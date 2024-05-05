from rest_framework import serializers
from .models import CalendarModel, PostModel,NotesModel,JobBoardModel,VideolinksModel, EventModel, MentorshipModel
from authentication.models import User
from authentication.serializers import UserSerializer
from django.core.exceptions import ValidationError
class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarModel
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = '__all__'

        def validate_image(self, value):
            if not (value.name.lower().endswith(('.jpg', '.jpeg', '.png'))):
                raise ValidationError("Only images (JPEG, PNG) files are allowed.")
            return value

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotesModel
        fields = '__all__'

    def validate_document(self, value):
        if not (value.name.lower().endswith(('.jpg', '.jpeg', '.png', '.pdf'))):
            raise ValidationError("Only images (JPEG, PNG) and PDF files are allowed.")
        return value
class JobBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobBoardModel
        fields = '__all__'
        
class VideolinksSerializer(serializers.ModelSerializer):
    class Meta:
        model= VideolinksModel
        fields = '__all__'
    
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModel
        fields = '__all__'


class MentorshipSerializer(serializers.ModelSerializer):
    mentor = UserSerializer()
    mentee = UserSerializer()

    class Meta:
        model = MentorshipModel
        fields = ['mentorship_id', 'mentor', 'mentee', 'start_date', 'end_date']