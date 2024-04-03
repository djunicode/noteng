from django.contrib import admin
from .models import videolinksModel,postModel,jobBoardModel,eventModel,calendarModel
# Register your models here.


admin.site.register(videolinksModel)
admin.site.register(postModel)
admin.site.register(jobBoardModel)
admin.site.register(eventModel)
admin.site.register(calendarModel)