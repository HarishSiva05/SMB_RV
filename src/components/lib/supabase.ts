import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://elzwaqrndvgwteenjlrj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsendhcXJuZHZnd3RlZW5qbHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDUyNTksImV4cCI6MjA0OTQ4MTI1OX0.zBnfTIE7onXu37cXEfSkJNc-U9ReNCU5EvzfBA_fmps'

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    throw new Error('Missing Supabase environment variables')
  }
  
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
console.log('Supabase client initialized with URL:', supabaseUrl)

supabase.from('ledger_entries').select('count(*)', { count: 'exact' })
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error)
    } else {
      console.log('Supabase connection test successful:', data)
    }
  })
