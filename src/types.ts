export type TabId = 'overview' | 'candidates' | 'assessments';

export interface AnalyticsItem {
  id: number;
  name: string;
  score: number;
  attempts: number;
  createdAt: string;
}
