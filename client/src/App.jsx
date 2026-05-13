import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/Layout/DashboardLayout'
import Login from './pages/Login'
import Registration from './pages/registration'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App