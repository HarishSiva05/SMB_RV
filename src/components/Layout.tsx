import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { FileText, Home, PieChart, Settings, Users, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUsername(user?.email || null);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <FileText className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Wedding Ledger</span>
              </div>
            </div>
            <div className="flex items-center">
              {username && (
                <span className="text-sm font-medium text-gray-700 mr-4">{username}</span>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="mt-5 px-2">
            <Link
              to="/"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname === '/' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Home className="mr-3 h-6 w-6" />
              Dashboard
            </Link>
            <Link
              to="/add-entry"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname === '/add-entry' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <PieChart className="mr-3 h-6 w-6" />
              Add New Entry
            </Link>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Users className="mr-3 h-6 w-6" />
              Customers
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Settings className="mr-3 h-6 w-6" />
              Settings
            </a>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

