import { render, fireEvent, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Custom404 from '@/pages/404';
import { DEFAULT_QUERY_PARAMS } from '@/utils/constants/constants';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';
import { createMockRouter } from '@/mock/createMockRouter';

describe('Custom404 page', () => {
  it('renders correctly Custom404 page', () => {
    const container = render(
      <RenderWithNextRouter>
        <Custom404 />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should go to the main page', () => {
    const router = createMockRouter({
      query: {
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <Custom404 />
      </RouterContext.Provider>
    );

    const nothingFoundButton = screen.getByTestId('nothing-found-button');
    fireEvent.click(nothingFoundButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
    });
  });
});
