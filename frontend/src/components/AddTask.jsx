import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * AddTask component.
 * Allows users to add a new task with title, description, and due date.
 * Sends JWT token for authentication.
 */
const AddTask = () => {
  // State for form fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const navigate = useNavigate()

  /**
   * Handles form submission for adding a task.
   * Sends task data to backend with JWT token.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        '/api/tasks',
        { title, description, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      navigate('/tasks')
    } catch (err) {
      console.error('Error adding task:', err)
    }
  }

  return (
    <div className='flex justify-center items-center h-120 bg-[#F0F0F0] shadow-2xl rounded'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl mb-4 merriweather-style'>Add New Task</h2>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='title'>Title</label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            type='text'
            id='title'
            name='title'
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='description'>Description</label>
          <textarea
            className='w-full p-2 border border-gray-300 rounded'
            id='description'
            name='description'
            required
            maxLength={70}
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='dueDate'>Due Date</label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            type='date'
            id='dueDate'
            name='dueDate'
            required
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 flex fl mx-auto rounded hover:bg-blue-600 transition-colors duration-300'
          type='submit'
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default AddTask