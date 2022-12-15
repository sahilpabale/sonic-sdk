import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SonicProvider } from '@0xsonic/sdk';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SonicProvider>
      <App />
    </SonicProvider>
  </React.StrictMode>
);
