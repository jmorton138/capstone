from pathlib import Path
from datetime import datetime, timedelta
import os
import django_heroku

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ip28jc1wnq2a%85xbs2p*)sa*&#cxc469x=%q5fmf7dl7s)yqk'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['glacial-springs-43992.herokuapp.com', '127.0.0.1']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'tracker',
    'rest_framework',
    'corsheaders', 
    'rest_framework.authtoken',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'finalproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'finalproject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
#AUTH_USER_MODEL = 'tracker.User'

#AUTHENTICATION_BACKENDS = ('django.contrib.auth.backends.ModelBackend',)


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# REST_FRAMEWORK = {
#     'DEFAULT_PERMISSION_CLASSES': (
#         'rest_framework.permissions.IsAuthenticated',
#     ),
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework.authentication.TokenAuthentication',
#         'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
#         'rest_framework.authentication.SessionAuthentication',
#         'rest_framework.authentication.BasicAuthentication',
#     ),
# }

CORS_ORIGIN_WHITELIST = [

    "http://127.0.0.1:8000",

]

# JWT_AUTH = {
#     'JWT_RESPONSE_PAYLOAD_HANDLER': 'finalproject.utils.my_jwt_response_handler',
#     #'JWT_AUTH_HEADER_PREFIX': 'Token',
# }
AUTH_USER_MODEL = 'tracker.User'


REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'tracker.exceptions.core_exception_handler',
    'NON_FIELD_ERRORS_KEY': 'error',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'tracker.backends.JWTAuthentication',
    ),
}

django_heroku.settings(locals())
# SIMPLE_JWT = {
 
#      # Use JWT 
#      'AUTH_HEADER_TYPES': ('JWT',),
# }
# CORS_ALLOW_CREDENTIALS = True

# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(days=15),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=15),
# }

# {
#     "user": {
#         "email": "geoff@example.com",
#         "password": "geoff"
#     }
# } eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiZXhwIjoxNjI3Mjk2NTM3fQ._PSVYzbp-V78nlKfDlwykfUy_q2wI7C_md_KZicEBUU



# django-cors-headers==3.7.0
#   - Django [required: >=2.2, installed: 3.2]
#     - asgiref [required: >=3.3.2,<4, installed: 3.3.4]
#       - typing-extensions [required: Any, installed: 3.7.4.3]
#     - pytz [required: Any, installed: 2021.1]
#     - sqlparse [required: >=0.2.2, installed: 0.4.1]
# djangorestframework==3.12.4
#   - django [required: >=2.2, installed: 3.2]
#     - asgiref [required: >=3.3.2,<4, installed: 3.3.4]
#       - typing-extensions [required: Any, installed: 3.7.4.3]
#     - pytz [required: Any, installed: 2021.1]
#     - sqlparse [required: >=0.2.2, installed: 0.4.1]
# djangorestframework-jwt==1.11.0
#   - PyJWT [required: >=1.5.2,<2.0.0, installed: 1.7.1]