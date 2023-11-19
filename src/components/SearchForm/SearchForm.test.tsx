import { expect, it } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import SearchForm from './SearchForm';
import renderWithProviders from '@/mock/renderWithProviders';

describe('SearchForm component', () => {
  const MOCK_KEY = 'Veronika2811-react-2023__searchRequest';
  const MOCK_VALUE = 'test-value';

  it('renders correctly SearchForm component', () => {
    const container = renderWithProviders(<SearchForm />);
    expect(container).toMatchSnapshot();
  });

  it('should save the entered value in local storage', () => {
    renderWithProviders(<SearchForm />);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: MOCK_VALUE } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem(MOCK_KEY)).toBe(MOCK_VALUE);
  });

  it('should get the value from local storage', () => {
    renderWithProviders(<SearchForm />);

    const searchInputValue = (
      screen.getByTestId('search-input') as HTMLInputElement
    ).value;

    waitFor(() => expect(searchInputValue).toBe(MOCK_VALUE));
  });
});
