import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_URL;

import React from 'react'

const EditTask = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                  `${API_BASE_URL}/api/tasks/${id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                const task = response.data.data
                setTitle(task.title)
                setDescription(task.description)
                setDueDate(task.dueDate.split('T')[0]) // Format date for input
            } catch (error) {
                console.error('Error fetching task:', error)
            }
        }
        fetchTask()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${API_BASE_URL}/api/tasks/${id}`,
                { title, description, dueDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/')
        } catch (err) {
            console.error('Error updating task:', err)
        }
    }
  return (
    <div className='flex justify-center items-center h-120 bg-[#F0F0F0] shadow-2xl rounded'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl mb-4 merriweather-style'>Add New Task</h2>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='title'>Title</label>
          <input className='w-full p-2 border border-gray-300 rounded' type='text' id='title' name='title' required 
          value={title} onChange={e=> setTitle(e.target.value)}/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='description'>Description</label>
          <textarea className='w-full p-2 border border-gray-300 rounded' id='description' name='description' required
          value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='dueDate'>Due Date</label>
          <input className='w-full p-2 border border-gray-300 rounded' type='date' id='dueDate' name='dueDate' required 
          value={dueDate} onChange={e=> setDueDate(e.target.value)}/>
        </div>
        <button className='bg-blue-500 text-white px-4 py-2 flex fl mx-auto rounded hover:bg-blue-600 transition-colors duration-300' type='submit'>Add Task</button>
      </form>
    </div>
  )
}

export default EditTask