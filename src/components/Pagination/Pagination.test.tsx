import { expect, it } from 'vitest';
import { screen, fireEvent, render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Pagination from './Pagination';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';
import { createMockRouter } from '@/mock/createMockRouter';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DEFAULT_QUERY_PARAMS,
} from '@/utils/constants/constants';
import { MortyMock } from '@/mock/cardsMock';

describe('Pagination component', () => {
  it('renders correctly Pagination component', () => {
    const container = render(
      <RenderWithNextRouter>
        <Pagination
          info={{
            count: 40,
            pages: 2,
          }}
        />
      </RenderWithNextRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display the number of pages when the "per page" value is 10', async () => {
    const router = createMockRouter({
      query: {
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: ADDITIONAL_VALUE_PER_PAGE,
        name: MortyMock.name,
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <Pagination
          info={{
            count: 40,
            pages: 2,
          }}
        />
      </RouterContext.Provider>
    );

    const nextPageButton = screen.getByTestId('next-page');
    const paginationResult = screen.getByTestId('pagination-result');

    fireEvent.click(nextPageButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: {
        page: '2',
        perPage: ADDITIONAL_VALUE_PER_PAGE,
        name: MortyMock.name,
      },
    });

    expect(paginationResult).toHaveTextContent(`1 / 4`);
  });

  it('should go to previous page', async () => {
    const router = createMockRouter({
      query: {
        page: '3',
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <Pagination
          info={{
            count: 40,
            pages: 2,
          }}
        />
      </RouterContext.Provider>
    );

    const prevPageButton = screen.getByTestId('prev-page');
    fireEvent.click(prevPageButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '2', perPage: DEFAULT_QUERY_PARAMS.perPage },
    });
  });

  it('should be called with default query params and go to next page', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Pagination
          info={{
            count: 40,
            pages: 2,
          }}
        />
      </RouterContext.Provider>
    );

    const nextPageButton = screen.getByTestId('next-page');
    fireEvent.click(nextPageButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '2', perPage: DEFAULT_QUERY_PARAMS.perPage },
    });
  });
});
