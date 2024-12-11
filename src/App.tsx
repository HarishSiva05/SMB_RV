import React, { useState, useEffect } from 'react';
import { supabase } from './components/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Layout } from './components/Layout';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { LedgerEntryForm } from './components/LedgerEntryForm';
import { LedgerTable } from './components/LedgerTable';
import { SupabaseTest } from './components/SupabaseTest';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEntryAdded = () => {
    setRefreshTable(prev => !prev);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create an account' : 'Sign in to your account'}
          </h2>
          {isSignUp ? <SignUp /> : <Login />}
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Wedding Ledger Management</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log out
          </button>
        </div>
        
        <SupabaseTest />
        
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Ledger Entry</h2>
          <LedgerEntryForm onEntryAdded={handleEntryAdded} />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-lg font-medium text-gray-900 p-6">Ledger Entries</h2>
          <LedgerTable key={refreshTable.toString()} />
        </div>
      </div>
    </Layout>
  );
}

export default App;

