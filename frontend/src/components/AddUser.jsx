import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * AddUser (Registration) component.
 * Allows new users to register with a username and password.
 * Handles duplicate user errors and redirects to login on success.
 */
const AddUser = () => {
  // State for form fields and error message
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  /**
   * Handles form submission for registration.
   * Sends user data to backend and handles errors.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/register`, {
        username,
        password,
      })
      // Registration successful, redirect to login
      navigate('/login')
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('User already exists. Redirecting to login...')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setError('Error registering user.')
        console.error('Error adding user:', err)
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-120 bg-[#F0F0F0] shadow-2xl rounded'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl mb-4 merriweather-style'>Register</h2>
        {/* Display error message if registration fails */}
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
        <button
          className='border border-blue-500 bg-white text-blue-500 px-4 py-2 flex fl mx-auto rounded hover:bg-blue-500 hover:text-white transition-colors duration-300'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default AddUser