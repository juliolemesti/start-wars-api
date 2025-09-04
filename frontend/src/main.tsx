import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router/dom";
import './index.css';
import { router } from './routes';

const AppContent: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />  
    </div>
  );
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContent />
  </StrictMode>,
)
