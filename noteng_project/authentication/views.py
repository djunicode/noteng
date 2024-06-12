from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ForgotPasswordSerializer, SignupSerializer, TokenObtainPairSerializer, VerifyOTPSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework import status
from django.core.mail import send_mail
from django.utils import timezone
from .utils import send_otp_via_email


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

class ForgotPasswordAPIView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                user.generate_otp()
                send_otp_via_email(email, user.otp)
                return JsonResponse({"message": "OTP sent to email."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return JsonResponse({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPAPIView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            new_password = serializer.validated_data['new_password']
            try:
                user = User.objects.get(email=email)
                if user.otp == otp and (timezone.now() - user.otp_created_at).total_seconds() < 300:
                    user.set_password(new_password)
                    user.otp = None
                    user.otp_created_at = None
                    user.save()
                    return Response({"message": "Password change successful."}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)