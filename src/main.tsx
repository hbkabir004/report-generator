import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-phone-input-2/lib/style.css'
import 'react-phone-number-input/style.css'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
