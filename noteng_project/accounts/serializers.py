from rest_framework import serializers
from .models import CalendarModel, PostModel,NotesModel,JobBoardModel

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