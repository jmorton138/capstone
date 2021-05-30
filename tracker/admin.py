from django.contrib import admin
from .models import User, Mini_Goal, Track, Skill, Idea

# Register your models here.

admin.site.register(User)
admin.site.register(Mini_Goal)
admin.site.register(Track)
admin.site.register(Skill)
admin.site.register(Idea)
