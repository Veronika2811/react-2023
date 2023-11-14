import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import Header from './Header';
import { store } from '../../redux/store/store';

describe('Header component', () => {
  it('renders correctly Header component', () => {
    const container = render(
      <HashRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show an error', () => {
    render(
      <HashRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </HashRouter>
    );

    const errorButton = screen.getByTestId('error-button');

    expect(() => fireEvent.click(errorButton)).toThrow();
  });
});
