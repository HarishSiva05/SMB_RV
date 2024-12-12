import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}; 