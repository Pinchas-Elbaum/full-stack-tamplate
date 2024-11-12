import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './providers/UserProvider.tsx'
import StarsContext from './providers/StarsProvider.tsx'
import SnakeBarProvider from './providers/SnakeBarProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
      <StarsContext>
        <SnakeBarProvider>
        <App />
        </SnakeBarProvider>
      </StarsContext>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
