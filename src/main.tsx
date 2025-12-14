import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { PrinterProvider } from './context/PrinterContext';
import { CartProvider } from './context/CartContext';
import { AppRouter } from './router/AppRouter';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AuthProvider>
          <PrinterProvider>
            <CartProvider>
              <AppRouter />
            </CartProvider>
          </PrinterProvider>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
