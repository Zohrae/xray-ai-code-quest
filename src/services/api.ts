
import { XRayResult } from '@/types/types';

const API_URL = 'http://localhost:8000/api';

export async function analyzeXRay(file: File): Promise<XRayResult> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_URL}/analyze/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Analysis failed');
    }

    const data = await response.json();
    
    return {
      id: data.id,
      fileName: file.name,
      timestamp: new Date(),
      isPneumonia: data.is_pneumonia,
      confidence: data.confidence,
      imageUrl: URL.createObjectURL(file)
    };
  } catch (error) {
    console.error('Error analyzing X-ray:', error);
    throw error;
  }
}

export async function getRecentScans(): Promise<XRayResult[]> {
  try {
    const response = await fetch(`${API_URL}/predictions/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recent scans');
    }

    const data = await response.json();
    
    return data.map((item: any) => ({
      id: item.id,
      fileName: item.xray_image.filename,
      timestamp: new Date(item.created_at),
      isPneumonia: item.is_pneumonia,
      confidence: item.confidence,
      imageUrl: item.xray_image.image
    }));
  } catch (error) {
    console.error('Error fetching recent scans:', error);
    return [];
  }
}
