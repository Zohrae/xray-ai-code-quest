
# Pneumonia X-Ray AI Detection

This project is an AI-powered web application for detecting pneumonia from chest X-ray images. It was developed as part of a study to evaluate the capability of AI code generation tools (GitHub Copilot and Tabnine) to create functional and maintainable code for medical applications.

## Project Structure

The project follows a client-server architecture:

```
Pneumonia/
├── frontend/      # React TypeScript application
└── backend/       # Django REST API + TensorFlow model
```

## Features

- Upload and preview chest X-ray images
- AI-powered pneumonia detection with confidence scores
- Visual heatmap highlighting potential pneumonia regions
- History of previous scans
- Educational information about pneumonia and the AI model

## Technical Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- ShadCN UI component library
- Lucide React for icons

### Backend
- Django REST Framework
- TensorFlow/Keras for the machine learning model
- Chest X-ray dataset from Kaggle (Paul Mooney)

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.8+
- Pip

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/pneumonia-detection.git
cd pneumonia-detection
```

2. Set up the frontend:
```
cd frontend
npm install
npm run dev
```

3. Set up the backend:
```
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

4. Download the dataset:
```python
import kagglehub
path = kagglehub.dataset_download("paultimothymooney/chest-xray-pneumonia")
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Upload a chest X-ray image
3. View the AI analysis results

## Ethical Considerations

This application is intended for educational and research purposes only. It should not be used for actual medical diagnosis. Always consult with healthcare professionals for proper medical advice.

## Acknowledgements

- Dataset: "Chest X-Ray Images (Pneumonia)" by Paul Mooney on Kaggle
- This project was created as part of a comparative study on AI code generation tools

## License

This project is licensed under the MIT License - see the LICENSE file for details.
