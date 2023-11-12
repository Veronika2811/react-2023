import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import ErrorBoundary from './ErrorBoundary';

const Child = () => {
  throw new Error();
};

describe('ErrorBoundary component', () => {
  it('renders correctly ErrorBoundary component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <ErrorBoundary />
        </CharactersProvider>
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
