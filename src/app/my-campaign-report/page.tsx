'use client';

import React, { useState } from 'react';
import CampaignList from '@/components/campaign/CampaignList';
import CampaignDetails from '@/components/campaign/CampaignDetails';
import StatisticsChart from '@/components/campaign/StatisticsChart';
import { Campaign } from '@/types/Campaign';

// Updated mock data for campaigns with associated statistics
const campaigns: (Campaign & { statistics: { month: string; visitors: number }[] })[] = [
  {
    id: 1,
    name: 'Summer Sale 2023',
    statistics: [
      { month: 'Jun', visitors: 1000 },
      { month: 'Jul', visitors: 1500 },
      { month: 'Aug', visitors: 2000 },
    ]
  },
  {
    id: 2,
    name: 'Back to School 2023',
    statistics: [
      { month: 'Aug', visitors: 1200 },
      { month: 'Sep', visitors: 1800 },
      { month: 'Oct', visitors: 1500 },
    ]
  },
  { id: 3, name: 'Black Friday Special', statistics: [] },
  { id: 4, name: 'Holiday Season Promo', statistics: [] },
];

const MyCampaignsPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign);

  return (
    <div className="flex h-screen">
      <CampaignList
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelectCampaign={setSelectedCampaign}
      />
      <div className="w-3/4 p-8 overflow-y-auto">
        {selectedCampaignData ? (
          <>
            <CampaignDetails campaign={selectedCampaignData} />
            {selectedCampaignData.statistics.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Statistics Chart Report</h2>
                <StatisticsChart data={selectedCampaignData.statistics} />
              </div>
            ) : (
              <div className="mt-8 text-center text-gray-500">
                <p>No statistics available for this campaign.</p>
              </div>
            )}
          </>
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
