import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './styles/global.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider'
import CompetitionContextProvider from './context/CompetitionContextProvider'
import EventContextProvider from './context/EventContextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <CompetitionContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CompetitionContextProvider>
      </EventContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
