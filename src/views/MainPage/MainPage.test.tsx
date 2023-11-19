import MainPage from './MainPage';
import renderWithProviders from '@/mock/renderWithProviders';

describe('MainPage component', () => {
  it('renders correctly MainPage component', () => {
    const container = renderWithProviders(<MainPage />);
    expect(container).toMatchSnapshot();
  });
});
