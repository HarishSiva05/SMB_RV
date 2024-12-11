import React from 'react';
import type { LedgerEntry } from '../types/ledger';

interface LedgerTableProps {
  data: LedgerEntry[];
}

export function LedgerTable({ data }: LedgerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST Bill Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{entry.date.toISOString().split('T')[0]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.rent}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.gstBillAmt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.rent + entry.gstBillAmt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

