'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CampaignDetails from '@/components/campaign/CampaignDetails';
import StatisticsChart from '@/components/campaign/StatisticsChart';
import { getCampaignById, CampaignData } from '@/services/firebase';

const CampaignPage = () => {
  const { campaignId } = useParams();
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (campaignId) {
        try {
          const data = await getCampaignById(Array.isArray(campaignId) ? campaignId[0] : campaignId);
          setCampaignData(data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching campaign details:', err);
          setError('Failed to fetch campaign details. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if (!campaignData) {
    return <div className="text-center mt-20">Campaign not found</div>;
  }

  return (
    <>
      <CampaignDetails campaign={campaignData} />
      {campaignData.statistics.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Statistics Chart Report</h2>
          <StatisticsChart statistics={campaignData.statistics} />
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-500">
          <p>No statistics available for this campaign.</p>
        </div>
      )}
    </>
  );
};

export default CampaignPage;
