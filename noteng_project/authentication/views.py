from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer, TokenObtainPairSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer


class UserRegisterAPIView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenObtainPairAPIView(APIView):
    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            tokens = serializer.validated_data
            return Response(tokens)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user instance.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Retrieve the user instance associated with the requesting user.
        """
        return self.request.user

    def perform_update(self, serializer):
        """
        Update the user instance associated with the requesting user.
        """
        serializer.save()
        return Response({"message": "User profile updated successfully."}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """
        Delete the user instance associated with the requesting user.
        """
        user = self.get_object()
        self.perform_destroy(user)
        return Response({"message": "User account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
