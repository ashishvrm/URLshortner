import React from 'react';
import Link from 'next/link';
import { Campaign } from '@/types/Campaign';

interface CampaignListProps {
  campaigns: Campaign[];
  selectedCampaign: number | null;
  onSelectCampaign: (id: number) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns, selectedCampaign, onSelectCampaign }) => (
  <div className="w-1/4 bg-red-50 p-4 overflow-y-auto">
    <h2 className="text-sm font-semibold mb-4">Manage Campaigns</h2>
    <ul>
      {campaigns.map((campaign) => (
        <li key={campaign.id} className="mb-2">
          <Link
            href={`/my-campaign-report/${campaign.id}`}
            className={`block w-full text-left p-2 rounded ${
              selectedCampaign === campaign.id
                ? 'bg-red-200 text-red-900'
                : 'hover:bg-red-100'
            }`}
            onClick={(e) => {
              e.preventDefault();
              onSelectCampaign(campaign.id);
            }}
          >
            {campaign.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default CampaignList;

