
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XRayResult } from '@/types/types';
import { AlertTriangle, CheckCircle, Clock, FileImage } from 'lucide-react';

interface RecentScansProps {
  scans: XRayResult[];
  onSelectScan: (scan: XRayResult) => void;
}

const RecentScans: React.FC<RecentScansProps> = ({ scans, onSelectScan }) => {
  if (scans.length === 0) {
    return (
      <div className="text-center py-12">
        <FileImage className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No scans yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload an X-ray to begin analyzing for pneumonia
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Recent Analyses</h3>
      <div className="space-y-4">
        {scans.map(scan => (
          <Card key={scan.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/4 h-32 sm:h-auto bg-gray-100 relative">
                <img 
                  src={scan.imageUrl} 
                  alt={scan.fileName} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium truncate" title={scan.fileName}>
                      {scan.fileName}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }).format(scan.timestamp)}
                    </div>
                  </div>
                  <Badge 
                    variant={scan.isPneumonia ? "destructive" : "outline"}
                    className={scan.isPneumonia ? "" : "bg-green-100 text-green-800 border-green-200"}
                  >
                    {scan.isPneumonia ? (
                      <><AlertTriangle className="mr-1 h-3 w-3" /> Pneumonia</>
                    ) : (
                      <><CheckCircle className="mr-1 h-3 w-3" /> Normal</>
                    )}
                  </Badge>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">Confidence:</span> {scan.confidence}%
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSelectScan(scan)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentScans;
