import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import SearchForm from './SearchForm';
import MainWrapper from '../MainWrapper/MainWrapper';
import { store } from '../../redux/store/store';

describe('SearchForm component', () => {
  const MOCK_KEY = 'Veronika2811-react-2023__searchRequest';
  const MOCK_VALUE = 'test-value';

  it('renders correctly SearchForm component', () => {
    const container = render(
      <HashRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should save the entered value in local storage', () => {
    render(
      <HashRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </HashRouter>
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: MOCK_VALUE } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem(MOCK_KEY)).toBe(MOCK_VALUE);
  });

  it('should get the value from local storage', () => {
    render(
      <HashRouter>
        <Provider store={store}>
          <SearchForm />
          <MainWrapper />
        </Provider>
      </HashRouter>
    );
    const searchInputValue = (
      screen.getByTestId('search-input') as HTMLInputElement
    ).value;

    waitFor(() => {
      expect(searchInputValue).toBe(MOCK_VALUE);
    });
  });
});
