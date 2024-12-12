import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../ui/Section';
import { PlusCircle } from 'lucide-react';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Section title="Quick Actions">
      <button
        onClick={() => navigate('/new-booking')}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-150"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        New Booking
      </button>
    </Section>
  );
};

export default QuickActions; 