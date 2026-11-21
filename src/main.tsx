import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// O tema é aplicado por um script inline no <head>, antes da primeira pintura.
const root = document.getElementById('root')!
const app = <App pathname={window.location.pathname} />

// Páginas pré-renderizadas chegam com o HTML pronto: o React só se conecta a ele.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
