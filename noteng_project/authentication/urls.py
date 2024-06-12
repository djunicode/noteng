from django.urls import path
from .views import UserRegisterAPIView, TokenObtainPairAPIView,UserDetailView, ForgotPasswordAPIView, VerifyOTPAPIView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('register', UserRegisterAPIView.as_view(), name='user-register'),
    path('token', TokenObtainPairAPIView.as_view(), name='token_obtain_pair'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot-password'),
    path('verify-otp/', VerifyOTPAPIView.as_view(), name='verify-otp'),
]

