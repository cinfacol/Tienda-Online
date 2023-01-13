from rest_framework import serializers

from .models import (ColorProduct, DetailsProduct, ImgProduct,
                     ItemsDetailsProduct, Product)


class ImgProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgProduct
        fields = [
            'id',
            'name',
            'alt_text',
            'created_at',
            'get_thumbnail'
        ]


class ItemsDetailsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemsDetailsProduct
        fields = [
            'id',
            'item'
        ]


class ColorProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorProduct
        fields = '__all__'


class DetailsProductSerializer(serializers.ModelSerializer):
    item = ItemsDetailsProductSerializer(
        many=True, read_only=True, source='item_detail')

    class Meta:
        model = DetailsProduct
        fields = [
            'id',
            'name',
            'item'
        ]


class ProductSerializer(serializers.ModelSerializer):
    images = ImgProductSerializer(
        many=True, read_only=True, source='prod_images')
    details = DetailsProductSerializer(
        many=True, read_only=True, source='prod_details')
    color = ColorProductSerializer(
        many=True, read_only=True, source='product_color')

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'compare_price',
            'category',
            'quantity',
            'sold',
            'date_created',
            'images',
            'details',
            'color',
        ]
