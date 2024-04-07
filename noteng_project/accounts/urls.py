# urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import CalendarListView, CalendarDetailView, PostListView, PostDetailView, NotesDetailAPIView, NotesListCreateAPIView

urlpatterns = [
    path('calendar', CalendarListView.as_view(), name='calendar-list'),
    path('calendar/<int:pk>', CalendarDetailView.as_view(), name='calendar-detail'),
    path('posts', PostListView.as_view(), name='post-list'),
    path('posts/<int:pk>', PostDetailView.as_view(), name='post-detail'),
    path('notes/', NotesListCreateAPIView.as_view(), name='notes-list'),
    path('notes/<int:pk>/', NotesDetailAPIView.as_view(), name='notes-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)