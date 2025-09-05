import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import './index.css';
import { ApplicationRouterProvider } from './routes';

const AppContent: React.FC = () => {
  const { loading } = useAuthContext()

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen gap-2'>
        <div className='animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500' />
        <span className='text-gray-500 text-base'>
          Loading...
        </span>
      </div>
    )
  }

  return <ApplicationRouterProvider />
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </StrictMode>,
)
