import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { expect, it } from 'vitest';
import { screen, fireEvent, render } from '@testing-library/react';

import CardDetails from './CardDetails';
import { DEFAULT_QUERY_PARAMS } from '@/utils/constants/constants';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';
import { MortyMock } from '@/mock/cardsMock';
import { createMockRouter } from '@/mock/createMockRouter';

describe('CardDetails component', () => {
  it('renders correctly CardDetails component', () => {
    const container = render(
      <RenderWithNextRouter>
        <CardDetails card={MortyMock} />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should display relevant character data CardDetails component', () => {
    render(
      <RenderWithNextRouter>
        <CardDetails card={MortyMock} />
      </RenderWithNextRouter>
    );

    const cardDetails = screen.getByTestId('card-details');
    expect(cardDetails).toBeInTheDocument();

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

  it('should close the component with character details and leave the existing ones query params', () => {
    const router = createMockRouter({
      query: {
        details: MortyMock.id.toString(),
        name: MortyMock.name,
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <CardDetails card={MortyMock} />
      </RouterContext.Provider>
    );

    const closeButton = screen.getByTestId('close-details');
    fireEvent.click(closeButton);

    expect(router.push).toHaveBeenCalledWith({
      query: {
        name: MortyMock.name,
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });
  });

  it('should close the character details component and set the query parameters to default', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <CardDetails card={MortyMock} />
      </RouterContext.Provider>
    );

    const closeButton = screen.getByTestId('close-details');
    fireEvent.click(closeButton);

    expect(router.push).toHaveBeenCalledWith({
      query: {
        page: DEFAULT_QUERY_PARAMS.currentPage,
        perPage: DEFAULT_QUERY_PARAMS.perPage,
      },
    });
  });
});
