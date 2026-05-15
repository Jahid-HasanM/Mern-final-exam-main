import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import axios from 'axios'

function Register({ setToken }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', {
        name,
        email,
        password,
      })
      setToken(response.data.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="page-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="link-row">
        Already have account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Registration