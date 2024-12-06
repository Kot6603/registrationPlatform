import './App.css'
import LandingPage from './pages/LandingPage'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Sign Up</h1>} />
        <Route path="/admin" element={<h1>Admin</h1>} />
      </Routes>
    </>
  )
}

export default App
