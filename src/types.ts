export type SentimentType = 'Positive' | 'Negative' | 'Neutral';

export interface SentimentAnalysisResult {
  sentiment: SentimentType;
  confidence: number;
  summary: string;
  keywords: string[];
  score: number; // -1.0 to 1.0
}

export interface BatchReviewItem {
  id: string | number;
  reviewerName: string;
  reviewText: string;
  category: string;
  date: string;
  sentiment: SentimentType;
  confidence: number;
  keywords: string[];
  score: number;
}

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  plan: 'Enterprise' | 'Pro' | 'Starter';
  lastActive: string;
  avatar: string;
  initials: string;
  email: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface DashboardMetric {
  totalReviews: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  accuracy: number;
  trendVsLastMonth: number;
}
