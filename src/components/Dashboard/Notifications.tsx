import React from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/outline';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 w-96">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBgColor(notification.type)} p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out`}
          style={{
            animation: 'slide-in-right 0.5s ease-out',
          }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {notification.message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => {/* Handle dismiss */}}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications; 