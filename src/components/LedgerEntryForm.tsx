import React, { useState } from 'react';
import { supabase } from './lib/supabase';

interface LedgerEntryFormProps {
  onEntryAdded: () => void;
}

export function LedgerEntryForm({ onEntryAdded }: LedgerEntryFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    rent: '',
    gst_bill_amt: '',
    cleaning: '',
    electricity: '',
    water: '',
    gas: '',
    ac: '',
    room_rent: '',
    generator: '',
    prev_day: '',
    others: '',
    discount: '',
    gst_amt: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('ledger_entries')
        .insert([formData]);

      if (error) throw error;
      console.log('Entry added successfully:', data);
      onEntryAdded();
      setFormData({
        date: '',
        name: '',
        rent: '',
        gst_bill_amt: '',
        cleaning: '',
        electricity: '',
        water: '',
        gas: '',
        ac: '',
        room_rent: '',
        generator: '',
        prev_day: '',
        others: '',
        discount: '',
        gst_amt: '',
      });
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Rent</label>
          <input
            type="number"
            id="rent"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="gst_bill_amt" className="block text-sm font-medium text-gray-700">GST Bill Amount</label>
          <input
            type="number"
            id="gst_bill_amt"
            name="gst_bill_amt"
            value={formData.gst_bill_amt}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Add more input fields for other properties */}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Entry
        </button>
      </div>
    </form>
  );
}

