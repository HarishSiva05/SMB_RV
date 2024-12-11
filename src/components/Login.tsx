import { useState } from 'react'
import { supabase } from '../components/lib/supabase'
import { AuthError } from '@supabase/supabase-js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      let result;

      if (email === 'admin' && password === 'admin') {
        // Use a special sign-in method for the admin user
        result = await supabase.auth.signInWithPassword({
          email: 'admin@example.com',
          password: 'admin_password_hash'
        })
      } else {
        // Regular sign-in for other users
        result = await supabase.auth.signInWithPassword({ email, password })
      }

      if (result.error) throw result.error
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Error logging in:', error)
      setError(error instanceof AuthError ? error.message : 'Failed to log in. Please check your credentials.')
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Log In
      </button>
    </form>
  )
}

