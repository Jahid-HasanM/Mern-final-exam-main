import React from 'react'

import { useEffect, useState } from 'react'
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate, 
  Outlet, 
  Link 
} from 'react-router' 

import Login from './pages/Login'
import Register from './pages/Registration'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './pages/Protected_Routes'
import './App.css'
import Registration from './Pagese/Registration'
import Protected_Routes from './Pagese/Protected_Routes'

function Layout({ token, setToken }) {
  const handleLogout = () => {
    setToken('')
  }
// ----------------
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">Exam Auth</div>
        <nav>
          {token ? (
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
// -------------------
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout token={token} setToken={setToken} />,
      children: [
        { index: true, element: <Navigate to="/login" replace /> },
        { path: "register", element: <Registration setToken={setToken} /> },
        { path: "login", element: <Login setToken={setToken} /> },
        {
          path: "dashboard",
          element: (
            <Protected_Routes token={token}>
              <Dashboard token={token} />
            </Protected_Routes>
          ),
        },
        { path: "*", element: <div className="page-form">Page not found</div> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App