import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>

  </StrictMode>,
)
