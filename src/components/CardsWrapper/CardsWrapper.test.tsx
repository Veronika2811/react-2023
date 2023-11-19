import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardsWrapper from './CardsWrapper';
import renderWithProviders from '@/mock/renderWithProviders';
import {
  AlbertMock,
  MortyMock,
  initialCharacterArrayMock,
} from '@/mock/cardsMock';
import { store } from '@/store/store';
import { charactersChangePerPage } from '@/store/slice/charactersSlice';

describe('CardsWrapper component', () => {
  it('renders correctly CardsWrapper component', () => {
    const container = renderWithProviders(
      <CardsWrapper cards={[MortyMock, AlbertMock]} currentPage={1} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display the specified number of cards', () => {
    renderWithProviders(
      <CardsWrapper cards={[MortyMock, AlbertMock]} currentPage={1} />
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
  });

  it('should render 10 cards', () => {
    store.dispatch(charactersChangePerPage(10));

    renderWithProviders(
      <CardsWrapper cards={initialCharacterArrayMock} currentPage={1} />,
      { store }
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(10);
  });
});
