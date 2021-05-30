from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from . import views

urlpatterns = [
   path('', views.index, name="index"),
   path('register', views.register_view, name="register"),
   path('token-auth/', obtain_jwt_token),
   path('habit-list/<int:user_id>', views.habit_list, name="habit_list"),
   path('track/<int:habit_id>', views.get_track, name="track"),
   path('update/<int:user_id>/<int:habit_id>', views.update_check, name="update"),
   path('tracks', views.track_list, name="tracks"),
   path('new-habit/<int:user_id>', views.new_habit),
   path('habits', views.habits),
   path('new-skill/<int:user_id>', views.new_skill),
   path('consistency/<int:user_id>/<int:habit_id>', views.consistency),
   path('skills/<int:user_id>', views.get_skills),
   path('skills/<int:user_id>/<int:skill_id>', views.skill_view),
   path('habit/<int:user_id>/<int:habit_id>', views.get_habit),
   path('ideas/<int:user_id>', views.show_ideas),
   path('chart-habits/<int:user_id>', views.chart_habits),
   path('register-users', views.RegistrationAPIView.as_view()),
   path('user-login', views.LoginView.as_view()),
   path('user', views.UserRetrieveUpdateAPIView.as_view()),
   path('get-latest-habit/<int:user_id>', views.get_latest_habit),
   path('get-latest-skill/<int:user_id>', views.get_latest_skill)
   # path('new-user', views.new_user, name="new_user"),
   # path('login', views.login_view, name="login_view")
     # path('user-list', views.UserList.as_view()),
        # path('current_user/', views.current_user),
   # path('users', views.users),
]
 #path('login', views.login_view, name="login"),