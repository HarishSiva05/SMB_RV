import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

interface Booking {
  id: number;
  date: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('ledger_entries')
      .select('id, date, name')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      setBookings(data || []);
    }
  };

  const events = bookings.map(booking => ({
    id: booking.id,
    title: booking.name,
    start: new Date(booking.date),
    end: new Date(booking.date),
    allDay: true,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wedding Event Bookings</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your upcoming wedding events
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 text-gray-700 border border-gray-200">
              Today
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-150">
              + New Booking
            </button>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6" style={{ height: '700px' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              views={['month', 'week', 'day']}
              className="font-sans"
              dayPropGetter={date => ({
                style: {
                  backgroundColor: date.getDay() === 0 ? '#F9FAFB' : undefined,
                },
              })}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: '#4F46E5',
                  borderRadius: '4px',
                  border: 'none',
                  color: 'white'
                }
              })}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 text-sm font-medium">Upcoming Events</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {bookings.filter(b => new Date(b.date) > new Date()).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 text-sm font-medium">This Month</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {bookings.filter(b => {
                const date = new Date(b.date);
                const now = new Date();
                return date.getMonth() === now.getMonth() && 
                       date.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

