import React from 'react';

interface CardProps {
  title: string;
  count: number;
}

const Card: React.FC<CardProps> = ({ title, count }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
    <h2 className="text-md font-normal mb-2 text-gray-500">{title}</h2>
    <p className="text-3xl font-bold text-gray-800">{count}</p>
  </div>
);

export default Card;
