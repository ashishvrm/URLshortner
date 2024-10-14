'use client';

import React, { useState } from 'react';
import { CampaignData } from '@/services/firebase';
import UrlInput from './UrlInput';
import ActionButton from './IconAction';
import { ArrowDownTrayIcon, ShareIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { FacebookIcon, LinkedInIcon, TwitterIcon } from '../common/SocialIcons';
import { Popover } from '@headlessui/react';
import { QRCodeSVG } from 'qrcode.react';

interface CampaignDetailsProps {
  campaign: CampaignData;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign }) => {
  const shortcampaignUrl = `https://www.websitename.com/r/sweepstakes=${campaign.id}`;
  const fullcampaignUrl = `https://www.websitename.com/sweepstakes?utm_source=email&utm_medium=advertisement&campaign=${campaign.id}`;

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const handleShare = (platform: 'facebook' | 'linkedin' | 'twitter') => {
    // Generate QR code for sharing
    setQrCodeUrl(shortcampaignUrl);

    // Share on the selected platform
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortcampaignUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shortcampaignUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shortcampaignUrl)}`, '_blank');
        break;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
      <div className="mb-4">
        <h2 className="text-md mb-2">Campaign URL:</h2>
        <UrlInput url={shortcampaignUrl} showQrCode />
        <div className="flex justify-start space-x-4 mt-4">
          <ActionButton ariaLabel="Download" Icon={ArrowDownTrayIcon} />
          <Popover className="relative">
            <Popover.Button as={ActionButton} ariaLabel="Share" Icon={ShareIcon} />
            <Popover.Panel className="absolute z-10 w-48 p-2 mt-2 bg-white rounded-md shadow-lg">
              <button
                className="flex items-center w-full p-2 text-left hover:bg-gray-100"
                onClick={() => handleShare('facebook')}
              >
                <FacebookIcon className="w-5 h-5 mr-2" />
                Share on Facebook
              </button>
              <button
                className="flex items-center w-full p-2 text-left hover:bg-gray-100"
                onClick={() => handleShare('linkedin')}
              >
                <LinkedInIcon className="w-5 h-5 mr-2" />
                Share on LinkedIn
              </button>
              <button
                className="flex items-center w-full p-2 text-left hover:bg-gray-100"
                onClick={() => handleShare('twitter')}
              >
                <TwitterIcon className="w-5 h-5 mr-2" />
                Share on X
              </button>
            </Popover.Panel>
          </Popover>
          <ActionButton
            ariaLabel="Email"
            Icon={EnvelopeIcon}
            onClick={() => {
              const subject = encodeURIComponent('Check out this campaign');
              const body = encodeURIComponent(`Here's the QR code for the campaign: ${shortcampaignUrl}`);
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }}
          />
          <ActionButton
            ariaLabel="Chat"
            Icon={ChatBubbleLeftRightIcon}
            onClick={() => {
              const message = encodeURIComponent(`Check out this QR code: ${shortcampaignUrl}`);
              window.location.href = `sms:?&body=${message}`;
            }}
          />
          <ActionButton
            ariaLabel="Print"
            Icon={PrinterIcon}
            onClick={() => {
              const printWindow = window.open('', '_blank');
              if (printWindow) {
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>Print QR Code</title>
                    </head>
                    <body>
                      <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                        <img src="${shortcampaignUrl}" alt="QR Code" />
                      </div>
                      <script>
                        window.onload = function() {
                          window.print();
                          window.onafterprint = function() {
                            window.close();
                          };
                        };
                      </script>
                    </body>
                  </html>
                `);
                printWindow.document.close();
              }
            }}
          />
        </div>
        <div className="relative pt-8">
          <h2 className="text-md mb-2">Full URL:</h2>
          <UrlInput url={fullcampaignUrl} />
        </div>
      </div>
      <hr className="my-4 border-t border-gray-100" />
      {qrCodeUrl && (
        <div className="mt-4">
          <QRCodeSVG value={qrCodeUrl} size={128} />
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
