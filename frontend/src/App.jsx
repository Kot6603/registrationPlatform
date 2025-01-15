import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast'

import Admin from './pages/Admin'
import AdminCompetition from './pages/AdminCompetition'
import AuthContext from './context/AuthContext'
import Competition from './pages/Competition'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'


function App() {
  const { user, loading, isAdmin } = useContext(AuthContext)

  const adminRoutes = (adminPage) => {
    if (loading) {
      return <div>Loading...</div>
    }

    if (!user || !isAdmin(user.email)) {
      return <Navigate to="/" />
    }

    return adminPage
  }

  return (
    <div className="w-4/5 mx-auto" >
      <Routes>
        <Route path="/" element={user && isAdmin(user.email) ? <Navigate to="/admin" /> : <LandingPage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/admin" element={adminRoutes(<Admin />)} />
        <Route path="/competitions/:id" element={<Competition />} />
        <Route path="/admin/competitions" element={adminRoutes(<AdminCompetition />)} />
        <Route path="*" element={<NotFound />} />
      </Routes >
      <Toaster position="bottom-right" />
    </div >
  )
}

export default App
