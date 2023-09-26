import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from '../pages';
import { persistor, store } from '../store';
import Mantine from './mantine';

const queryClient = new QueryClient();
export default function Providers() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Mantine>
              <Navigator />
            </Mantine>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
