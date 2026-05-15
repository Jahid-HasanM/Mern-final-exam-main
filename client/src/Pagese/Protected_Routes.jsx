import React from 'react'
import { Navigate } from "react-router"


function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/" />
  }
  return children
}

export default Protected_Routes