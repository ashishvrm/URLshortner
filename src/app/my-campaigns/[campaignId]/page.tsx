'use client';

import { useParams } from 'next/navigation';
import CampaignDetails from '@/components/campaign/CampaignDetails';
import { useCampaign } from '@/hooks/useCampaign';
import { Campaign } from '@/types/Campaign';

// Define the shape of data expected by CampaignDetails
interface CampaignData {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: string;
  status: "active" | "inactive" | "completed";
  statistics: Array<{ month: string; visitors: number }>;
}

export default function CampaignPage() {
  const { campaignId } = useParams();
  const campaign = useCampaign(Array.isArray(campaignId) ? campaignId[0] : campaignId);

  if (!campaign) return <div>Loading...</div>;

  const campaignData: CampaignData = {
    id: campaign.id,
    name: campaign.name ?? '',
    description: campaign.description ?? '',
    startDate: campaign.startDate ? new Date(campaign.startDate) : new Date(),
    endDate: campaign.endDate ? new Date(campaign.endDate) : new Date(),
    type: campaign.type ?? 'default',
    status: 'active', // Assuming a default value, adjust as needed
    statistics: campaign.statistics ? [{ month: 'Total', visitors: campaign.statistics.clicks }] : [],
  };

  return <CampaignDetails campaign={campaignData} />;
}
