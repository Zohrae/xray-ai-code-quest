
export interface XRayResult {
  id: string;
  fileName: string;
  timestamp: Date;
  isPneumonia: boolean;
  confidence: number;
  imageUrl: string;
}
