import React from 'react';
import { IndianRupee, Users, Calendar, AlertCircle } from 'lucide-react';
import type { LedgerEntry } from '../../types/ledger';

interface SummaryProps {
  data: LedgerEntry[];
}

export function Summary({ data }: SummaryProps) {
  const totalRevenue = data.reduce((sum, entry) => sum + entry.rent, 0);
  const totalPending = data.reduce((sum, entry) => sum + entry.totals.pendingBalance, 0);
  const totalCustomers = new Set(data.map(entry => entry.name)).size;

  const stats = [
    {
      name: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Total Events',
      value: data.length,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Pending Amount',
      value: `₹${totalPending.toLocaleString()}`,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div className={`absolute rounded-md p-3 ${item.bgColor}`}>
              <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
}