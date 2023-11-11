import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import Header from './Header';

describe('Header component', () => {
  it('renders correctly Header component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <Header />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show an error', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <Header />
        </CharactersProvider>
      </HashRouter>
    );

    const errorButton = screen.getByTestId('error-button');

    expect(() => fireEvent.click(errorButton)).toThrow();
  });
});
