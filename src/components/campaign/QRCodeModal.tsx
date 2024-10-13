import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon, EnvelopeIcon, ChatBubbleLeftEllipsisIcon, PrinterIcon } from '@heroicons/react/24/outline';

interface QRCodeModalProps {
  url: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, onClose }) => {
  const handleAction = (action: string) => {
    // Implement actions here
    console.log(`${action} action triggered`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">QR Code</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <QRCodeSVG value={url} size={200} />
        <div className="mt-4 flex justify-center space-x-4">
          <button onClick={() => handleAction('download')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowDownTrayIcon className="h-6 w-6" />
          </button>
          <button onClick={() => handleAction('share')} className="p-2 hover:bg-gray-100 rounded-full">
            <ShareIcon className="h-6 w-6" />
          </button>
          <button onClick={() => handleAction('email')} className="p-2 hover:bg-gray-100 rounded-full">
            <EnvelopeIcon className="h-6 w-6" />
          </button>
          <button onClick={() => handleAction('chat')} className="p-2 hover:bg-gray-100 rounded-full">
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
          </button>
          <button onClick={() => handleAction('print')} className="p-2 hover:bg-gray-100 rounded-full">
            <PrinterIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
