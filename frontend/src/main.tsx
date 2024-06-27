import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WorkoutContextProvider from './context/WorkoutContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <WorkoutContextProvider>
    <App />
  </WorkoutContextProvider>
)
