import { expect, it } from 'vitest';
import { screen, fireEvent, render } from '@testing-library/react';

import ErrorButton from './ErrorButton';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';

describe('ErrorButton component', () => {
  it('renders correctly ErrorButton component', () => {
    const container = render(
      <RenderWithNextRouter>
        <ErrorButton />
      </RenderWithNextRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show an error', () => {
    render(
      <RenderWithNextRouter>
        <ErrorButton />
      </RenderWithNextRouter>
    );

    const errorButton = screen.getByTestId('error-button');

    expect(() => fireEvent.click(errorButton)).toThrow();
  });
});
