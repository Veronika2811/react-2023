import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
// import { HashRouter } from 'react-router-dom';
import type { PreloadedState } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

import { AppStore, RootState, setupStore } from '@/store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
      // <HashRouter>
        <Provider store={store}>{children}</Provider>
      // </HashRouter>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProviders;
