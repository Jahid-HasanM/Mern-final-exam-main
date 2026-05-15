import React from 'react'

import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard({ token }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(response.data.data)
      } catch (err) {
        setError('Could not load profile')
      }
    }
    if (token) {
      fetchProfile()
    }
  }, [token])

  return (
    <div className="page-form">
      <h1>Dashboard</h1>
      {error && <div className="error">{error}</div>}
      {user ? (
        <div className="profile-card">
          <div>Name: {user.name || 'No name'}</div>
          <div>Email: {user.email}</div>
          <div>ID: {user._id}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Dashboard