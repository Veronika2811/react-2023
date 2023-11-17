import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import CardsWrapper from './CardsWrapper';
import { setupStore, store } from '../../redux/store/store';
import { charactersChangePerPage } from '../../redux/store/charactersSlice';
import RenderWithProviders from '../../redux/renderWithProviders';
import {
  AlbertMock,
  MortyMock,
  initialCharacterArrayMock,
} from '../../mock/cardsMock';

describe('CardsWrapper component', () => {
  it('renders correctly CardsWrapper component', () => {
    const container = render(
      <HashRouter>
        <Provider store={store}>
          <CardsWrapper cards={[MortyMock, AlbertMock]} currentPage={1} />
        </Provider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display the specified number of cards', () => {
    render(
      <HashRouter>
        <Provider store={store}>
          <CardsWrapper cards={[MortyMock, AlbertMock]} currentPage={1} />
        </Provider>
      </HashRouter>
    );
    const element = screen.getAllByTestId('card');
    expect(element).toHaveLength(2);
  });

  it.skip('should be displayed component, when there are no cards', () => {
    render(
      <HashRouter>
        <Provider store={store}>
          {/* <CardsWrapper cards={undefined} currentPage={1} /> */}
        </Provider>
      </HashRouter>
    );

    const element = screen.getByTestId('nothing-found');
    expect(element).toBeInTheDocument();
  });

  it('should render 10 cards', () => {
    const store = setupStore();
    store.dispatch(charactersChangePerPage(10));

    RenderWithProviders(
      <CardsWrapper cards={initialCharacterArrayMock} currentPage={1} />,
      { store }
    );

    const element = screen.getAllByTestId('card');
    expect(element).toHaveLength(10);
  });
});
