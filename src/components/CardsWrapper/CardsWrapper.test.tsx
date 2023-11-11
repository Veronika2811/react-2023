import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import CardsWrapper from './CardsWrapper';
import { AlbertMock, MortyMock } from '../../mock/cardsMock';

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
});
