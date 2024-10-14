import { useState, useEffect } from 'react';

interface Campaign {
  startDate: Date;
  endDate: Date;
  type: string;
  statistics: { clicks: number; conversions: number; };
  description: string;
  id: string;
  name: string;
}

export function useCampaign(campaignId: string) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    // Fetch campaign data here
    setCampaign({
      id: campaignId,
      name: 'Sample Campaign',
      startDate: new Date(),
      endDate: new Date(),
      type: 'default',
      statistics: { clicks: 0, conversions: 0 },
      description: ''
    });
  }, [campaignId]);

  return campaign;
}
