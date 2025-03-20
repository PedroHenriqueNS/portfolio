import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Set the color theme by default
document.documentElement.classList.toggle(
  "dark",
  localStorage.getItem('data-theme') === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
