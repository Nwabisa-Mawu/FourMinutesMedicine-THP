import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import AuthProvider from './utils/context/AuthProvider.service.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <Router>
            <App />
        </Router>
    </AuthProvider>
  </React.StrictMode>,
)
