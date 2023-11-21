import { expect, it } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardDetails from './CardDetails';
import renderWithProviders from '@/mock/renderWithProviders';
import * as useGetCharacterItemQuery from '@/api/apiSlice';
import { MortyMock } from '@/mock/cardsMock';
import { store } from '@/store/store';
import { charactersChangeViewMode } from '@/store/slice/charactersSlice';

describe('CardDetails component', () => {
  it('renders correctly CardDetails component', () => {
    const container = renderWithProviders(<CardDetails />);
    expect(container).toMatchSnapshot();
  });

  it('should display relevant character data CardDetails component', async () => {
    store.dispatch(charactersChangeViewMode('2'));
    renderWithProviders(<CardDetails />, { store });

    await waitFor(() => {
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
    renderWithProviders(<CardDetails />, { store });

    const cardDetails = screen.queryByTestId('card-details');

    await waitFor(() => expect(cardDetails).toBeInTheDocument());

    const closeButton = screen.getByTestId('close-details');
    fireEvent.click(closeButton);

    await waitFor(() => expect(cardDetails).not.toBeInTheDocument());
  });

  it('should make an additional API call when clicking on the card and check preloader', async () => {
    const spyAPIcall = vi.spyOn(
      useGetCharacterItemQuery,
      'useGetCharacterItemQuery'
    );

    renderWithProviders(<CardDetails />, { store });

    expect(spyAPIcall).toHaveBeenCalled();

    await waitFor(() => {
      const loader = screen.getByTestId('preloader');
      expect(loader).toBeInTheDocument();
    });
  });
});
