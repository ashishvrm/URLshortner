import React from 'react';

interface UrlInputProps {
  url: string;
  showQrCode?: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, showQrCode = false }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // Show snackbar notification (implementation omitted for brevity)
  };

  const showQrCodeModal = () => {
    // Implementation of QR code modal (omitted for brevity)
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={url}
        readOnly
        className="w-full py-3 px-6 pr-12 border border-gray-100 rounded-full bg-gray-50"
      />
      <button
        onClick={copyToClipboard}
        className="absolute right-12 top-1/2 transform -translate-y-1/2"
        aria-label="Copy to clipboard"
      >
        {/* Copy icon SVG */}
      </button>
      {showQrCode && (
        <button
          onClick={showQrCodeModal}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          aria-label="Show QR Code"
        >
          {/* QR code icon SVG */}
        </button>
      )}
    </div>
  );
};

export default UrlInput;

