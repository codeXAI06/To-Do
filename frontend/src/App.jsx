import React from 'react'
import './index.css'
import Navbar from './components/Navbar.jsx';
import Taskdiv from './components/taskdiv.jsx';
import AddTask from './components/AddTask.jsx';
import { Routes, Route } from 'react-router-dom';
import EditTask from './components/EditTask.jsx';
import Login from './components/Login.jsx';
import AddUser from './components/AddUser.jsx';
import PrivateRoute from './components/PrivateRoute'

/**
 * Main application component.
 * Sets up routing and renders the Navbar and page components.
 */
function App() {
  return (
    <div className=' cursor-default'>
      {/* Application Navbar */}
      <Navbar />
      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AddUser />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Taskdiv />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
