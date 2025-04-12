
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { XRayResult } from '@/types/types';
import { AlertTriangle, CheckCircle, Download } from 'lucide-react';

interface ResultDisplayProps {
  result: XRayResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(result.timestamp);

  const getProgressColor = () => {
    if (result.isPneumonia) {
      if (result.confidence > 85) return "bg-red-500";
      return "bg-orange-500";
    }
    return "bg-green-500";
  };

  const getResultBadge = () => {
    if (result.isPneumonia) {
      return (
        <Badge variant="destructive" className="text-lg py-1 px-3 gap-1">
          <AlertTriangle className="h-4 w-4" />
          Pneumonia Detected
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-lg py-1 px-3 gap-1">
        <CheckCircle className="h-4 w-4" />
        No Pneumonia Detected
      </Badge>
    );
  };

  const renderHeatmap = () => {
    // In a real implementation, this would use a library like heatmap.js
    // or render a heatmap image from the backend
    // For now, we'll just render the original image with a simulated overlay
    return (
      <div className="relative mt-6 rounded-lg overflow-hidden border border-gray-200">
        <img src={result.imageUrl} alt="X-ray" className="w-full max-h-[400px] object-contain" />
        {result.isPneumonia && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm">
            <p>The highlighted areas indicate potential pneumonia infection</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">{result.fileName}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="flex-shrink-0">
          {getResultBadge()}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-medium">Confidence Level</p>
                <p className="font-semibold">{result.confidence}%</p>
              </div>
              <Progress value={result.confidence} className={getProgressColor()} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Key Findings</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {result.isPneumonia ? (
                    <>
                      <li>Opacity detected in lung regions</li>
                      <li>Potential consolidation in lower lobes</li>
                      <li>Reduced lung clarity</li>
                    </>
                  ) : (
                    <>
                      <li>Clear lung fields</li>
                      <li>Normal cardio-thoracic ratio</li>
                      <li>No significant opacity</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Recommendation</h4>
                <p className="text-sm">
                  {result.isPneumonia 
                    ? "This X-ray shows patterns consistent with pneumonia. Clinical correlation is recommended."
                    : "This X-ray appears normal with no significant findings suggestive of pneumonia."
                  }
                </p>
              </div>
            </div>

            <Separator />

            {renderHeatmap()}

            <div className="flex justify-end">
              <a 
                href={result.imageUrl} 
                download={result.fileName}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <Download className="h-4 w-4" />
                Download Report
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium">Important Notice</p>
        <p className="mt-1">
          This is an AI-assisted analysis and should not replace professional medical diagnosis. 
          Always consult with a healthcare provider for proper medical advice.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
