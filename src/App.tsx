import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Clients from './components/Clients';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import LedgerEntryForm from './components/LedgerEntryForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/clients" element={<Clients />} />
                  {/* <Route path="/analytics" element={<Analytics />} /> */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/new-booking" element={<LedgerEntryForm />} />
                </Routes>
              </Layout>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

