export interface Subscriber {
  id: string;
  name?: string;
  email: string;
  createdAt: string;
  source: string;
  status: 'active' | 'sent' | 'pending';
  notes?: string;
  clickedOffer?: boolean;
}

export interface MetricSummary {
  totalSubscribers: number;
  todayCount: number;
  conversionRate: string;
  coreOfferClicks: number;
}
