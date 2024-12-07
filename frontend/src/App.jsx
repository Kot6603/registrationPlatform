import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'

import { Routes, Route } from 'react-router'

function App() {
  return (
    <div className="w-4/5 mx-auto" >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes >
    </div >
  )
}

export default App
