import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

interface CalendarProps {
  bookings: { date: string; name: string }[];
}

const Calendar: React.FC<CalendarProps> = ({ bookings }) => {
  const navigate = useNavigate();

  const events = bookings.map(booking => ({
    title: booking.name,
    date: booking.date,
    display: 'block',
    backgroundColor: '#818cf8',
    borderColor: '#6366f1',
  }));

  const handleDateClick = () => {
    navigate('/new-booking');
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        height="auto"
        eventDisplay="block"
        eventColor="#818cf8"
        eventTextColor="#ffffff"
        dayMaxEvents={2}
        eventClick={(info) => {
          console.log('Event clicked:', info.event);
        }}
      />
      <style>{`
        .calendar-container {
          --fc-border-color: #e5e7eb;
          --fc-button-bg-color: #6366f1;
          --fc-button-border-color: #6366f1;
          --fc-button-hover-bg-color: #4f46e5;
          --fc-button-hover-border-color: #4f46e5;
          --fc-button-active-bg-color: #4338ca;
          --fc-button-active-border-color: #4338ca;
          --fc-event-bg-color: #818cf8;
          --fc-event-border-color: #6366f1;
        }
        .fc {
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
        }
        .fc-header-toolbar {
          margin-bottom: 1.5rem !important;
        }
        .fc-toolbar-title {
          font-size: 1.25rem !important;
          font-weight: 600;
        }
        .fc-button {
          padding: 0.5rem 1rem !important;
          font-weight: 500 !important;
          font-size: 0.875rem !important;
        }
        .fc-day {
          cursor: pointer;
        }
        .fc-day:hover {
          background-color: #f3f4f6;
        }
        .fc-event {
          padding: 2px 4px;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default Calendar; 
