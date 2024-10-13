import React, { useState } from 'react';
import { ClipboardDocumentIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import QRCodeModal from './QRCodeModal';

interface UrlInputProps {
  url: string;
  showQrCode?: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, showQrCode = true }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={url}
        readOnly
        className="w-full py-3 px-6 pr-24 border border-gray-100 rounded-full bg-gray-50"
      />
      {showQrCode && (
        <>
          <button
            onClick={copyToClipboard}
            className="absolute right-12 top-1/2 transform -translate-y-1/2"
            aria-label="Copy to clipboard"
          >
            <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
          </button>
          <button
            onClick={() => setShowQRModal(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            aria-label="Show QR Code"
          >
            <QrCodeIcon className="h-5 w-5 text-gray-400" />
          </button>
        </>
      )}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Link copied to clipboard!
        </div>
      )}
      {showQRModal && (
        <QRCodeModal url={url} onClose={() => setShowQRModal(false)} />
      )}
    </div>
  );
};

export default UrlInput;
