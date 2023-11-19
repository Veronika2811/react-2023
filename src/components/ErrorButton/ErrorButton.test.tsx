import { expect, it } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ErrorButton from './ErrorButton';
import renderWithProviders from '@/mock/renderWithProviders';

describe('ErrorButton component', () => {
  it('renders correctly ErrorButton component', () => {
    const container = renderWithProviders(<ErrorButton />);
    expect(container).toMatchSnapshot();
  });

  it('should show an error', () => {
    renderWithProviders(<ErrorButton />);

    const errorButton = screen.getByTestId('error-button');

    expect(() => fireEvent.click(errorButton)).toThrow();
  });
});
