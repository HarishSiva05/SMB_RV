import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { useTransition, animated } from 'react-spring';

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
  const [error, setError] = useState<string | null>(null);

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
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const transitions = useTransition(entries, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    trail: 100,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
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
          {transitions((style, entry) => (
            <animated.tr key={entry.id} style={style}>
              <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.rent}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.gst_bill_amt}</td>
              {/* Add more table cells for other properties */}
            </animated.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

