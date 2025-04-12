
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model as keras_load_model
from tensorflow.keras.preprocessing import image
from django.conf import settings

# Global variables to store the model
MODEL = None
MODEL_LOADED = False

def load_model():
    """
    Load the trained pneumonia detection model.
    """
    global MODEL, MODEL_LOADED
    
    if MODEL_LOADED:
        return MODEL
    
    try:
        model_path = settings.MODEL_PATH
        if os.path.exists(model_path):
            MODEL = keras_load_model(model_path)
            MODEL_LOADED = True
            print("Successfully loaded pneumonia detection model.")
        else:
            print(f"Model file not found at {model_path}. Please train the model first.")
    except Exception as e:
        print(f"Error loading model: {e}")
    
    return MODEL


def preprocess_image(img_path, target_size=(224, 224)):
    """
    Preprocess the image for prediction.
    
    Args:
        img_path: Path to the input image.
        target_size: Target size for resizing the image.
        
    Returns:
        Preprocessed image ready for model input.
    """
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize to [0,1]
    
    return img_array


def predict_pneumonia(img_path):
    """
    Make a prediction on the input X-ray image.
    
    Args:
        img_path: Path to the input X-ray image.
        
    Returns:
        Dictionary containing prediction results:
        - is_pneumonia: Boolean indicating pneumonia detection.
        - confidence: Confidence score as a percentage.
    """
    model = load_model()
    
    if model is None:
        return {
            "error": "Model not loaded. Please train the model first."
        }
    
    try:
        # Preprocess the image
        preprocessed_img = preprocess_image(img_path)
        
        # Make prediction
        prediction = model.predict(preprocessed_img)
        
        # Binary classification: [0] = Normal, [1] = Pneumonia
        # If using sigmoid activation, we'll get a single value
        if prediction.shape[1] if len(prediction.shape) > 1 else 1 == 1:
            pneumonia_probability = float(prediction[0][0])
        else:
            pneumonia_probability = float(prediction[0][1])
        
        # Convert to binary result with threshold of 0.5
        is_pneumonia = pneumonia_probability >= 0.5
        
        # Calculate confidence percentage
        confidence = pneumonia_probability * 100 if is_pneumonia else (1 - pneumonia_probability) * 100
        
        return {
            "is_pneumonia": is_pneumonia,
            "confidence": confidence
        }
    
    except Exception as e:
        return {
            "error": f"Prediction error: {str(e)}"
        }
