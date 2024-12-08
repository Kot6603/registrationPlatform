import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import EventContextProvider from './context/EventContextProvider'
import AuthContextProvider from './context/AuthContextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EventContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
