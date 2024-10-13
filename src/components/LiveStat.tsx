import React from 'react';
import { LinkIcon } from '@heroicons/react/24/solid';

interface LiveStatProps {
  campaignName: string;
  backgroundColor?: string;
  onLinkClick?: () => void;
}

const LiveStat: React.FC<LiveStatProps> = ({ campaignName, backgroundColor = 'bg-white', onLinkClick }) => {
  return (
    <div className={`${backgroundColor} p-4 rounded-lg relative`}>
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span className="text-xs font-semibold text-green-500 mr-2">Live</span>
        <span className="text-sm font-medium">{campaignName}</span>
      </div>
      <button 
        onClick={onLinkClick} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2"
      >
        <LinkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default LiveStat;

