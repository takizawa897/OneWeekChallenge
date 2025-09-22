import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App'
import './index.css'

const root = createRoot(document.getElementById('root') as Element);
//createRoot(document.getElementById('root')!).render(
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

