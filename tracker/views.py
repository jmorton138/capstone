from django.shortcuts import render
from django.urls import reverse
from .models import User, Mini_Goal, Track, Skill, Idea
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from rest_framework.views import APIView
from .serializers import (
    MiniGoalSerializer, TrackSerializer, SkillSerializer, IdeaSerializer, RegistrationSerializer, LoginSerializer, UserSerializer
)
from datetime import datetime, timedelta
from django.utils import timezone
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .renderers import UserJSONRenderer
from rest_framework.generics import RetrieveUpdateAPIView

# Create your views here.

now = timezone.now()
class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer
    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})
        serializer = self.serializer_class(
            request.user, data=serializer.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    renderer_classes = (UserJSONRenderer,)
    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


def index(request):
    # skilltime = True
    # habittime = False
    if request.method=="GET":
        skill = ''
        try:
            habit = Mini_Goal.objects.filter(user=request.user).latest('start_date')
            one_week_after = habit.start_date + timedelta(days=7)
    
            if now < one_week_after:
                habittime = False
            else:
                habittime = True
        except:
            habittime = True
        
        try:
            skill = Skill.objects.filter(user=request.user).latest('start_date')
            four_weeks_after = skill.start_date + timedelta(days=28)
            if now < four_weeks_after:
                skilltime = False
            else:
                skilltime = True
        except:
            skilltime = True
            habittime = False
        return render(request, "tracker/index.html", {
        "skilltime": skilltime, "habittime": habittime, "skill": skill
        })


@api_view(['GET'])
def get_latest_habit(request, user_id):
    user = User.objects.get(id=user_id)
    habit = Mini_Goal.objects.filter(user=user).latest('start_date')
    serializer = MiniGoalSerializer(habit, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_latest_skill(request, user_id):
    user = User.objects.get(id=user_id)
    skill = Skill.objects.filter(user=user).latest('start_date')
    serializer = SkillSerializer(skill, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return HttpResponseRedirect(reverse("index"))

def register_view(request):
    return render(request, "tracker/register.html")

@api_view(['GET'])
def habits(request):
    habits=Mini_Goal.objects.all()
    serializer = MiniGoalSerializer(habits, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def chart_habits(request, user_id):
    user = User.objects.get(id = user_id)
    habits = Mini_Goal.objects.filter(user=user).order_by('id')
    serializer = MiniGoalSerializer(habits, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def habit_list(request, user_id):
    user = User.objects.get(id = user_id)
    skill = Skill.objects.filter(user=user).latest('start_date')
    habits = Mini_Goal.objects.filter(user=user, skill=skill).order_by('-id')
    serializer = MiniGoalSerializer(habits, many=True)
    return Response(serializer.data)

def get_track(request, habit_id): 
    mini_goal = Mini_Goal.objects.get(id=habit_id)
    checkboxes = Track.objects.filter(mini_goal=mini_goal)
    serializer = TrackSerializer(checkboxes, many=True)
    return JsonResponse(serializer.data, safe=False)
 

@api_view(['PUT'])
def update_check(request, habit_id, user_id):
    user = User.objects.get(id = user_id)
    mini_goal = Mini_Goal.objects.filter(id=habit_id, user=user)
    track = Track.objects.get(mini_goal__in=mini_goal)
    serializer = TrackSerializer(instance=track, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data) 


@api_view(['GET'])
def track_list(request):
    tracks = Track.objects.all().order_by('id')
    serializer = TrackSerializer(tracks, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def consistency(request, user_id, habit_id):
    user = User.objects.get(id = user_id)
    habit = Mini_Goal.objects.get(id=habit_id, user=user)
    serializer = MiniGoalSerializer(instance=habit, data=request.data)
    if serializer.is_valid():
         serializer.save()
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_habit(request, user_id, habit_id):
    user = User.objects.get(id = user_id)
    habit = Mini_Goal.objects.filter(user=user, id=habit_id)
    serializer = MiniGoalSerializer(habit, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def new_habit(request, user_id):
    user = User.objects.get(id = user_id)
    # get skill
    skill = Skill.objects.filter(user=user).latest('start_date')
    minigoal = Mini_Goal.objects.create(user=user, skill=skill, skilltext=skill.skill)
    serializer = MiniGoalSerializer(data=request.data, instance=minigoal)
    if serializer.is_valid():
        serializer.save()
    track = Track.objects.create(mini_goal=minigoal)
    if Idea.objects.filter(mini_goal=minigoal.mini_goal).exists():
        return Response(serializer.data)
    else:
        idea = Idea.objects.create(mini_goal=minigoal.mini_goal, skilltext=skill.skill)
    return Response(serializer.data)
    


@api_view(['POST'])
def new_skill(request, user_id):
    user = User.objects.get(id = user_id)
    skill = Skill.objects.create(user = user)
    serializer = SkillSerializer(data=request.data, instance = skill)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def get_skills(request, user_id):
    user = User.objects.get(id = user_id)
    skills = Skill.objects.filter(user=user)
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def skill_view(request,user_id ,skill_id):
    user = User.objects.get(id=user_id)
    skill = Skill.objects.get(user=user, id=skill_id)
    habit = Mini_Goal.objects.filter(skill=skill)
    serializer = MiniGoalSerializer(habit, many=True)
    #serializer = SkillSerializer(skill, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def show_ideas(request, user_id):
    user = User.objects.get(id = user_id)
    skill = Skill.objects.filter(user=user).latest('start_date')
    ideas = Idea.objects.filter(skilltext=skill.skill)
    serializer = IdeaSerializer(ideas, many=True)
    return Response(serializer.data)