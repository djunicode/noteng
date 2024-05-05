# urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('calendar', CalendarListView.as_view(), name='calendar-list'),
    path('calendar/<int:pk>', CalendarDetailView.as_view(), name='calendar-detail'),
    path('posts', PostListView.as_view(), name='post-list'),
    path('posts/<int:pk>', PostDetailView.as_view(), name='post-detail'),
    path('notes/', NotesListCreateAPIView.as_view(), name='notes-list'),
    path('notes/<int:pk>/', NotesDetailAPIView.as_view(), name='notes-detail'),
    path('videolinks/', VideolinksAPIView.as_view(), name='videolinks-list-create'),
    path('videolinks/<int:pk>/', VideolinksDetailAPIView.as_view(), name='videolinks-detail'),
    # path('events/', EventListAPIView.as_view(), name='events-list'),
    # path('events/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
    path('jobboard/', JobBoardListCreateAPIView.as_view(), name='jobboard-list-create'),
    path('jobboard/<int:pk>/', JobBoardDetailAPIView.as_view(), name='jobboard-detail'),
    # path('mentorship/', MentorshipListView.as_view(), name='mentorship-list'),
    # path('mentorship/<int:pk>/', MentorshipDetailView.as_view(), name='mentorship-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)