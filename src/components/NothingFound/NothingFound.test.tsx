import { expect, it } from 'vitest';
import { HashRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import NothingFound from './NothingFound';
import App from '../App/App';
import CardDetails from '../CardDetails/CardDetails';

describe('NothingFound component', () => {
  it('renders correctly NothingFound component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <NothingFound />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display a "Nothing found" page when following an incorrect route', () => {
    const BAD_ROUTE = '/bad/route';

    render(
      <MemoryRouter initialEntries={[BAD_ROUTE]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<CardDetails />} />
          </Route>
          <Route path="*" element={<NothingFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
  });
});
