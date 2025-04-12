
from django.apps import AppConfig


class XrayApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'xray_api'
    
    def ready(self):
        """
        Load the pneumonia detection model when the app is ready.
        """
        import os
        from django.conf import settings
        
        # Only load the model in production or when not running management commands
        if os.environ.get('RUN_MAIN') or not settings.DEBUG:
            try:
                from xray_api.model_loader import load_model
                load_model()
            except Exception as e:
                print(f"Warning: Could not load model: {e}")
