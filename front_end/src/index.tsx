import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* provider que fornece o contexto de autenticação para todo o app  */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
