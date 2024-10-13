import React from 'react';
import Link from 'next/link';
import { HomeIcon, BellIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  return (
    <nav className="fixed left-0 top-0 h-full w-16 shadow-xl flex flex-col items-center py-4 space-y-4 bg-white">
      <Link href="/" className="hover:text-gray-500">
        <HomeIcon className="w-6 h-6" />
      </Link>
      <Link href="/dashboard" className="hover:text-gray-500">
        <ChartBarIcon className="w-6 h-6" />
      </Link>
      <Link href="/my-campaign-report" className="hover:text-gray-500">
        <BellIcon className="w-6 h-6" />
      </Link>
    </nav>
  );
};

export default Navigation;
