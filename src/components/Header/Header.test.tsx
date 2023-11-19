import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

import Header from './Header';
import renderWithProviders from '@/mock/renderWithProviders';

describe('Header component', () => {
  it('renders correctly Header component', () => {
    const container = renderWithProviders(<Header />);
    expect(container).toMatchSnapshot();
  });
});
