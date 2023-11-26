import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import MainWrapper from './MainWrapper';
import { initialCharacterArrayMock, MortyMock } from '@/mock/cardsMock';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';

describe('MainWrapper component', () => {
  it('renders correctly MainWrapper component', () => {
    const container = render(
      <RenderWithNextRouter>
        <MainWrapper
          data={{
            info: { count: 60, pages: 3 },
            results: initialCharacterArrayMock,
          }}
        />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should display the details section if 'card' is passed to the component", () => {
    render(
      <RenderWithNextRouter>
        <MainWrapper
          data={{
            info: { count: 60, pages: 3 },
            results: initialCharacterArrayMock,
          }}
          card={MortyMock}
        />
      </RenderWithNextRouter>
    );

    const cardDetails = screen.getByTestId('card-details');
    expect(cardDetails).toBeInTheDocument();
  });
});
