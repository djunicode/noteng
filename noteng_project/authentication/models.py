from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, sapid, password=None, **extra_fields):
        # if not email:
        #     raise ValueError('The Email field must be set')
        # email = self.normalize_email(email)
        user = self.model(sapid=sapid, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, sapid, password=None, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(sapid, password, **extra_fields)

class User(AbstractBaseUser):
    sapid = models.CharField(max_length=11, primary_key=True)
    is_superuser= models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=10, unique=True)
    mentors = models.ManyToManyField('self', blank=True)
    expertise = models.CharField(max_length=100, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'sapid'
    
    def has_perm(self, perm, obj=None):
        return True  # Custom logic for permission checking if needed

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.sapid
    
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
