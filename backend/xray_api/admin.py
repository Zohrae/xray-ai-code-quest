
from django.contrib import admin
from .models import XRayImage, PredictionResult

@admin.register(XRayImage)
class XRayImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'filename', 'uploaded_at')
    search_fields = ('filename',)
    readonly_fields = ('uploaded_at',)

@admin.register(PredictionResult)
class PredictionResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'xray_image', 'is_pneumonia', 'confidence', 'created_at')
    list_filter = ('is_pneumonia',)
    readonly_fields = ('created_at',)
