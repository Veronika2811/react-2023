import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import CardsWrapper from './CardsWrapper';
import { ADDITIONAL_VALUE_PER_PAGE } from '@/utils/constants/constants';
import {
  AlbertMock,
  MortyMock,
  initialCharacterArrayMock,
} from '@/mock/cardsMock';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';

describe('CardsWrapper component', () => {
  it('renders correctly CardsWrapper component', () => {
    const container = render(
      <RenderWithNextRouter>
        <CardsWrapper cards={[MortyMock, AlbertMock]} />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should display the specified number of cards', () => {
    const MOCK_CARDS = [MortyMock, AlbertMock];

    render(
      <RenderWithNextRouter>
        <CardsWrapper cards={MOCK_CARDS} />
      </RenderWithNextRouter>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(MOCK_CARDS.length);
  });

  it('should render 10 cards', () => {
    render(
      <RenderWithNextRouter
        queryParams={{ perPage: ADDITIONAL_VALUE_PER_PAGE }}
      >
        <CardsWrapper cards={initialCharacterArrayMock} />
      </RenderWithNextRouter>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(+ADDITIONAL_VALUE_PER_PAGE);
  });
});
