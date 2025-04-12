
from rest_framework import serializers
from .models import XRayImage, PredictionResult


class XRayImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the XRayImage model.
    """
    class Meta:
        model = XRayImage
        fields = ('id', 'filename', 'image', 'uploaded_at')
        read_only_fields = ('id', 'uploaded_at')


class PredictionResultSerializer(serializers.ModelSerializer):
    """
    Serializer for the PredictionResult model.
    """
    xray_image = XRayImageSerializer(read_only=True)
    
    class Meta:
        model = PredictionResult
        fields = ('id', 'xray_image', 'is_pneumonia', 'confidence', 'created_at')
        read_only_fields = ('id', 'created_at')


class XRayUploadSerializer(serializers.Serializer):
    """
    Serializer for uploading an X-ray image for prediction.
    """
    image = serializers.ImageField()
    
    def validate_image(self, value):
        """
        Validate that the uploaded file is an image.
        """
        # Validate file format
        valid_extensions = ['jpg', 'jpeg', 'png', 'bmp', 'dicom', 'dcm']
        ext = value.name.split('.')[-1].lower()
        
        if ext not in valid_extensions:
            raise serializers.ValidationError(
                f"Unsupported file format. Supported formats: {', '.join(valid_extensions)}"
            )
            
        # Validate file size (max 10MB)
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("Image file too large (> 10MB)")
            
        return value
