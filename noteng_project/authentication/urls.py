from django.urls import path
from .views import UserRegisterAPIView, TokenObtainPairAPIView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('register', UserRegisterAPIView.as_view(), name='user-register'),
    path('token', TokenObtainPairAPIView.as_view(), name='token_obtain_pair'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
