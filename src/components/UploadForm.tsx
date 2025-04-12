
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, X, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadFormProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onAnalyze, isAnalyzing }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
          "text-center cursor-pointer"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        
        {!previewUrl ? (
          <div className="space-y-4 py-8">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag and drop your chest X-ray image</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
              <p className="text-xs text-gray-400 mt-4">Supported formats: JPEG, PNG, DICOM</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute -right-2 -top-2 bg-white rounded-full z-10 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                clearSelectedFile();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative rounded-lg overflow-hidden shadow-md max-h-[400px] mx-auto">
              <img 
                src={previewUrl} 
                alt="X-ray preview" 
                className="max-h-[400px] mx-auto object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
            </div>
            <p className="mt-2 text-sm text-gray-500">{selectedFile?.name}</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="flex justify-center">
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
          >
            {isAnalyzing ? (
              <>
                <span className="mr-2">Analyzing</span>
                <Progress value={80} className="w-16" />
              </>
            ) : (
              <>
                <FileImage className="mr-2 h-4 w-4" />
                Analyze X-Ray
              </>
            )}
          </Button>
        </div>
      )}

      <Card className="p-4 bg-blue-50 border-blue-100">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> For best results, upload a clear, frontal chest X-ray image. The AI model has been trained on standardized radiographic images.
        </p>
      </Card>
    </div>
  );
};

export default UploadForm;
