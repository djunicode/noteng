from django.db import models
from authentication.models import User,Professor,Student


class videolinksModel(models.Model):
    sapid=models.ForeignKey(User,on_delete=models.CASCADE)
    subject=models.CharField(max_length=100)
    sem=models.IntegerField()
    topics=models.CharField(max_length=100)
    links=models.URLField()
    video_id=models.AutoField(primary_key=True)

class postModel(models.Model):
    postType= [
          ('Job','job_board'),
          ('Event','event')]
    sapid=models.ForeignKey(User,on_delete=models.CASCADE)
    post_id=models.AutoField(primary_key=True)
    title=models.TextField()
    deadline=models.DateTimeField()
    post_url=models.URLField()
    description=models.TextField()
    likes=models.PositiveIntegerField()
    type=models.CharField(max_length=10,choices= postType)
    is_interested=models.BooleanField(default=False)
    date_updated=models.DateField(auto_now=True)
    date_uploaded=models.DateField(auto_now=True)

class jobBoardModel(postModel):
    jobsubtype=[
        ('internship','internship'),
        ('Job','job')
    ]
    status=[
        ('Offline','offline'),
        ('Online','online')
    ]
    job_id=models.AutoField(primary_key=True)
    company=models.CharField(max_length=50)
    subtype=models.CharField(max_length=10,choices=jobsubtype)
    mode=models.CharField(max_length=10,choices=status)
    
class eventModel(postModel):
    organizer=[
        ('college','college'),
        ('commitee','commitee')
    ]
    eventType=[
        ('hackathon','hackathon'),
        ('cultural','cultural'),
        ('datathon','datathon'),
        ('startup','startup')
    ]
    event_id=models.AutoField(primary_key=True)
    organised_by=models.CharField(max_length=50,choices=organizer)
    subtype=models.CharField(max_length=20,choices=eventType)

class notesModel(models.Model):
    rating_choices = [
        (1, 'One Star'),
        (2, 'Two Stars'),
        (3, 'Three Stars'),
        (4, 'Four Stars'),
        (5, 'Five Stars'),
    ]
    note_id = models.IntegerField(primary_key=True)
    note_title = models.TextField()
    note_description = models.TextField()
    subject= models.TextField()
    department = models.CharField(max_length = 100)
    rating = models.IntegerField(choices=rating_choices)
    document = models.FileField(upload_to='documents/')
    sapid=models.ForeignKey(User,on_delete=models.CASCADE)

class calendarModel(models.Model):
    calendar_id = models.AutoField(primary_key=True)
    sapid = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=100)
    description = models.TextField()
    note = models.TextField()