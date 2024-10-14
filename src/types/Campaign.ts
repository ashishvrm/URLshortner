export interface Campaign {
  id: number;
  name: string;
  description?: string;
  statistics: { month: string; visitors: number }[];
  status?: 'active' | 'inactive' | 'completed';
}

