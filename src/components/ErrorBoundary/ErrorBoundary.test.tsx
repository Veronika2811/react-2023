import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ErrorBoundary from './ErrorBoundary';
import renderWithProviders from '@/mock/renderWithProviders';

const ChildErrorBoundary = () => {
  throw new Error('Testing ErrorBoundary component');
};

describe('ErrorBoundary component', () => {
  it('renders correctly ErrorBoundary component', () => {
    const container = renderWithProviders(<ErrorBoundary />);
    expect(container).toMatchSnapshot();
  });

  it('should be displayed ErrorBoundary component', () => {
    renderWithProviders(
      <ErrorBoundary>
        <ChildErrorBoundary />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText('Oops! Something went wrong!');
    expect(errorMessage).toBeDefined();
  });
});
