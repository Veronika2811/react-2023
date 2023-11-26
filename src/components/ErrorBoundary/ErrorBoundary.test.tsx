import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

const ChildErrorBoundary = () => {
  throw new Error('Testing ErrorBoundary component');
};

describe('ErrorBoundary component', () => {
  it('renders correctly ErrorBoundary component', () => {
    const container = render(<ErrorBoundary />);
    expect(container).toMatchSnapshot();
  });

  it('should be displayed ErrorBoundary component', () => {
    render(
      <ErrorBoundary>
        <ChildErrorBoundary />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText('Oops! Something went wrong!');
    expect(errorMessage).toBeDefined();
  });
});
