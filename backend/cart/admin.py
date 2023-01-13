from django.contrib import admin

from .models import Cart, CartItem


class CartAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'total_items'
    )
    list_display_links = (
        'id',
        'user'
    )


class CartItemAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'cart',
        'product',
        'count'
    )
    list_display_links = (
        'id',
        'cart'
    )


admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
