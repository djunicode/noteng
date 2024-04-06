# urls.py
from django.urls import path
from .views import CalendarListView, CalendarDetailView, PostListView, PostDetailView

urlpatterns = [
    path('calendar', CalendarListView.as_view(), name='calendar-list'),
    path('calendar/<int:pk>', CalendarDetailView.as_view(), name='calendar-detail'),
    path('posts', PostListView.as_view(), name='post-list'),
    path('posts/<int:pk>', PostDetailView.as_view(), name='post-detail'),
]
