export interface Campaign {
  id: number;
  name: string;
  statistics: { month: string; visitors: number }[];
}

