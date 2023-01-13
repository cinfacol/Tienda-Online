from django.contrib import admin

from product.models import (ColorProduct, DetailsProduct, ImgProduct,
                                 ItemsDetailsProduct, Product)


class ItemsDetailsProductAdmin(admin.TabularInline):
    model = ItemsDetailsProduct


class DetailsProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name'
    )
    list_display_links = (
        'id',
        'name',
    )

    inlines = [
        ItemsDetailsProductAdmin
    ]


class ImgProductAdmin(admin.TabularInline):
    model = ImgProduct


class ColorProductAdmin(admin.TabularInline):
    model = ColorProduct


class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'compare_price',
        'price',
        'quantity',
        'sold',
    )
    list_display_links = (
        'id',
        'name',
    )
    list_filter = ('category',)
    list_editable = (
        'compare_price',
        'price',
        'quantity',
    )
    search_fields = (
        'name',
        'description',
    )
    list_per_page = 25
    inlines = [
        ImgProductAdmin,
        ColorProductAdmin
    ]


admin.site.register(Product, ProductAdmin)
admin.site.register(DetailsProduct, DetailsProductAdmin)
