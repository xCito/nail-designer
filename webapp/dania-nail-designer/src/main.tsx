import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import App from './App.tsx';
import '@/styles/style.css';

history.scrollRestoration = "manual";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
