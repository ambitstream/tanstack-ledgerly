import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { worker } from './mocks/browser.ts';
import './index.css'
import App from './App.tsx'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const init = async () => {
    const queryClient = new QueryClient();

    if (import.meta.env.DEV) {
      await worker.start();
    }
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </StrictMode>,
    )
}

init();