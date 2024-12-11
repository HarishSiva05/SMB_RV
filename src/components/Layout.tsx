import React from 'react';
import { FileText, Home, PieChart, Settings, Users } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <FileText className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Wedding Ledger</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex h-screen pt-16">
        <aside className="w-64 bg-white border-r border-gray-200">
          <nav className="mt-5 px-2">
            <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-600 bg-indigo-50">
              <Home className="mr-3 h-6 w-6" />
              Dashboard
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Users className="mr-3 h-6 w-6" />
              Customers
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <PieChart className="mr-3 h-6 w-6" />
              Reports
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Settings className="mr-3 h-6 w-6" />
              Settings
            </a>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}