from datetime import datetime

from django.conf import settings
from django.db import models

from category.models import Category

domain = settings.DOMAIN


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    compare_price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(
        Category, related_name='prod_category', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name


class ImgProduct(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='photos/%Y/%m')
    alt_text = models.CharField(max_length=255)
    product = models.ForeignKey(
        Product, blank=True, null=True, related_name='prod_images', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    def get_thumbnail(self):
        if self.image:
            return self.image.url
        return ''

    class Meta:
        verbose_name = ('product image')
        verbose_name_plural = ('product images')
        ordering = ('created_at',)

    def __str__(self):
        return self.alt_text


""" class ColorType(DjangoChoices):
    blanco = ChoiceItem('whithe')
    negro = ChoiceItem('black') """


class ColorProduct(models.Model):
    name = models.CharField(max_length=20, blank=True, null=True)
    product = models.ForeignKey(
        Product, blank=True, null=True, related_name='product_color', on_delete=models.CASCADE)
    data = models.JSONField()

    def __str__(self):
        return self.name


class DetailsProduct(models.Model):
    name = models.CharField(max_length=100)
    product = models.ForeignKey(
        Product, blank=True, null=True, related_name='prod_details', on_delete=models.CASCADE)

    class Meta:
        verbose_name = ('detail')
        verbose_name_plural = ('details')

    def __str__(self):
        return self.name


class ItemsDetailsProduct(models.Model):
    item = models.CharField(max_length=100)
    details_product = models.ForeignKey(
        DetailsProduct, blank=True, null=True, related_name='item_detail', on_delete=models.CASCADE)

    def __str__(self):
        return self.item
