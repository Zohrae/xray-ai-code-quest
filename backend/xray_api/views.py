
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import XRayImage, PredictionResult
from .serializers import XRayImageSerializer, PredictionResultSerializer, XRayUploadSerializer
from .model_loader import predict_pneumonia


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def analyze_xray(request):
    """
    API endpoint to upload and analyze an X-ray image.
    """
    serializer = XRayUploadSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the uploaded image
        xray_image = XRayImage(
            filename=request.FILES['image'].name,
            image=request.FILES['image']
        )
        xray_image.save()
        
        # Make prediction
        prediction_result = predict_pneumonia(xray_image.image.path)
        
        if 'error' in prediction_result:
            xray_image.delete()  # Clean up the image if prediction fails
            return Response(
                {'error': prediction_result['error']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        # Save prediction result
        prediction = PredictionResult(
            xray_image=xray_image,
            is_pneumonia=prediction_result['is_pneumonia'],
            confidence=prediction_result['confidence']
        )
        prediction.save()
        
        # Return the prediction
        serializer = PredictionResultSerializer(prediction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class XRayImageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for listing X-ray images.
    """
    queryset = XRayImage.objects.all().order_by('-uploaded_at')
    serializer_class = XRayImageSerializer


class PredictionResultViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for listing prediction results.
    """
    queryset = PredictionResult.objects.all().order_by('-created_at')
    serializer_class = PredictionResultSerializer
