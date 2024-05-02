from rest_framework import generics,permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .models import *
from rest_framework_simplejwt.settings import api_settings
from .serializers import *
from authentication.models import User


class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
            return User.objects.get(sapid=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found', code='user_not_found')
        
class CalendarListView(generics.ListCreateAPIView):
    queryset = CalendarModel.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

class CalendarDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CalendarModel.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

class PostListView(generics.ListCreateAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print("Queryset count:", self.queryset.count())
        return super().get(request, *args, **kwargs)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

class NotesListCreateAPIView(generics.ListCreateAPIView):
    queryset = NotesModel.objects.all()
    serializer_class = NotesSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

class NotesDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NotesModel.objects.all()
    serializer_class = NotesSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]
    
class VideolinksAPIView(generics.ListCreateAPIView):
    queryset = VideolinksModel.objects.all()
    serializer_class = VideolinksSerializer
    permission_classes = [permissions.IsAdminUser]

class VideolinksDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = VideolinksModel.objects.all()
    serializer_class = VideolinksSerializer
    permission_classes = [permissions.IsAdminUser]


class EventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventModel.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

class EventListAPIView(generics.ListCreateAPIView):
    queryset = EventModel.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]
    

class JobBoardListCreateAPIView(generics.ListCreateAPIView):
    queryset = JobBoardModel.objects.all()
    serializer_class = JobBoardSerializer
    permission_classes = [permissions.IsAuthenticated]

class JobBoardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobBoardModel.objects.all()
    serializer_class = JobBoardSerializer
    permission_classes = [permissions.IsAuthenticated]

class MentorshipListView(generics.ListCreateAPIView):
    queryset = MentorshipModel.objects.all()
    serializer_class = MentorshipSerializer

class MentorshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MentorshipModel.objects.all()
    serializer_class = MentorshipSerializer