import { expect, it } from 'vitest';
import { screen, fireEvent, render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Select from './Select';
import {
  ADDITIONAL_VALUE_PER_PAGE,
  DEFAULT_QUERY_PARAMS,
  DEFAULT_VALUE_PER_PAGE,
} from '@/utils/constants/constants';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';
import { createMockRouter } from '@/mock/createMockRouter';
import { AlbertMock } from '@/mock/cardsMock';

describe('Select component', () => {
  it('renders correctly Select component', () => {
    const container = render(
      <RenderWithNextRouter>
        <Select />
      </RenderWithNextRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should check the changes Select component', () => {
    render(
      <RenderWithNextRouter
        queryParams={{ perPage: DEFAULT_VALUE_PER_PAGE.toString() }}
      >
        <Select />
      </RenderWithNextRouter>
    );
    const options = screen.getAllByTestId('option') as HTMLOptionElement[];
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: ADDITIONAL_VALUE_PER_PAGE },
    });

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
  });

  it('should keep name from query params and go to 1 page when changing per page', () => {
    const router = createMockRouter({
      query: {
        name: AlbertMock.name,
        page: '5',
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <Select />
      </RouterContext.Provider>
    );

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: ADDITIONAL_VALUE_PER_PAGE },
    });

    expect(router.push).toBeCalledWith({
      pathname: '/',
      query: {
        page: '1',
        perPage: ADDITIONAL_VALUE_PER_PAGE,
        name: AlbertMock.name,
      },
    });
  });
});
