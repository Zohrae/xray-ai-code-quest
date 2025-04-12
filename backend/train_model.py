
import os
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.metrics import classification_report, confusion_matrix
import kagglehub

# Set constants
IMG_WIDTH, IMG_HEIGHT = 224, 224
BATCH_SIZE = 32
EPOCHS = 15

def download_dataset():
    """
    Download the pneumonia dataset from Kaggle.
    """
    print("Downloading dataset...")
    path = kagglehub.dataset_download("paultimothymooney/chest-xray-pneumonia")
    print(f"Dataset downloaded to {path}")
    return path

def create_data_generators(data_dir):
    """
    Create data generators for training, validation, and testing.
    
    Args:
        data_dir: Path to the dataset directory.
    
    Returns:
        train_generator, val_generator, test_generator
    """
    # Data augmentation for training set
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=15,
        width_shift_range=0.1,
        height_shift_range=0.1,
        shear_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    # Only rescaling for validation and test sets
    test_datagen = ImageDataGenerator(rescale=1./255)
    
    # Training generator
    train_generator = train_datagen.flow_from_directory(
        os.path.join(data_dir, 'train'),
        target_size=(IMG_WIDTH, IMG_HEIGHT),
        batch_size=BATCH_SIZE,
        class_mode='binary'
    )
    
    # Validation generator
    val_generator = test_datagen.flow_from_directory(
        os.path.join(data_dir, 'val'),
        target_size=(IMG_WIDTH, IMG_HEIGHT),
        batch_size=BATCH_SIZE,
        class_mode='binary'
    )
    
    # Test generator
    test_generator = test_datagen.flow_from_directory(
        os.path.join(data_dir, 'test'),
        target_size=(IMG_WIDTH, IMG_HEIGHT),
        batch_size=BATCH_SIZE,
        class_mode='binary',
        shuffle=False
    )
    
    return train_generator, val_generator, test_generator

def build_model():
    """
    Build the CNN model for pneumonia detection.
    
    Returns:
        Compiled Keras model.
    """
    model = Sequential([
        # First convolutional block
        Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(IMG_WIDTH, IMG_HEIGHT, 3)),
        MaxPooling2D(2, 2),
        
        # Second convolutional block
        Conv2D(64, (3, 3), activation='relu', padding='same'),
        MaxPooling2D(2, 2),
        
        # Third convolutional block
        Conv2D(128, (3, 3), activation='relu', padding='same'),
        MaxPooling2D(2, 2),
        
        # Fourth convolutional block
        Conv2D(128, (3, 3), activation='relu', padding='same'),
        MaxPooling2D(2, 2),
        
        # Flatten and dense layers
        Flatten(),
        Dense(512, activation='relu'),
        Dropout(0.5),
        Dense(1, activation='sigmoid')  # Binary classification: Normal vs Pneumonia
    ])
    
    # Compile the model
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def train_model(model, train_generator, val_generator):
    """
    Train the model.
    
    Args:
        model: Compiled Keras model.
        train_generator: Training data generator.
        val_generator: Validation data generator.
    
    Returns:
        Training history.
    """
    # Create model directory if it doesn't exist
    os.makedirs('xray_api/models', exist_ok=True)
    
    # Callbacks
    early_stopping = EarlyStopping(
        monitor='val_loss',
        patience=5,
        restore_best_weights=True
    )
    
    checkpoint = ModelCheckpoint(
        'xray_api/models/pneumonia_detection_model.h5',
        monitor='val_accuracy',
        save_best_only=True,
        mode='max'
    )
    
    # Train the model
    history = model.fit(
        train_generator,
        validation_data=val_generator,
        epochs=EPOCHS,
        callbacks=[early_stopping, checkpoint]
    )
    
    return history

def evaluate_model(model, test_generator):
    """
    Evaluate the model on the test set.
    
    Args:
        model: Trained Keras model.
        test_generator: Test data generator.
    """
    # Get the true labels
    y_true = test_generator.classes
    
    # Get predictions
    y_pred_prob = model.predict(test_generator)
    y_pred = (y_pred_prob > 0.5).astype(int).flatten()
    
    # Print classification report and confusion matrix
    print("\nClassification Report:")
    print(classification_report(y_true, y_pred, target_names=['Normal', 'Pneumonia']))
    
    # Compute and display confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    print("\nConfusion Matrix:")
    print(cm)
    
    # Calculate test accuracy
    test_loss, test_acc = model.evaluate(test_generator)
    print(f"\nTest Accuracy: {test_acc:.4f}")
    
    return y_true, y_pred, y_pred_prob

def plot_training_history(history):
    """
    Plot training history.
    
    Args:
        history: Training history from model.fit().
    """
    # Plot accuracy
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'])
    plt.plot(history.history['val_accuracy'])
    plt.title('Model Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Validation'], loc='lower right')
    
    # Plot loss
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'])
    plt.plot(history.history['val_loss'])
    plt.title('Model Loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Validation'], loc='upper right')
    
    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.show()

def plot_sample_predictions(test_generator, y_pred_prob, num_samples=10):
    """
    Plot sample predictions.
    
    Args:
        test_generator: Test data generator.
        y_pred_prob: Prediction probabilities.
        num_samples: Number of samples to display.
    """
    # Reset the generator
    test_generator.reset()
    
    # Get class names
    class_names = ['Normal', 'Pneumonia']
    
    # Get a batch of images
    for i in range(min(int(np.ceil(num_samples / BATCH_SIZE)), 1)):
        images, labels = next(test_generator)
        
    # Display images
    plt.figure(figsize=(15, num_samples * 3))
    
    for i in range(min(num_samples, len(images))):
        plt.subplot(num_samples, 2, i*2 + 1)
        plt.imshow(images[i])
        plt.title(f"True: {class_names[int(labels[i])]}")
        plt.axis('off')
        
        plt.subplot(num_samples, 2, i*2 + 2)
        prob = y_pred_prob[i][0]
        pred_class = 'Pneumonia' if prob > 0.5 else 'Normal'
        confidence = prob if pred_class == 'Pneumonia' else 1-prob
        
        plt.bar(['Normal', 'Pneumonia'], [1-prob, prob])
        plt.title(f"Pred: {pred_class} ({confidence:.2%})")
        plt.ylim(0, 1)
    
    plt.tight_layout()
    plt.savefig('sample_predictions.png')
    plt.show()

def main():
    """
    Main function to download data, train, and evaluate the model.
    """
    # Download and extract dataset
    data_dir = download_dataset()
    
    # Create data generators
    train_generator, val_generator, test_generator = create_data_generators(data_dir)
    
    # Build the model
    model = build_model()
    model.summary()
    
    # Train the model
    history = train_model(model, train_generator, val_generator)
    
    # Evaluate the model
    y_true, y_pred, y_pred_prob = evaluate_model(model, test_generator)
    
    # Plot training history
    plot_training_history(history)
    
    # Plot sample predictions
    plot_sample_predictions(test_generator, y_pred_prob)
    
    print("\nModel saved at: xray_api/models/pneumonia_detection_model.h5")

if __name__ == "__main__":
    main()
