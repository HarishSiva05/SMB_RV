import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

interface LedgerEntry {
  id: number;
  date: string;
  name: string;
  rent: number;
  gst_bill_amt: number;
  // Add other properties as needed
}

export function LedgerTable() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('ledger_entries')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST Bill Amount</th>
            {/* Add more table headers for other properties */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.rent}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.gst_bill_amt}</td>
              {/* Add more table cells for other properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

