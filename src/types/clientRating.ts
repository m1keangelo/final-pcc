
export type ClientRating = {
  overall: number;
  creditRating: number;
  incomeRating: number;
  downPaymentRating: number;
  documentationRating: number;
  readinessRating: number;
};

export type AnalyticMetric = {
  key: string;
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number;
};
