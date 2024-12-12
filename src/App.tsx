import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LedgerEntryForm from './components/LedgerEntryForm';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-booking" element={<LedgerEntryForm />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;

