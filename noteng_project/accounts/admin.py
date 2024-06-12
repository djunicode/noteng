from django.contrib import admin
from .models import Like,VideolinksModel, PostModel, JobBoardModel,  CalendarModel, NotesModel, MentorshipModel,NoteRating #, EventModel

class VideolinksModelAdmin(admin.ModelAdmin):
    list_display = ('video_id', 'user', 'subject', 'sem', 'topics')
    search_fields = ('user__email', 'subject')

class PostModelAdmin(admin.ModelAdmin):
    list_display = ('post_id', 'user', 'title', 'deadline', 'likes_count')
    search_fields = ('user__email', 'title')
    
    def likes_count(self, obj):
        return obj.likes.count()
    likes_count.short_description = 'Likes'
    
    def liked_users(self, obj):
        return ", ".join([like.user.email for like in obj.likes.all()])
    liked_users.short_description = 'Liked by'
    
class JobBoardModelAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'user', 'company', 'subtype', 'mode')
    search_fields = ('user__email', 'company')

# class EventModelAdmin(admin.ModelAdmin):
#     list_display = ('event_id', 'user', 'organised_by', 'subtype')
#     search_fields = ('user__email', 'organised_by')

class NoteRatingAdmin(admin.ModelAdmin):
    list_display = ('note', 'user', 'rating')
    search_fields = ('note__note_title', 'user__email')
    list_filter = ('rating',)

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
admin.site.register(NoteRating, NoteRatingAdmin)
admin.site.register(Like)