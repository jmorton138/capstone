from django.db import models
from django.contrib.auth.models import AbstractUser
import jwt
#thinkster adds
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username
    
    @property
    def token(self):
        return self._generate_jwt_token()

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')



# Create your models here.
# class User(AbstractUser):
#     pass

class Skill(models.Model):
    skill = models.TextField(max_length=100)
    start_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str_(self):
         return self.skill
         
class Mini_Goal(models.Model):
    mini_goal = models.TextField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    start_date = models.DateTimeField(auto_now_add=True)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, null=True)
    skilltext = models.TextField(max_length=100, null=True)
    consistency = models.FloatField(null=True)
 
     
    # def save(self, **kwargs):
    #     super(Mini_Goal, self).save(**kwargs)
    #     track = Track(mini_goal=self)
    #     track.save()

    def __str_(self):
        return self.mini_goal
#   block = models.ForeignKey(Block, on_delete= models.CASCADE)
#   skill = models.ForeignKey(Skill, on_delete=models.CASCADE)

class Idea(models.Model):
    mini_goal = models.TextField(max_length=300)
    skilltext = models.TextField(max_length=100, null=True)
    
    def __str_(self):
        return self.mini_goal

class Track(models.Model):
    mini_goal = models.ForeignKey(Mini_Goal, on_delete=models.CASCADE)
    d1 = models.BooleanField(default= False)
    d2 = models.BooleanField(default= False)
    d3 = models.BooleanField(default = False)
    d4 = models.BooleanField(default= False)
    d5 = models.BooleanField(default= False)
    d6 = models.BooleanField(default= False)
    d7 = models.BooleanField(default= False)

# class Block(models.Model):
#     block_number = models.IntegerField(default=0)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
#     date = models.DateTimeField(auto_now_add=True)


