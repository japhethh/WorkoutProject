import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import WorkoutAdminContextProvider from './context/WorkoutAdminContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
      <BrowserRouter>
        <WorkoutAdminContextProvider>
          <App />
        </WorkoutAdminContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

