'use client';

import React, { useState } from 'react';
import CampaignList from '@/components/campaign/CampaignList';

export default function MyCampaignsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [campaigns, setCampaigns] = useState([]); // Replace with actual data fetching
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-100">
        <CampaignList 
          campaigns={campaigns}
          selectedCampaign={selectedCampaign}
          onSelectCampaign={(id: string) => setSelectedCampaign(id)}
        />
      </aside>
      <main className="w-3/4 p-4">
        {children}
      </main>
    </div>
  );
}
