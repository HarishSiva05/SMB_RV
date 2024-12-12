import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import * as XLSX from 'xlsx';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process and upload data to Supabase
      const { error } = await supabase.from('ledger_entries').insert(jsonData);

      if (error) throw error;

      alert('File uploaded and processed successfully!');
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Failed to process file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Upload CSV/XLSX File</h2>
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;

