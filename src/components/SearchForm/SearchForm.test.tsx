import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import SearchForm from './SearchForm';
import { setItemMock, getItemMock } from '../../mock/localStorageMock';

describe('SearchForm component', () => {
  const MOCK_KEY = 'Veronika2811-react-2023__searchRequest';
  const MOCK_VALUE = 'test-value';

  it('renders correctly SearchForm component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <SearchForm />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should save the entered value in local storage', () => {
    render(
      <HashRouter>
        <CharactersProvider>
          <SearchForm />
        </CharactersProvider>
      </HashRouter>
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: MOCK_VALUE } });
    fireEvent.click(searchButton);

    expect(setItemMock).toBeCalledWith(MOCK_KEY, MOCK_VALUE);
  });

  it('should get the value from local storage', () => {
    getItemMock.mockReturnValue(MOCK_KEY);

    render(
      <HashRouter>
        <CharactersProvider>
          <SearchForm />
        </CharactersProvider>
      </HashRouter>
    );

    expect(getItemMock).toHaveBeenCalledTimes(1);
  });
});
