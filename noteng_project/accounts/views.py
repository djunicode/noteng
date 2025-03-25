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
from .models import NotesModel
from .serializers import NotesSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from cloudinary.uploader import upload
from django.http import JsonResponse
import cloudinary
from django.core.exceptions import ObjectDoesNotExist
import os
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.views import APIView
from .serializers import PDFFilesSerializer, QuestionSerializer
from .utils import (get_pdf_text, 
                   get_text_chunks, 
                   get_vector_store,
                   get_conversational_chain,
                   get_faiss_vector_store)
class IsAdminUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'is_admin': request.user.is_admin}, status=status.HTTP_200_OK)

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
            return User.objects.get(sapid=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found', code='user_not_found')
      
class NotesListCreateAPIView(generics.ListCreateAPIView):
    queryset = NotesModel.objects.all()
    serializer_class = NotesSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def post(self, request, *args, **kwargs):
        if 'document' in request.FILES:
            document = request.FILES['document']
            print(document)
            serializer = NotesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=self.request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Document is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        #     try:
        #         upload_result = upload(document, resource_type='auto') 
        #         document_url = upload_result['url']
        #         request.data['document'] = document_url
        #     except Exception as e:
        #         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        # return super().post(request, *args, **kwargs)

class NotesDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NotesModel.objects.all()
    serializer_class = NotesSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Get the document associated with the note
        document = instance.document

        try:
            # Delete the document using the custom Cloudinary storage
            storage = RawMediaCloudinaryStorage()
            storage.delete(document.name)

            # Delete the note instance
            instance.delete()

            return Response({"message": "Note and associated document deleted successfully."}, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

class NoteRatingCreateAPIView(generics.CreateAPIView, generics.UpdateAPIView):
    queryset = NoteRating.objects.all()
    serializer_class = NoteRatingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        note_id = self.kwargs['pk']
        note = get_object_or_404(NotesModel, pk=note_id)
        
        # Check if the user has already rated the note
        existing_rating = note.ratings.filter(user=self.request.user).first()
        if existing_rating:
            raise serializers.ValidationError("You have already rated this note.")
        
        # Save the new rating
        serializer.save(note=note, user=self.request.user)
        
    def perform_update(self, serializer):
        note_id = self.kwargs['pk']
        note = get_object_or_404(NotesModel, pk=note_id)
        
        # Retrieve the existing rating
        existing_rating = note.ratings.filter(user=self.request.user).first()
        if not existing_rating:
            raise serializers.ValidationError("You have not rated this note yet.")
        
        # Update the existing rating
        serializer.instance = existing_rating
        serializer.save()

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
        try:
            instance = self.get_object()
        except CalendarModel.DoesNotExist:
            return Response({"error": "Calendar event not found."}, status=status.HTTP_404_NOT_FOUND)
        
        instance.delete()
        return Response({"message": "Calendar event deleted successfully."}, status=status.HTTP_200_OK)

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


    
class VideolinksAPIView(generics.ListCreateAPIView):
    queryset = VideolinksModel.objects.all()
    serializer_class = VideolinksSerializer
    authentication_classes = [CustomJWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super(VideolinksAPIView, self).get_permissions()

class VideolinksDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = VideolinksModel.objects.all()
    serializer_class = VideolinksSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super(VideolinksDetailAPIView, self).get_permissions()

# class EventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = EventModel.objects.all()
#     serializer_class = EventSerializer
#     authentication_classes = [CustomJWTAuthentication]  
#     permission_classes = [IsAuthenticated]

# class EventListAPIView(generics.ListCreateAPIView):
#     queryset = EventModel.objects.all()
#     serializer_class = EventSerializer
#     authentication_classes = [CustomJWTAuthentication]  
#     permission_classes = [IsAuthenticated]
    

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

class MentorshipListView(generics.ListCreateAPIView):
    queryset = MentorshipModel.objects.all()
    serializer_class = MentorshipSerializer
    permission_classes = [permissions.IsAuthenticated]


class MentorshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MentorshipModel.objects.all()
    serializer_class = MentorshipSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProcessPDFsView(APIView):
    def post(self, request):
        serializer = PDFFilesSerializer(data=request.data)
        if serializer.is_valid():
            pdf_files = request.FILES.getlist('pdfs')
            raw_text = get_pdf_text(pdf_files)
            text_chunks = get_text_chunks(raw_text)
            get_vector_store(text_chunks)
            return Response({"message": "PDFs processed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AskQuestionView(APIView):
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            user_question = serializer.validated_data['question']
            new_db = get_faiss_vector_store()
            docs = new_db.similarity_search(user_question)
            chain = get_conversational_chain()
            response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
            return Response({"reply": response["output_text"]})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)