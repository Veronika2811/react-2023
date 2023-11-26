import { expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Header from './Header';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';

describe('Header component', () => {
  it('renders correctly Header component', () => {
    const container = render(
      <RenderWithNextRouter>
        <Header />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
