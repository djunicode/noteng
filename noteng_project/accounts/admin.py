from django.contrib import admin
from .models import User,Professor,Student,videolinksModel,postModel,jobBoardModel,eventModel
# Register your models here.

admin.site.register(User)
admin.site.register(Professor)
admin.site.register(Student)
admin.site.register(videolinksModel)
admin.site.register(postModel)
admin.site.register(jobBoardModel)
admin.site.register(eventModel)