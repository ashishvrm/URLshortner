'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock data for campaigns
const campaigns = [
  { id: 1, name: 'Summer Sale 2023' },
  { id: 2, name: 'Back to School 2023' },
  { id: 3, name: 'Black Friday Special' },
  { id: 4, name: 'Holiday Season Promo' },
];

const MyCampaignsPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  return (
    <div className="flex h-[calc(100vh)]">
      {/* Left side panel */}
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
                  setSelectedCampaign(campaign.id);
                }}
              >
                {campaign.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right content area */}
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

interface CampaignDetailsProps {
  campaign: { id: number; name: string } | undefined;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign }) => {
  if (!campaign) return null;

  const shortcampaignUrl = `https://www.websitename.com/r/sweepstakes=${campaign.id}`;
  const fullcampaignUrl = `https://www.websitename.com/sweepstakes?utm_source=email&utm_medium=advertisement&campaign=${campaign.id}`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
      <div className="mb-4">
        <h2 className="text-md mb-2">Campaign URL:</h2>
        <div className="relative">
          <input
            type="text"
            value={shortcampaignUrl}
            readOnly
            className="w-full py-3 px-6 pr-12 border border-gray-100 rounded-full bg-gray-50"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(shortcampaignUrl);
              const snackbar = document.createElement('div');
              snackbar.textContent = 'Copied';
              snackbar.style.cssText = `
                position: fixed;
                top: 16px;
                right: 0%;
                transform: translateX(-50%);
                background-color: #333;
                color: #fff;
                padding: 12px 24px;
                border-radius: 4px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
              `;
              document.body.appendChild(snackbar);
              setTimeout(() => {
                snackbar.style.opacity = '1';
              }, 10);
              setTimeout(() => {
                snackbar.style.opacity = '0';
                setTimeout(() => {
                  document.body.removeChild(snackbar);
                }, 300);
              }, 2000);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            aria-label="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-start space-x-4 mt-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Download">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Share">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Print">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>
        <div className="relative pt-8">
            <h2 className="text-md mb-2">Full URL:</h2>
          <input
            type="text"
            value={fullcampaignUrl}
            readOnly
            className="w-full py-3 px-6 pr-12 border border-gray-100 rounded-full bg-gray-50"
          />
        </div>
      </div>
      <hr className="my-4 border-t border-gray-100" />
    </div>
  );
};

export default MyCampaignsPage;
