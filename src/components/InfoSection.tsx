
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Stethoscope, Database, Code } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">How Pneumonia AI Detection Works</h2>
      
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">About Pneumonia</TabsTrigger>
          <TabsTrigger value="ai">AI Model</TabsTrigger>
          <TabsTrigger value="data">Dataset</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="pt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5 text-blue-600" />
                About Pneumonia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Pneumonia is an infection that inflames the air sacs in one or both lungs. 
                The air sacs may fill with fluid or pus, causing symptoms such as cough with phlegm, 
                fever, chills, and difficulty breathing.
              </p>
              <p>
                Chest X-rays are the standard imaging technique used to diagnose pneumonia, as they can 
                reveal areas of opacity (consolidation) that represent infection in the lungs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Symptoms</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Chest pain during breathing or coughing</li>
                    <li>Confusion or changes in mental awareness</li>
                    <li>Cough with phlegm</li>
                    <li>Fatigue and loss of appetite</li>
                    <li>Fever, sweating, and chills</li>
                    <li>Lower than normal body temperature</li>
                    <li>Nausea, vomiting, or diarrhea</li>
                    <li>Shortness of breath</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Risk Factors</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Age (very young and older than 65)</li>
                    <li>Chronic diseases</li>
                    <li>Weakened immune system</li>
                    <li>Smoking</li>
                    <li>Hospitalization</li>
                    <li>Exposure to certain chemicals or pollutants</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="pt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-blue-600" />
                AI Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our pneumonia detection system uses a deep learning convolutional neural network (CNN) 
                trained on thousands of labeled chest X-ray images. The model can identify patterns 
                associated with pneumonia that might be difficult for the human eye to detect.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Model Architecture</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Convolutional Neural Network (CNN)</li>
                    <li>Built with TensorFlow/Keras</li>
                    <li>Transfer learning with pre-trained weights</li>
                    <li>Fine-tuned on medical X-ray images</li>
                    <li>Multiple convolutional and pooling layers</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Performance Metrics</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Accuracy: ~90%</li>
                    <li>Sensitivity: ~93%</li>
                    <li>Specificity: ~87%</li>
                    <li>F1 Score: ~90%</li>
                    <li>AUC-ROC: 0.92</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm">
                <p className="font-medium">AI Limitations</p>
                <p>
                  While our AI model performs well, it should be used as a supportive tool for healthcare professionals, 
                  not as a replacement for clinical diagnosis. The model may occasionally produce false positives or 
                  negatives.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="pt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-blue-600" />
                Dataset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The model was trained on the Chest X-Ray Images (Pneumonia) dataset from Kaggle, 
                which contains thousands of validated chest X-ray images. This dataset was carefully curated 
                and labeled by medical professionals to ensure accuracy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Dataset Details</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Source: Guangzhou Women and Children's Medical Center</li>
                    <li>Total images: ~5,800</li>
                    <li>Normal X-rays: ~1,500</li>
                    <li>Pneumonia X-rays: ~4,300</li>
                    <li>Image format: JPEG</li>
                    <li>Resolution: Variable</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Data Preprocessing</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Image resizing to 224x224 pixels</li>
                    <li>Grayscale normalization</li>
                    <li>Data augmentation (rotation, zoom, shift)</li>
                    <li>Class balancing</li>
                    <li>Train-validation-test split (70-15-15)</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Reference: Kermany, Daniel; Zhang, Kang; Goldbaum, Michael (2018), 
                "Labeled Optical Coherence Tomography (OCT) and Chest X-Ray Images for Classification", 
                Mendeley Data, V2, doi: 10.17632/rscbjbr9sj.2
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tech" className="pt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5 text-blue-600" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our application is built using modern web technologies and machine learning frameworks, 
                with a focus on reliability, performance, and user experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Frontend Technologies</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>React.js with TypeScript</li>
                    <li>Tailwind CSS for styling</li>
                    <li>ShadCN UI component library</li>
                    <li>AJAX for API communication</li>
                    <li>Canvas for image processing</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Backend Technologies</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Django REST Framework</li>
                    <li>TensorFlow/Keras for the ML model</li>
                    <li>NumPy for numerical calculations</li>
                    <li>Pillow for image handling</li>
                    <li>PostgreSQL for data storage</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Development Process</h4>
                <p className="text-sm">
                  The application was developed using an agile methodology, with a focus on code quality, 
                  testing, and continuous integration. The development was assisted by AI pair programming 
                  tools to enhance productivity and code quality.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfoSection;
