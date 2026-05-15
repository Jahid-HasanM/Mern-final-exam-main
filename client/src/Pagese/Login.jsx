import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import axios from 'axios'

function Login({ setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', {
        email,
        password,
      })
      setToken(response.data.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }
// -----------
  return (
    <div className="page-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="link-row">
        New user? <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Login