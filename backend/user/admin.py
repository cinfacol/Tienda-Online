from django.contrib import admin
from django.contrib.auth import get_user_model

from . import models

User = get_user_model()


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'first_name',
        'last_name',
        'email',
        'is_staff',
        'is_superuser',
        'is_active',
        'last_login',
    )
    list_display_links = (
        'username',
        'first_name',
        'last_name',
        'email',
    )
    search_fields = (
        'username',
        'first_name',
        'last_name',
        'email',
        'is_staff',
        'is_superuser',
        'is_active',
        'last_login',
    )
    list_per_page = 25


admin.site.register(User, UserAdmin)
