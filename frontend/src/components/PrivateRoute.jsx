import React from 'react'
import { Navigate } from 'react-router-dom'

/**
 * PrivateRoute component.
 * Checks for JWT token and renders the child component if authenticated.
 * Otherwise, redirects to the login page.
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default PrivateRoute