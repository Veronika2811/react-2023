import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import CONSTANTS_ROUTER from './constants/constantsRouter';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={CONSTANTS_ROUTER} />
  </React.StrictMode>
);
