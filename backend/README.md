
# Pneumonia Detection Backend

This is the backend component of the Pneumonia Detection system. It provides a Django REST API for analyzing chest X-ray images and detecting pneumonia.

## Features

- REST API for uploading and analyzing chest X-ray images
- Pneumonia detection using a trained TensorFlow/Keras model
- Image storage and prediction results persistence
- Support for various image formats including DICOM

## Setup and Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/pneumonia-detection.git
cd pneumonia-detection/backend
```

2. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Download the dataset and train the model:
```
python train_model.py
```

5. Run database migrations:
```
python manage.py migrate
```

6. Create a superuser (optional, for admin access):
```
python manage.py createsuperuser
```

7. Start the development server:
```
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`.

## API Endpoints

- `POST /api/analyze/`: Upload and analyze an X-ray image
- `GET /api/xrays/`: List all uploaded X-ray images
- `GET /api/xrays/{id}/`: Retrieve a specific X-ray image
- `GET /api/predictions/`: List all prediction results
- `GET /api/predictions/{id}/`: Retrieve a specific prediction result

## Model Architecture

The pneumonia detection model is a Convolutional Neural Network (CNN) with the following architecture:

- Four convolutional blocks with increasing filter sizes (32, 64, 128, 128)
- MaxPooling after each convolutional layer
- Dropout regularization to prevent overfitting
- Binary classification output (Normal vs Pneumonia)

## Dataset

The model is trained on the "Chest X-Ray Images (Pneumonia)" dataset by Paul Mooney, available on Kaggle.

## Technology Stack

- Django: Web framework
- Django REST Framework: API framework
- TensorFlow/Keras: Machine learning framework
- Pillow: Image processing
- SQLite: Database (default, can be configured to use other databases)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
