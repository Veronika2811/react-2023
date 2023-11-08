import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import CONSTANTS_ROUTER from './constants/constantsRouter';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={CONSTANTS_ROUTER} />
    </ErrorBoundary>
  </React.StrictMode>
);
