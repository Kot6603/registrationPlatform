import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import AuthContext from './context/AuthContext'

import { Routes, Route, Navigate } from 'react-router'
import { useContext } from 'react'

function App() {
  const { user, loading, isAdmin } = useContext(AuthContext)

  const adminRoutes = () => {
    if (loading) {
      return <div>Loading...</div>
    }

    if (!user) {
      return <Navigate to="/login" />
    }

    if (!isAdmin(user.email)) {
      return <Navigate to="/" />
    }

    return <Admin />
  }

  return (
    <div className="w-4/5 mx-auto" >
      <Routes>
        <Route path="/" element={user && isAdmin(user.email) ? <Navigate to="/admin" /> : <LandingPage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/admin" element={adminRoutes()} />
      </Routes >
    </div >
  )
}

export default App
