import { Provider } from 'react-redux';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Header from '@/components/Header/Header';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import { store } from '@/store/store';

const MainPage = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Header />
        <MainWrapper />
      </Provider>
    </ErrorBoundary>
  );
};

export default MainPage;
