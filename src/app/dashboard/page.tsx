'use client';

import Card from '@/components/common/Card';
import React, { useState, useEffect } from 'react';
import CommonTable from '@/components/common/CommonTable';
import LiveStat from '@/components/LiveStat';
import Modal from '@/components/common/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCampaigns, CampaignData } from '@/services/firebase';

// Add backgroundColor to CampaignData interface
interface ExtendedCampaignData extends CampaignData {
  backgroundColor?: string;
}

const DashboardPage = () => {
  const [campaigns, setCampaigns] = useState<ExtendedCampaignData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('');

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

  const cardData = [
    { title: "Total Campaigns", count: campaigns.length },
    { title: "Currently Running", count: campaigns.filter(c => c.status === 'Running').length },
    { title: "Disabled", count: campaigns.filter(c => c.status === 'Disabled').length },
    { title: "Draft", count: campaigns.filter(c => c.status === 'Draft').length },
  ];

  const liveStatsData = campaigns.filter(c => c.status === 'Running').slice(0, 3).map(campaign => ({
    ...campaign,
    backgroundColor: campaign.backgroundColor || '#default-color' // Provide a default color if not set
  }));

  const tableData = campaigns.map(campaign => ({
    id: campaign.id,
    campaign: campaign.name,
    status: campaign.status,
    line: campaign.type,
    type: campaign.type,
    referral: 'N/A', // Add this field to your CampaignData if available
    earning: 0, // Add this field to your CampaignData if available
  }));

  const handleNewCampaign = () => {
    // Handle campaign creation here
    console.log('New campaign data:', { startDate, endDate, description });
    // You can add logic to save the campaign or update state as needed
    setIsOpen(false);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Welcome, Ashish Verma</h1>
      <div className="flex gap-4 mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center"
          >
            Start a New Campaign
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create a new campaign"
      >
        <div className="mb-4">
          <label className="block mb-1">Campaign Name</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter campaign name"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="relative">
            <label className="block mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => date && setStartDate(date)}
              className="border rounded p-2 pr-10 w-full"
            />
            <div className="absolute top-7 inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <label className="block mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => date && setEndDate(date)}
              className="border rounded p-2 pr-10 w-full"
            />
            <div className="absolute top-7 inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Campaign Type</label>
          <select
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select campaign type</option>
            <option value="Google CPC">Google CPC</option>
            <option value="Google Organic">Google Organic</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="Newsletter">Newsletter</option>
            <option value="Agent direct promotion">Agent direct promotion</option>
            <option value="Display ads">Display ads</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description / Details</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
        <button
          onClick={handleNewCampaign}
          className="bg-[#222] text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </Modal>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Campaigns Stats</h2>
          <a
            href="/MyCampaign"
            className="bg-white text-black px-4 py-2 rounded-full transition duration-300 flex items-center hover:bg-gray-100"
          >
            My Campaigns
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} count={card.count} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Live Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveStatsData.map((stat, index) => (
            <LiveStat
              key={index}
              campaignName={stat.name}
              backgroundColor={stat.backgroundColor}
              //onLinkClick={() => console.log(`Clicked link for ${stat.campaignName}`)}
            />
          ))}
        </div>
      </div>
      
      <CommonTable data={tableData} className="mt-4" />
    </div>
  );
};

export default DashboardPage;
