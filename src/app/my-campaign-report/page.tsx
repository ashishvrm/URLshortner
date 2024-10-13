'use client';

import React, { useState } from 'react';
import CampaignList from '@/components/campaign/CampaignList';
import CampaignDetails from '@/components/campaign/CampaignDetails';
import { Campaign } from '@/types/Campaign';

// Mock data for campaigns
const campaigns: Campaign[] = [
  { id: 1, name: 'Summer Sale 2023' },
  { id: 2, name: 'Back to School 2023' },
  { id: 3, name: 'Black Friday Special' },
  { id: 4, name: 'Holiday Season Promo' },
];

const MyCampaignsPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  return (
    <div className="flex h-[calc(100vh)]">
      <CampaignList
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelectCampaign={setSelectedCampaign}
      />
      <div className="w-3/4 p-8 overflow-y-auto">
        {selectedCampaign ? (
          <CampaignDetails campaign={campaigns.find(c => c.id === selectedCampaign)} />
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <h2 className="text-2xl font-semibold">Select a campaign from the list</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaignsPage;
