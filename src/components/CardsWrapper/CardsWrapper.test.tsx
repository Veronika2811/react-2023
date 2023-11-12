import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import CardsWrapper from './CardsWrapper';
import {
  AlbertMock,
  MortyMock,
  initialCharacterArrayMock,
} from '../../mock/cardsMock';
import { CharactersContext } from '../../context/context';

describe('CardsWrapper component', () => {
  it('renders correctly CardsWrapper component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <CardsWrapper cards={[MortyMock, AlbertMock]} currentPage={1} />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display the specified number of cards', () => {
    render(
      <HashRouter>
        <CharactersProvider>
          <CardsWrapper cards={[MortyMock, AlbertMock]} currentPage={1} />
        </CharactersProvider>
      </HashRouter>
    );
    const element = screen.getAllByTestId('card');
    expect(element).toHaveLength(2);
  });

  it('should be displayed component, when there are no cards', () => {
    render(
      <HashRouter>
        <CharactersProvider>
          <CardsWrapper cards={undefined} currentPage={1} />
        </CharactersProvider>
      </HashRouter>
    );

    const element = screen.getByTestId('nothing-found');
    expect(element).toBeInTheDocument();
  });

  it('should render 10 cards', () => {
    render(
      <HashRouter>
        <CharactersContext.Provider
          value={{
            searchQuery: '',
            setSearchQuery: vi.fn(),
            perPage: 10,
            setPerPage: vi.fn(),
            data: null,
            setData: vi.fn(),
            detailedCard: '',
            setDetailedCard: vi.fn(),
          }}
        >
          <CardsWrapper cards={initialCharacterArrayMock} currentPage={1} />
        </CharactersContext.Provider>
      </HashRouter>
    );

    const element = screen.getAllByTestId('card');
    expect(element).toHaveLength(10);
  });
});
