import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from './Card';
import renderWithProviders from '@/mock/renderWithProviders';
import { MortyMock } from '@/mock/cardsMock';

describe('Card component', () => {
  it('renders correctly Card component', () => {
    const container = renderWithProviders(<Card card={MortyMock} />);
    expect(container).toMatchSnapshot();
  });

  it('should display relevant character data Card component', () => {
    renderWithProviders(<Card card={MortyMock} />);

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
