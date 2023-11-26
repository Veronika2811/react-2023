import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import SearchForm from './SearchForm';
import { DEFAULT_QUERY_PARAMS } from '@/utils/constants/constants';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';
import { createMockRouter } from '@/mock/createMockRouter';
import { AlbertMock } from '@/mock/cardsMock';

describe('SearchForm component', () => {
  it('renders correctly SearchForm component', () => {
    const container = render(
      <RenderWithNextRouter>
        <SearchForm />
      </RenderWithNextRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should set the query params to the entered value', () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <SearchForm />
      </RouterContext.Provider>
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: AlbertMock.name } });
    fireEvent.click(searchButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: {
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
        name: AlbertMock.name,
      },
    });
  });

  it('should set default query parameters if there is no query entered', () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <SearchForm />
      </RouterContext.Provider>
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(searchButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: {
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });
  });
});
