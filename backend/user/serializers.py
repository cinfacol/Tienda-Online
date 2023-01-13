from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

# from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'get_full_name',
            'get_short_name',
            'created',
            'updated',
        )
