import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ErrorBoundary from './ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

const Child = () => {
  throw new Error();
};

describe('ErrorBoundary component', () => {
  it('renders correctly ErrorBoundary component', () => {
    const container = render(
      <HashRouter>
        <Provider store={store}>
          <ErrorBoundary />
        </Provider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should be displayed ErrorBoundary component', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText('Oops! Something went wrong!');
    expect(errorMessage).toBeDefined();
  });
});
