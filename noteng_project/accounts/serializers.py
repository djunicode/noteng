from rest_framework import serializers
from .models import CalendarModel, PostModel,NotesModel,JobBoardModel,VideolinksModel, EventModel, MentorshipModel
from authentication.models import User

class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarModel
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = '__all__'

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotesModel
        fields = '__all__'

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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'fname', 'lname', 'contact_number', 'mentors', 'expertise']

class MentorshipSerializer(serializers.ModelSerializer):
    mentor = UserSerializer()
    mentee = UserSerializer()

    class Meta:
        model = MentorshipModel
        fields = ['mentor', 'mentee', 'start_date', 'end_date']