import { expect, it } from 'vitest';
import { HashRouter, RouterProvider } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import Card from './Card';
import Routes from '../../routes/Routes';
import { MortyMock } from '../../mock/cardsMock';

describe('Card component', () => {
  it('renders correctly Card component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <Card card={MortyMock} />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display relevant character data Card component', () => {
    render(
      <HashRouter>
        <CharactersProvider>
          <Card card={MortyMock} />
        </CharactersProvider>
      </HashRouter>
    );

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

  it('should open detailed map component when clicking on map', async () => {
    render(<RouterProvider router={Routes} />);

    const cardDetails = screen.queryByTestId('card-details');

    expect(cardDetails).not.toBeInTheDocument();

    await waitFor(async () =>
      fireEvent.click(screen.getAllByTestId('card')[1])
    );

    await waitFor(() => {
      const cardDetails = screen.getByTestId('card-details');
      expect(cardDetails).toBeInTheDocument();
    });
  });
});
