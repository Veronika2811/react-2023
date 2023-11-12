import { expect, it } from 'vitest';
import { HashRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import NothingFound from './NothingFound';
import App from '../App/App';
import CardDetails from '../CardDetails/CardDetails';

const useNavigateMock = vi.fn();

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
  const actual: Record<string, unknown> =
    await vi.importActual(`react-router-dom`);

  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

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

  it('should go to home page', () => {
    const BAD_ROUTE = '/bad/route';

    render(
      <MemoryRouter initialEntries={[BAD_ROUTE]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<CardDetails />} />
          </Route>
          <Route path="*" element={<NothingFound error="error-router" />} />
        </Routes>
      </MemoryRouter>
    );

    const nothingFoundButton = screen.getByTestId('nothing-found-button');

    fireEvent.click(nothingFoundButton);

    expect(useNavigateMock).toHaveBeenCalledWith('/');
  });
});
