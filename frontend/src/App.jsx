import LandingPage from './pages/LandingPage'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <div className="w-4/5 mx-auto" >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Sign Up</h1>} />
        <Route path="/admin" element={<h1>Admin</h1>} />
      </Routes >
    </div >
  )
}

export default App
