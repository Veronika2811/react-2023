import { expect, it } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import MainWrapper from './MainWrapper';
import renderWithProviders from '@/mock/renderWithProviders';
import { server } from '@/mock/api/server';
import { handlers } from '@/mock/api/handler';

describe('MainWrapper component', () => {
  it('renders correctly MainWrapper component', () => {
    const container = renderWithProviders(<MainWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('should show preloader', async () => {
    renderWithProviders(<MainWrapper />);

    await waitFor(() => {
      const loader = screen.getByTestId('preloader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('should be displayed component, when there are no cards', async () => {
    renderWithProviders(<MainWrapper />);

    await waitFor(() => {
      const element = screen.getByTestId('nothing-found');
      expect(element).toBeInTheDocument();
    });
  });

  it('should open detailed card component when clicking on card', async () => {
    renderWithProviders(<MainWrapper />);
    server.use(handlers[1]);

    expect(window.location.href).not.toContain('details');

    await waitFor(() => fireEvent.click(screen.getAllByTestId('card')[0]));

    await waitFor(() => expect(window.location.href).toContain('details'));
  });

  // it('should make an additional API call when clicking on the card', async () => {

  //   renderWithProviders(<MainWrapper />);
  //   server.use(handlers[1]);

  //   await waitFor(async () =>
  //   fireEvent.click(screen.getAllByTestId('card')[1])
  //   );
  //   const mockeduseGetCharacterItemQuery = vi.spyOn(
  //     mockApiSlice,
  //     'useGetCharactersQuery'
  //   );
  //     // store.dispatch(charactersChangeViewMode('2'));

  //   await waitFor(() => {
  //     expect(mockeduseGetCharacterItemQuery).toHaveBeenCalled();
  //   })
  // });
});
