import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Automatically route API calls to current origin when running in production
if (import.meta.env.PROD) {
  const originalFetch = window.fetch;
  window.fetch = function (resource, init) {
    if (typeof resource === 'string') {
      resource = resource.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000\/api/, '/api');
      resource = resource.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000/, '');
    }
    return originalFetch(resource, init);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

