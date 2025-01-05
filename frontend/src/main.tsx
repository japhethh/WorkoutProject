import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WorkoutContextProvider from './context/WorkoutContext.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <WorkoutContextProvider>
          <App />
        </WorkoutContextProvider>
      </QueryClientProvider>
    </BrowserRouter>

)
