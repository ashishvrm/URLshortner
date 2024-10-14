'use client';

import React, { useState, useEffect } from 'react';
import CampaignList from '@/components/campaign/CampaignList';
import { getCampaigns, CampaignData } from '@/services/firebase';

export default function MyCampaignReportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignData = await getCampaigns();
        setCampaigns(campaignData);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex h-screen">
      <CampaignList
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelectCampaign={setSelectedCampaign}
      />
      <div className="w-3/4 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

