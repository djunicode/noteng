from django.contrib import admin
from .models import VideolinksModel, PostModel, JobBoardModel,  CalendarModel, NotesModel, MentorshipModel#, EventModel

class VideolinksModelAdmin(admin.ModelAdmin):
    list_display = ('video_id', 'user', 'subject', 'sem', 'topics')
    search_fields = ('user__email', 'subject')

class PostModelAdmin(admin.ModelAdmin):
    list_display = ('post_id', 'user', 'title', 'deadline', 'likes')
    search_fields = ('user__email', 'title')

class JobBoardModelAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'user', 'company', 'subtype', 'mode')
    search_fields = ('user__email', 'company')

# class EventModelAdmin(admin.ModelAdmin):
#     list_display = ('event_id', 'user', 'organised_by', 'subtype')
#     search_fields = ('user__email', 'organised_by')

class NotesModelAdmin(admin.ModelAdmin):
    list_display = ('note_id', 'user', 'note_title', 'subject', 'department')
    search_fields = ('user__email', 'note_title')

class CalendarModelAdmin(admin.ModelAdmin):
    list_display = ('calendar_id', 'user', 'date', 'title')
    search_fields = ('user__email', 'title')

class MentorshipModelAdmin(admin.ModelAdmin):
    list_display = ('mentorship_id', 'mentor', 'mentee', 'start_date', 'end_date')
    search_fields = ('mentor', 'mentee')

admin.site.register(VideolinksModel, VideolinksModelAdmin)
admin.site.register(PostModel, PostModelAdmin)
admin.site.register(JobBoardModel, JobBoardModelAdmin)
# admin.site.register(EventModel, EventModelAdmin)
admin.site.register(CalendarModel, CalendarModelAdmin)
admin.site.register(NotesModel, NotesModelAdmin)
admin.site.register(MentorshipModel, MentorshipModelAdmin)