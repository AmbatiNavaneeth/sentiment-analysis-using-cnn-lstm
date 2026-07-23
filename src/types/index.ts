export interface PredictionResult {
  prediction: 'Positive' | 'Negative';
  sentiment: 'Positive' | 'Negative';
  confidence: number;
  probability: number;
  processing_time: string;
  model: string;
  summary?: string;
  extracted_features?: {
    positive_tokens?: string[];
    negative_tokens?: string[];
    sequence_length?: number;
  };
}

export interface ExampleReview {
  id: string;
  type: 'positive' | 'negative';
  movie: string;
  text: string;
  expectedConfidence: number;
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  details: string[];
  iconName: string;
}

export interface ModelMetric {
  name: string;
  value: string;
  percentage: number;
  description: string;
}
