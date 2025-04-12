
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import analyze_xray, XRayImageViewSet, PredictionResultViewSet

# Create a router for ViewSets
router = DefaultRouter()
router.register(r'xrays', XRayImageViewSet)
router.register(r'predictions', PredictionResultViewSet)

# URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('analyze/', analyze_xray, name='analyze-xray'),
]
