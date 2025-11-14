import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{QueryClient,QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import {Toaster} from 'react-hot-toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <App />
        <Toaster 
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 }, // "error", NOT "Error"
            style: {
              fontSize: '16px',
              backgroundColor: '#fff',
              color: '#000',
              maxWidth: '50rem',
              padding: '1.6rem 2.4rem'
            }
          }}
        />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
)
