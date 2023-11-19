import '@testing-library/jest-dom';

import { server } from './api/server';
import { setupStore } from '@/store/store';
import { apiSlice } from '@/api/apiSlice';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});

afterAll(() => {
  vi.clearAllMocks();
  server.close();
});
