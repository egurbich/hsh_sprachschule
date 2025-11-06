import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';

/*
  File: index.tsx
  Purpose: Application entry point that mounts the React tree.
  How: Creates a root with ReactDOM.createRoot and renders <App /> inside React.StrictMode.
  Props: none
  Hooks: none (entry point only)
  External: bootstrap CSS/JS and icons are imported globally here.
*/

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing in index.html');
}
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
