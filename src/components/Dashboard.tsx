import React, { useState, useEffect } from 'react';
import Calendar from './Dashboard/Calendar';
import Analytics from './Dashboard/Analytics';
import QuickActions from './Dashboard/QuickActions';
import SearchAndFilters from './Dashboard/SearchAndFilters';
import RecentEvents from './Dashboard/RecentEvents';
import { Summary } from './Dashboard/Summary';
import { LedgerTable } from './Dashboard/LedgerTable';
import { LedgerEntry } from '../types/ledger';
import { supabase } from './lib/supabase';
import { Section } from './ui/Section';

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  // Fetch ledger entries
  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('ledger_entries')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        <Summary data={bookings} />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Section title="Calendar">
            <Calendar bookings={bookings} />
          </Section>
        </div>
        
        <div className="lg:col-span-1">
          <Section title="Recent Events">
            <RecentEvents bookings={bookings} />
          </Section>
        </div>
      </div>

      <Section title="Analytics">
        <Analytics bookings={bookings} />
      </Section>

      <Section title="Recent Bookings">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <LedgerTable data={bookings} />
        )}
      </Section>
    </div>
  );
};

export default Dashboard;

