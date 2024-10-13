import React from 'react';
import {
  ClipboardDocumentIcon,
  QrCodeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

const CampaignDetails: React.FC = () => {
  return (
    <div>
      {/* ... other component content ... */}
      
      <div className="icon-container">
        <ClipboardDocumentIcon className="h-6 w-6" aria-hidden="true" />
        <QrCodeIcon className="h-6 w-6" aria-hidden="true" />
        <ArrowDownTrayIcon className="h-6 w-6" aria-hidden="true" />
        <ShareIcon className="h-6 w-6" aria-hidden="true" />
        <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
        <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
        <PrinterIcon className="h-6 w-6" aria-hidden="true" />
      </div>
    </div>
  );
};

export default CampaignDetails;
