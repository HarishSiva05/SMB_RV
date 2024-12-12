import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsProps {
  bookings: any[];
}

const Analytics: React.FC<AnalyticsProps> = ({ bookings }) => {
  // Process data for monthly bookings
  const getMonthlyData = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        name: date.toLocaleString('default', { month: 'short' }),
        bookings: 0,
      };
    }).reverse();

    bookings.forEach(booking => {
      const bookingDate = new Date(booking.date);
      const monthIndex = months.findIndex(
        m => m.name === bookingDate.toLocaleString('default', { month: 'short' })
      );
      if (monthIndex !== -1) {
        months[monthIndex].bookings++;
      }
    });

    return months;
  };

  const monthlyData = getMonthlyData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Monthly Bookings Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Bookings</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking Trends Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{ fill: '#4F46E5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 