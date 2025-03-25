from rest_framework import serializers
from .models import CalendarModel, PostModel,NotesModel,JobBoardModel,VideolinksModel,NoteRating, MentorshipModel#, EventModel
from authentication.models import User
from authentication.serializers import UserSerializer
from django.core.exceptions import ValidationError
import re
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

class NoteRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteRating
        fields = ('user', 'rating')

class NotesSerializer(serializers.ModelSerializer):
    ratings = NoteRatingSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = NotesModel
        fields = '__all__'

    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings.exists():
            total_ratings = ratings.count()
            sum_ratings = sum(rating.rating for rating in ratings)
            return sum_ratings / total_ratings
        else:
            return 0

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
        model = VideolinksModel
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        youtube_link = data.get('links', '')
        embedded_link = self.convert_to_embed_link(youtube_link)
        if embedded_link:
            data['links'] = embedded_link
        return data
    
    @staticmethod
    def convert_to_embed_link(youtube_link):
    # Regular expression pattern to extract video ID
        pattern = r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})'
    # Search for video ID in the YouTube link
        match = re.search(pattern, youtube_link)
        if match:
            video_id = match.group(1)
        # Construct embedded link
            embedded_link = f"https://www.youtube.com/embed/{video_id}"
            return embedded_link
        else:
            return None
    
    
# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EventModel
#         fields = '__all__'


class MentorshipSerializer(serializers.ModelSerializer):
    mentor = UserSerializer()
    mentee = UserSerializer()

    class Meta:
        model = MentorshipModel
        fields = '__all__'

class PDFFilesSerializer(serializers.Serializer):
    pdfs = serializers.ListField(
        child=serializers.FileField(max_length=100000, allow_empty_file=False)
    )

class QuestionSerializer(serializers.Serializer):
    question = serializers.CharField()