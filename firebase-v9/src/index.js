import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Learning from './Learning';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Learning /> */}
    <Login />
  </React.StrictMode>
);
