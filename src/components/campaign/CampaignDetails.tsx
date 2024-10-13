import React from 'react';
import { Campaign } from '@/types/Campaign';
import UrlInput from './UrlInput';
import ActionButton from './IconAction';
import { ArrowDownTrayIcon, ShareIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, PrinterIcon } from '@heroicons/react/24/outline';

interface CampaignDetailsProps {
  campaign: Campaign | undefined;
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
        <UrlInput url={shortcampaignUrl} showQrCode />
        <div className="flex justify-start space-x-4 mt-4">
          <ActionButton ariaLabel="Download" Icon={ArrowDownTrayIcon} />
          <ActionButton ariaLabel="Share" Icon={ShareIcon} />
          <ActionButton ariaLabel="Email" Icon={EnvelopeIcon} />
          <ActionButton ariaLabel="Chat" Icon={ChatBubbleLeftRightIcon} />
          <ActionButton ariaLabel="Print" Icon={PrinterIcon} />
        </div>
        <div className="relative pt-8">
          <h2 className="text-md mb-2">Full URL:</h2>
          <UrlInput url={fullcampaignUrl} />
        </div>
      </div>
      <hr className="my-4 border-t border-gray-100" />
    </div>
  );
};

export default CampaignDetails;
