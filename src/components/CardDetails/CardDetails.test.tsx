import { expect, it } from 'vitest';
import { HashRouter, RouterProvider } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import CardDetails from './CardDetails';
import { CharactersContext } from '../../context/context';
import { MortyMock } from '../../mock/cardsMock';
import Routes from '../../routes/Routes';

describe('CardDetails component', () => {
  it('renders correctly CardDetails component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <CardDetails />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display relevant character data CardDetails component', async () => {
    render(
      <HashRouter>
        <CharactersContext.Provider
          value={{
            searchQuery: '',
            setSearchQuery: vi.fn(),
            perPage: 20,
            setPerPage: vi.fn(),
            data: null,
            setData: vi.fn(),
            detailedCard: '2',
            setDetailedCard: vi.fn(),
          }}
        >
          <CardDetails />
        </CharactersContext.Provider>
      </HashRouter>
    );

    await waitFor(async () => {
      const cardDetails = screen.getByTestId('card-details');

      expect(cardDetails).toBeInTheDocument();

      const { status, image, name, gender, species, location } = MortyMock;

      const STATUS = screen.getByText(status);
      expect(STATUS).toBeInTheDocument();

      const CARD_IMAGE = screen.queryByTestId('card-image') as HTMLImageElement;
      expect(CARD_IMAGE.src).toContain(image);
      expect(CARD_IMAGE.alt).toContain(name);

      const NAME = screen.getByText(name);
      expect(NAME).toBeInTheDocument();

      const GENDER = screen.getByText(`Gender: ${gender}`);
      expect(GENDER).toBeInTheDocument();

      const SPECIES = screen.getByText(`Species: ${species}`);
      expect(SPECIES).toBeInTheDocument();

      const LOCATION_NAME = screen.getByText(`Location: ${location.name}`);
      expect(LOCATION_NAME).toBeInTheDocument();
    });
  });

  it('should close the component with character details', async () => {
    render(<RouterProvider router={Routes} />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId('card')[1]);
    });

    await waitFor(() => {
      const cardDetails = screen.queryByTestId('card-details');
      expect(cardDetails).toBeInTheDocument();

      const closeButton = screen.getByTestId('close-details');
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      const cardDetails = screen.queryByTestId('card-details');
      expect(cardDetails).not.toBeInTheDocument();
    });
  });

  it('should show preloader', async () => {
    render(<RouterProvider router={Routes} />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId('card')[1]);
    });

    await waitFor(() => {
      const loader = screen.getByTestId('preloader');
      expect(loader).toBeInTheDocument();
    });
  });
});
