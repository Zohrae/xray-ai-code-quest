
import { XRayResult } from '@/types/types';

// Changer l'URL de l'API pour fonctionner dans l'environnement Lovable
// En production, vous devriez utiliser une URL réelle de votre backend
const API_URL = 'https://mockapi.io/pneumonia-demo/api';

// Fonction pour simuler l'analyse d'une radiographie pulmonaire
export async function analyzeXRay(file: File): Promise<XRayResult> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    // Simulation d'un appel API (en réalité, nous générons une réponse locale)
    // Dans une implémentation réelle, cette requête irait vers votre backend Django
    console.log('Analyzing X-ray image:', file.name);
    
    // Simuler un délai d'analyse
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Générer un résultat de démonstration
    const isPneumonia = Math.random() > 0.5;
    const confidence = 70 + Math.floor(Math.random() * 25);
    
    const result: XRayResult = {
      id: crypto.randomUUID(),
      fileName: file.name,
      timestamp: new Date(),
      isPneumonia: isPneumonia,
      confidence: confidence,
      imageUrl: URL.createObjectURL(file)
    };
    
    return result;
  } catch (error) {
    console.error('Error analyzing X-ray:', error);
    throw error;
  }
}

// Fonction pour obtenir les analyses récentes
export async function getRecentScans(): Promise<XRayResult[]> {
  try {
    // Simuler un délai pour récupérer les analyses
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Générer des données de démonstration
    const demoScans: XRayResult[] = [];
    const demoFileNames = [
      'patient_001.jpg', 
      'patient_002.jpg', 
      'patient_003.jpg',
      'patient_004.jpg', 
      'patient_005.jpg'
    ];
    
    // Créer 5 analyses de démonstration
    for (let i = 0; i < 5; i++) {
      const isPneumonia = Math.random() > 0.5;
      demoScans.push({
        id: crypto.randomUUID(),
        fileName: demoFileNames[i],
        timestamp: new Date(Date.now() - i * 86400000), // Jours précédents
        isPneumonia: isPneumonia,
        confidence: 70 + Math.floor(Math.random() * 25),
        imageUrl: 'https://placehold.co/400x400/gray/white?text=X-Ray+Image'
      });
    }
    
    return demoScans;
  } catch (error) {
    console.error('Error fetching recent scans:', error);
    // Retourner un tableau vide en cas d'erreur
    return [];
  }
}
