from rest_framework import generics,permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .models import *
from rest_framework_simplejwt.settings import api_settings
from .serializers import *
from authentication.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status


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
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Delete the associated calendar event when the instance is deleted
        calendar_event = CalendarModel.objects.filter(user=instance.user).first()
        if calendar_event:
            calendar_event.delete()
            return Response({"message": "Calendar event deleted successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Calendar event not found."}, status=status.HTTP_404_NOT_FOUND)

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
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Delete the associated calendar event when the instance is deleted
        post_event = PostModel.objects.filter(user=instance.user).first()
        if post_event:
            post_event.delete()
            return Response({"message": "Post deleted successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)


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
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

class JobBoardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobBoardModel.objects.all()
    serializer_class = JobBoardSerializer
    authentication_classes = [CustomJWTAuthentication]  
    permission_classes = [IsAuthenticated]

# class MentorshipListView(generics.ListCreateAPIView):
#     queryset = MentorshipModel.objects.all()
#     serializer_class = MentorshipSerializer
#     permission_classes = [permissions.IsAuthenticated]


# class MentorshipDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = MentorshipModel.objects.all()
#     serializer_class = MentorshipSerializer
#     permission_classes = [permissions.IsAuthenticated]