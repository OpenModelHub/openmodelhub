import ReactDOM from 'react-dom/client'
import './global.css'
import Router from './pages'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
