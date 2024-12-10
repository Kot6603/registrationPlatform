import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './styles/global.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider'
import EventContextProvider from './context/EventContextProvider'

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
