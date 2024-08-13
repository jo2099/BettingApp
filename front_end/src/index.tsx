import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/auth';
import { UserProvider } from './hooks/userData';
import { SSEProvider } from './hooks/SSE';
import { GameDataProvider } from './hooks/gameData';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <SSEProvider>
      <UserProvider>
      <AuthProvider>  {/* provider que fornece o contexto de autenticação para todo o app  */}
        <GameDataProvider>
          <App />
        </GameDataProvider>
      </AuthProvider>
        </UserProvider>
    </SSEProvider>
  // </React.StrictMode>
);
