import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/query';

const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
