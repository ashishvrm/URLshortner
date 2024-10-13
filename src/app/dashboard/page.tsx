'use client';

import Card from '@/components/Card';
import React, { useState } from 'react';
import CommonTable from '@/components/CommonTable';
import LiveStat from '@/components/LiveStat';
import Modal from '@/components/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const cardData = [
    { title: "Total Campaigns", count: 10 },
    { title: "Currently Running", count: 5 },
    { title: "Disabled", count: 3 },
    { title: "Draft", count: 2 },
  ];

  const liveStatsData = [
    { name: 'Impressions', value: 1000 },
    { name: 'Clicks', value: 500 },
    { name: 'Conversions', value: 200 },
  ];

  const data = [
    { id: '1', campaign: 'Sweepstakes', status: 'Running', line: 'Line 1', type: 'Type 1', referral: 'Referral 1', earning: 100 },
    { id: '2', campaign: 'Email Newsletter', status: 'Draft', line: 'Line 2', type: 'Type 2', referral: 'Referral 2', earning: 200 },
    { id: '3', campaign: 'Facebook Ads', status: 'Disabled', line: 'Line 3', type: 'Type 3', referral: 'Referral 3', earning: 300 },
    { id: '4', campaign: 'Google Ads', status: 'Running', line: 'Line 4', type: 'Type 4', referral: 'Referral 4', earning: 400 },
  ];

  const liveStats = [
    { campaignName: 'Sweepstakes', backgroundColor: 'bg-blue-100' },
    { campaignName: 'Email Newsletter', backgroundColor: 'bg-green-100' },
    { campaignName: 'Facebook Ads', backgroundColor: 'bg-yellow-100' },
  ];

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
          <a
            href="/MyCampaign"
            className="bg-white text-black border border-black px-4 py-2 rounded-full transition duration-300 flex items-center hover:bg-gray-100"
          >
            My Campaigns
          </a>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create a new campaign"
      >
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
        <h2 className="text-xl font-semibold mb-4">Campaigns Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} count={card.count} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Live Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveStats.map((stat, index) => (
            <LiveStat
              key={index}
              campaignName={stat.campaignName}
              backgroundColor={stat.backgroundColor}
              //onLinkClick={() => console.log(`Clicked link for ${stat.campaignName}`)}
            />
          ))}
        </div>
      </div>
      
      <CommonTable data={data} className="mt-4" />
    </div>
  );
};

export default DashboardPage;
