from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, sapid, email, fname, lname, contact_number, password=None, **extra_fields):
        
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(sapid=sapid, email=email, fname=fname, lname=lname, contact_number=contact_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, sapid, email, fname, lname, contact_number, password=None, **extra_fields):
       
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(sapid, email, fname, lname, contact_number, password, **extra_fields)

class User(AbstractBaseUser):
    sapid = models.CharField(max_length=11,primary_key=True)
    is_admin = models.BooleanField(default=False)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=10, unique=True)
    mentor = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name='mentees')
    expertise = models.CharField(max_length=100, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email
    
class Professor(User):
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)

class Student(User):
    YEAR_CHOICES = [
        ('First Year', 'First Year'),
        ('Second Year', 'Second Year'),
        ('Third Year', 'Third Year'),
        ('Fourth Year', 'Fourth Year'),
    ]
    
    current_year = models.CharField(max_length=20, choices=YEAR_CHOICES)
    branch = models.CharField(max_length=100)
