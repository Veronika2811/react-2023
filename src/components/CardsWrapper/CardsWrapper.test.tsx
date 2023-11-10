import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import CardsWrapper from './CardsWrapper';
import { Albert_Mock, Morty_Mock } from '../../mock/cardsMock';

describe('CardsWrapper component', () => {
  it('renders correctly', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <CardsWrapper cards={[Morty_Mock, Albert_Mock]} currentPage={1} />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display the specified number of cards', () => {
    render(
      <HashRouter>
        <CharactersProvider>
          <CardsWrapper cards={[Morty_Mock, Albert_Mock]} currentPage={1} />
        </CharactersProvider>
      </HashRouter>
    );
    const element = screen.queryAllByTestId('card');
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

    const element = screen.queryByTestId('nothing-found');
    expect(element).toBeInTheDocument();
  });
});
