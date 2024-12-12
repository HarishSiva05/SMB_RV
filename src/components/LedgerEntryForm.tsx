import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

export default function LedgerEntryForm() {
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
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUserId();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    const processedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (['date', 'name'].includes(key)) {
        acc[key] = value;
      } else {
        acc[key] = value === '' ? null : Number(value);
      }
      return acc;
    }, {} as Record<string, string | number | null>);

    try {
      const { data, error } = await supabase
        .from('ledger_entries')
        .insert([{ ...processedData, user_id: userId }]);

      if (error) throw error;
      console.log('Entry added successfully:', data);
      navigate('/'); // Redirect to dashboard after successful submission
    } catch (error) {
      console.error('Error adding entry:', error);
      setError('Failed to add entry. Please try again.');
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.form onSubmit={handleSubmit} className="space-y-4" style={formAnimation}>
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="cleaning" className="block text-sm font-medium text-gray-700">Cleaning</label>
          <input
            type="number"
            id="cleaning"
            name="cleaning"
            value={formData.cleaning}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="electricity" className="block text-sm font-medium text-gray-700">Electricity</label>
          <input
            type="number"
            id="electricity"
            name="electricity"
            value={formData.electricity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="water" className="block text-sm font-medium text-gray-700">Water</label>
          <input
            type="number"
            id="water"
            name="water"
            value={formData.water}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="gas" className="block text-sm font-medium text-gray-700">Gas</label>
          <input
            type="number"
            id="gas"
            name="gas"
            value={formData.gas}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="ac" className="block text-sm font-medium text-gray-700">AC</label>
          <input
            type="number"
            id="ac"
            name="ac"
            value={formData.ac}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="room_rent" className="block text-sm font-medium text-gray-700">Room Rent</label>
          <input
            type="number"
            id="room_rent"
            name="room_rent"
            value={formData.room_rent}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="generator" className="block text-sm font-medium text-gray-700">Generator</label>
          <input
            type="number"
            id="generator"
            name="generator"
            value={formData.generator}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="prev_day" className="block text-sm font-medium text-gray-700">Previous Day</label>
          <input
            type="number"
            id="prev_day"
            name="prev_day"
            value={formData.prev_day}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="others" className="block text-sm font-medium text-gray-700">Others</label>
          <input
            type="number"
            id="others"
            name="others"
            value={formData.others}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="gst_amt" className="block text-sm font-medium text-gray-700">GST Amount</label>
          <input
            type="number"
            id="gst_amt"
            name="gst_amt"
            value={formData.gst_amt}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Entry
        </button>
      </div>
    </animated.form>
  );
}

