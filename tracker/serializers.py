from .models import User, Mini_Goal, Track, Skill, Idea
from rest_framework_jwt.settings import api_settings
from rest_framework import serializers
from django.contrib.auth import authenticate

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=3, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token']
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )
        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )
        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )
        return {
            'email': user.email,
            'username': user.username,
            'token': user.token
        }

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=3, write_only=True)
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token', 'id',)
        read_only_fields = ('token',)
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance



# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username',)

# class UserSerializerWithToken(serializers.ModelSerializer):
#     token = serializers.SerializerMethodField()
#     password = serializers.CharField(write_only=True)

#     def get_token(self, obj):
#         jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#         jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

#         payload = jwt_payload_handler(obj)
#         token =  jwt_encode_handler(payload)
#         return token

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance

#     class Meta:
#         model = User
#         fields = ('token', 'username', 'password')

class MiniGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mini_Goal
        fields = '__all__'

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'