import React, { useState } from 'react';
import Link from 'next/link';

interface ActionButtonProps {
  ariaLabel: string;
  icon: React.ReactNode;
}

const ActionButton = ({ ariaLabel, icon }: ActionButtonProps) => (
  <button aria-label={ariaLabel} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icon}
    </svg>
  </button>
);

export default ActionButton;
