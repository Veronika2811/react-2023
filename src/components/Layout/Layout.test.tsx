import { expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Layout from './Layout';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';

describe('Layout component', () => {
  it('renders correctly Layout component', () => {
    const container = render(
      <RenderWithNextRouter>
        <Layout />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
