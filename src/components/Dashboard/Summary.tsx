import React from 'react';
import { IndianRupee, Users, Calendar, AlertCircle } from 'lucide-react';

interface LedgerEntry {
  rent: number;
  gst_bill_amt: number;
  cleaning: number;
  electricity: number;
  water: number;
  gas: number;
  ac: number;
  room_rent: number;
  generator: number;
  prev_day: number;
  others: number;
  discount: number;
}

interface SummaryProps {
  data: LedgerEntry[];
}

export const Summary: React.FC<SummaryProps> = ({ data }) => {
  const totalAmount = data.reduce((sum, entry) => {
    const total = entry.rent + entry.gst_bill_amt + entry.cleaning + 
                 entry.electricity + entry.water + entry.gas + 
                 entry.ac + entry.room_rent + entry.generator + 
                 entry.prev_day + entry.others - entry.discount;
    return sum + total;
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Total Revenue"
        value={`₹${totalAmount.toLocaleString()}`}
        icon={<IndianRupee className="w-6 h-6" />}
      />
      <SummaryCard
        title="Total Bookings"
        value={data.length.toString()}
        icon={<Calendar className="w-6 h-6" />}
      />
      {/* Add more summary cards as needed */}
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="text-indigo-600">{icon}</div>
      </div>
    </div>
  );
};