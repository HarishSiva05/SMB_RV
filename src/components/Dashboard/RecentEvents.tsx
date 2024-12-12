import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RecentEventsProps {
  bookings: any[];
}

const RecentEvents: React.FC<RecentEventsProps> = ({ bookings }) => {
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate('/new-booking');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} onClick={handleEventClick} className="cursor-pointer">
            {booking.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentEvents; 