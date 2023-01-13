from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('djoser.social.urls')),
    path('api/category/', include('category.urls')),
    path("api/product/", include("product.urls")),
    path("api/cart/", include("cart.urls")),
    path("api/shipping/", include("shipping.urls")),
    path("api/orders/", include("orders.urls")),
    path("api/payment/", include("payment.urls")),
    path("api/coupons/", include("coupons.urls")),
    path("api/profile/", include("user_profile.urls")),
    path("api/wishlist/", include("wishlist.urls")),
    path("api/reviews/", include("reviews.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
