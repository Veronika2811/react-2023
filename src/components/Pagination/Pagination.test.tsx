import { useState } from 'react';
import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import Pagination from './Pagination';
import { store } from '../../redux/store/store';
import { DEFAULT_VALUE_PER_PAGE } from '../../constants/constants';

let currentPage = 1;
let mockSearchParam = `page=${currentPage}`;

vi.mock('react-router-dom', async () => {
  const actual = Object.assign(await vi.importActual('react-router-dom'));
  return {
    ...actual,
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );
      return [
        params,
        (setParam: (searchParams: URLSearchParams) => URLSearchParams) => {
          const newParams = setParam(params);
          mockSearchParam = newParams.toString();
          setParams(newParams);
        },
      ];
    },
  };
});

describe('Pagination component', () => {
  it('renders correctly Pagination component', () => {
    const container = render(
      <HashRouter>
        <Provider store={store}>
          <Pagination
            count={DEFAULT_VALUE_PER_PAGE * 2}
            currentPage={currentPage}
          />
        </Provider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should update the URL query parameter when the page changes', async () => {
    render(
      <HashRouter>
        <Provider store={store}>
          <Pagination
            count={DEFAULT_VALUE_PER_PAGE * 2}
            currentPage={currentPage}
          />
        </Provider>
      </HashRouter>
    );

    const nextPageButton = screen.getByTestId('next-page');

    expect(mockSearchParam).toContain(`page=${currentPage}`);

    await waitFor(() => {
      fireEvent.click(nextPageButton);

      expect(mockSearchParam).toContain(`page=${++currentPage}`);
    });
  });
});
