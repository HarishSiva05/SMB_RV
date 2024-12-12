import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from './ui/Section';
import { supabase } from './lib/supabase';

export default function LedgerEntryForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to add entries');
      }

      // Get form values directly from elements
      const form = e.target as HTMLFormElement;
      const entry = {
        date: (form.elements.namedItem('date') as HTMLInputElement)?.value,
        name: (form.elements.namedItem('name') as HTMLInputElement)?.value,
        rent: Number((form.elements.namedItem('rent') as HTMLInputElement)?.value) || 0,
        gst_bill_amt: Number((form.elements.namedItem('gstBillAmount') as HTMLInputElement)?.value) || 0,
        cleaning: Number((form.elements.namedItem('cleaning') as HTMLInputElement)?.value) || 0,
        electricity: Number((form.elements.namedItem('electricity') as HTMLInputElement)?.value) || 0,
        water: Number((form.elements.namedItem('water') as HTMLInputElement)?.value) || 0,
        gas: Number((form.elements.namedItem('gas') as HTMLInputElement)?.value) || 0,
        ac: Number((form.elements.namedItem('ac') as HTMLInputElement)?.value) || 0,
        room_rent: Number((form.elements.namedItem('roomRent') as HTMLInputElement)?.value) || 0,
        generator: Number((form.elements.namedItem('generator') as HTMLInputElement)?.value) || 0,
        prev_day: Number((form.elements.namedItem('previousDay') as HTMLInputElement)?.value) || 0,
        others: Number((form.elements.namedItem('others') as HTMLInputElement)?.value) || 0,
        discount: Number((form.elements.namedItem('discount') as HTMLInputElement)?.value) || 0,
        gst_amt: Number((form.elements.namedItem('gstAmount') as HTMLInputElement)?.value) || 0,
        user_id: user.id
      };

      console.log('Submitting entry:', entry);

      const { data, error: supabaseError } = await supabase
        .from('ledger_entries')
        .insert([entry])
        .select();

      if (supabaseError) throw new Error(supabaseError.message);

      console.log('Success! Added entry:', data);
      navigate('/');
    } catch (err) {
      console.error('Detailed error:', err);
      setError(err instanceof Error ? err.message : 'Failed to add entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Booking Entry</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <Section title="Booking Details">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rent
                </label>
                <input
                  type="number"
                  name="rent"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Additional Charges */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Bill Amount
                </label>
                <input
                  type="number"
                  name="gstBillAmount"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cleaning
                </label>
                <input
                  type="number"
                  name="cleaning"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Electricity
                </label>
                <input
                  type="number"
                  name="electricity"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Utilities */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Water
                </label>
                <input
                  type="number"
                  name="water"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gas
                </label>
                <input
                  type="number"
                  name="gas"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AC
                </label>
                <input
                  type="number"
                  name="ac"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Additional Fees */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Rent
                </label>
                <input
                  type="number"
                  name="roomRent"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Generator
                </label>
                <input
                  type="number"
                  name="generator"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Day
                </label>
                <input
                  type="number"
                  name="previousDay"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Bottom Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Others
              </label>
              <input
                type="number"
                name="others"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Amount
              </label>
              <input
                type="number"
                name="gstAmount"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
              disabled={loading}
            >
              {loading ? 'Adding Entry...' : 'Add Entry'}
            </button>
          </div>
        </form>
      </Section>
    </div>
  );
}

