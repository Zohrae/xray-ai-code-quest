
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import UploadForm from '@/components/UploadForm';
import ResultDisplay from '@/components/ResultDisplay';
import InfoSection from '@/components/InfoSection';
import RecentScans from '@/components/RecentScans';
import { XRayResult } from '@/types/types';
import { AlertCircle, FileCheck } from 'lucide-react';
import { analyzeXRay, getRecentScans } from '@/services/api';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<XRayResult | null>(null);
  const [recentScans, setRecentScans] = useState<XRayResult[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load recent scans when component mounts
    fetchRecentScans();
  }, []);

  const fetchRecentScans = async () => {
    try {
      const scans = await getRecentScans();
      setRecentScans(scans);
    } catch (error) {
      console.error('Failed to fetch recent scans:', error);
    }
  };
  
  const handleFileAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // Call the backend API to analyze the image
      const result = await analyzeXRay(file);
      
      setCurrentResult(result);
      // Update the recent scans
      fetchRecentScans();
      setActiveTab("results");
      
      toast({
        title: result.isPneumonia ? "Pneumonia Detected" : "No Pneumonia Detected",
        description: `Confidence: ${result.confidence.toFixed(2)}%`,
        variant: result.isPneumonia ? "destructive" : "default",
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the X-ray image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <AlertCircle className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Pneumonia X-Ray AI</h1>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-blue-700">Pneumonia Detection from Chest X-Rays</CardTitle>
            <CardDescription className="text-center">
              Upload a chest X-ray image to detect potential pneumonia using our AI model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">Upload X-Ray</TabsTrigger>
                <TabsTrigger value="results" disabled={!currentResult}>Results</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="pt-6">
                <UploadForm onAnalyze={handleFileAnalysis} isAnalyzing={isAnalyzing} />
              </TabsContent>
              
              <TabsContent value="results" className="pt-6">
                {currentResult && <ResultDisplay result={currentResult} />}
              </TabsContent>
              
              <TabsContent value="history" className="pt-6">
                <RecentScans scans={recentScans} onSelectScan={(result) => {
                  setCurrentResult(result);
                  setActiveTab("results");
                }} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Separator className="my-8" />
        
        <InfoSection />
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Pneumonia X-Ray AI | AI Code Quest Project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
