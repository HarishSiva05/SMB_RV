import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export function SupabaseTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rowCount, setRowCount] = useState<number | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test connection by selecting all rows and getting the length
        const { data, error } = await supabase
          .from('ledger_entries')
          .select('*')
        
        if (error) throw error

        setIsConnected(true)
        setRowCount(data.length)
        console.log('Supabase connection successful', data)
      } catch (error) {
        console.error('Supabase connection error:', error)
        setIsConnected(false)
        setError(JSON.stringify(error, null, 2))
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
      {isConnected === null ? (
        <p>Testing connection...</p>
      ) : isConnected ? (
        <div>
          <p className="text-green-600">Connected to Supabase successfully!</p>
          <p>Number of rows in ledger_entries: {rowCount}</p>
        </div>
      ) : (
        <div>
          <p className="text-red-600">Failed to connect to Supabase.</p>
          {error && (
            <pre className="text-sm text-red-500 mt-1 whitespace-pre-wrap">
              Error: {error}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}

