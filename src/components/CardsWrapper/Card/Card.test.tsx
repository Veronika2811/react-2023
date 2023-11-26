import { expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Card from './Card';
import { MortyMock } from '@/mock/cardsMock';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';
import { createMockRouter } from '@/mock/createMockRouter';
import { DEFAULT_QUERY_PARAMS } from '@/utils/constants/constants';

describe('Card component', () => {
  it('renders correctly Card component', () => {
    const container = render(
      <RenderWithNextRouter>
        <Card card={MortyMock} />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should display relevant character data Card component', () => {
    render(
      <RenderWithNextRouter>
        <Card card={MortyMock} />
      </RenderWithNextRouter>
    );

    const { status, name, gender, species, location } = MortyMock;

    const STATUS = screen.getByText(status);
    expect(STATUS).toBeInTheDocument();

    const NAME = screen.getByText(name);
    expect(NAME).toBeInTheDocument();

    const GENDER = screen.getByText(`Gender: ${gender}`);
    expect(GENDER).toBeInTheDocument();

    const SPECIES = screen.getByText(`Species: ${species}`);
    expect(SPECIES).toBeInTheDocument();

    const LOCATION_NAME = screen.getByText(`Location: ${location.name}`);
    expect(LOCATION_NAME).toBeInTheDocument();
  });

  it('should preserve the existing name query params in the router and open the parts card when you click', () => {
    const router = createMockRouter({
      query: { name: MortyMock.name },
    });

    render(
      <RouterContext.Provider value={router}>
        <Card card={MortyMock} />
      </RouterContext.Provider>
    );

    const card = screen.getByTestId('card');
    fireEvent.click(card);

    expect(router.push).toBeCalledWith({
      pathname: '/',
      query: {
        details: MortyMock.id,
        name: MortyMock.name,
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });
  });

  it('should set the query parameters to default and open the parts card when you click', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Card card={MortyMock} />
      </RouterContext.Provider>
    );

    const card = screen.getByTestId('card');
    fireEvent.click(card);

    expect(router.push).toBeCalledWith({
      pathname: '/',
      query: {
        details: MortyMock.id,
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });
  });
});
