import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_URL;
/**
 * Login component.
 * Allows users to log in with their username and password.
 * On success, saves JWT token and redirects to the home page.
 */
const Login = () => {
  // State for form fields and error message
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  /**
   * Handles form submission for login.
   * Sends credentials to backend and stores JWT on success.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/login`, { username, password })
      localStorage.setItem('token', res.data.token)
      navigate('/tasks') // Redirect to tasks page on successful login
    } catch (err) {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className='flex justify-center items-center h-120 bg-[#F0F0F0] shadow-2xl rounded'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl mb-4 merriweather-style'>Login</h2>
        {/* Display error message if login fails */}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='username'>Username</label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            type='text'
            id='username'
            name='username'
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='password'>Password</label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            type='password'
            id='password'
            name='password'
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {/* Link to registration page */}
        <p>
          Do not have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer underline "
            onClick={() => navigate('/register')}
          >
            Sign up
          </span>
        </p>
        <button
          className='border border-blue-500 bg-white text-blue-500 px-4 py-2 mt-4 flex fl mx-auto rounded hover:bg-blue-500 hover:text-white transition-colors duration-300'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login