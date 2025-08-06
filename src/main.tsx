import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './ASST/css/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import { InputProvider } from 'Context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InputProvider>
      <App />
    </InputProvider>
  </StrictMode>,
)
