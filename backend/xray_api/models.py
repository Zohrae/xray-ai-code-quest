
from django.db import models
import uuid
import os


class XRayImage(models.Model):
    """
    Model to store the uploaded X-ray images.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    filename = models.CharField(max_length=255)
    image = models.ImageField(upload_to='xrays/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.filename
    
    def delete(self, *args, **kwargs):
        """
        Delete the image file when the model instance is deleted.
        """
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)


class PredictionResult(models.Model):
    """
    Model to store the prediction results for the X-ray images.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    xray_image = models.OneToOneField(XRayImage, on_delete=models.CASCADE, related_name='prediction')
    is_pneumonia = models.BooleanField()
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        status = "Pneumonia" if self.is_pneumonia else "Normal"
        return f"{status} ({self.confidence:.2f}%) - {self.xray_image.filename}"
