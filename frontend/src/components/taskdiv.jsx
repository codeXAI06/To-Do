import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaCheckCircle, FaPlus, FaSignOutAlt } from 'react-icons/fa'
const API_BASE_URL = import.meta.env.VITE_API_URL;
/**
 * Taskdiv component.
 * Displays the list of tasks for the logged-in user.
 * Allows editing, deleting (completing), and adding tasks.
 * Handles logout functionality.
 */
const Taskdiv = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  /**
   * Navigates to the Add Task page.
   */
  const handleClick = () => {
    navigate('/add-task')
  }

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  /**
   * Fetches tasks for the logged-in user from the backend.
   * Sends JWT token for authentication.
   */
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(Array.isArray(response.data.data) ? response.data.data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setLoading(false)
    }
  }

  /**
   * Deletes a task by ID.
   * Sends JWT token for authentication.
   * @param {string} id - The ID of the task to delete.
   */
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${API_BASE_URL}/api/tasks/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(tasks.filter(task => task._id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  // Show loading indicator while fetching tasks
  if (loading) {
    return <div className='flex justify-center items-center h-120 bg-[#F0F0F0] text-gray-500'>Loading...</div>
  }

  return (
    <div>
      <div className='flex justify-center items-center bg-[#F0F0F0] shadow-2xl rounded'>
        {/* Show message if no tasks exist */}
        {tasks.length == 0 ? (
          <div className='text-gray-500 flex justify-center items-center'>No tasks have been added</div>
        ) : (
          <div className='h-115 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 overflow-y-auto'>
            {tasks.map((task) => (
              <div key={task._id} className='bg-white max-h-70 p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-shadow duration-300'>
                <h2 className='text-xl merriweather-style mb-2'>{task.title}</h2>
                <hr className='my-2 opacity-25'></hr>
                <p
                  className="text-gray-700 content-style text-sm break-words overflow-hidden max-h-24"
                  style={{ wordBreak: 'break-word' }}
                  title={task.description}
                >
                  {task.description.length > 150
                    ? task.description.slice(0, 150) + '...'
                    : task.description}
                </p>
                <p className='text-gray-500 mt-2 content-style text-sm'>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className='text-gray-500 content-style text-sm'>Status: {task.status}</p>
                {/* Edit Task button */}
                <button
                  onClick={() => navigate(`/edit-task/${task._id}`)}
                  className='mt-4 border content-style text-sm border-blue-500 text-blue-500 px-4 py-2 mr-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300'
                >
                  <FaEdit className='inline-block mr-1' />
                  Edit
                </button>
                {/* Complete Task button */}
                <button
                  onClick={() => deleteTask(task._id)}
                  className='mt-2 border content-style text-sm border-green-500 text-green-500 px-4 py-2 m-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300'
                >
                  <FaCheckCircle className='inline-block mr-1' />
                  Completed
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Add Task and Logout buttons */}
      <div className=' flex flex-col-2 justify-center mx-auto items-center mt-5'>
        <button
          onClick={handleClick}
          className='mt-2 border content-style text-sm border-gray-600 text-gray-600 px-4 py-2 m-2 rounded hover:bg-gray-600 hover:text-white transition-colors duration-300'
        >
          <FaPlus className='inline-block mr-1' />
          Add Task
        </button>
        <button
          className='mt-2 border content-style text-sm border-black text-black px-4 py-2 m-2 rounded hover:bg-black hover:text-white transition-colors duration-300'
          onClick={() => {
            // Remove JWT token and redirect to login on logout
            localStorage.removeItem('token')
            navigate('/login')
          }}
        >
          <FaSignOutAlt className='inline-block mr-1' />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Taskdiv