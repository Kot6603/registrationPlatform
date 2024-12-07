import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import EventContextProvider from './context/EventContextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EventContextProvider>
  </StrictMode>,
)
