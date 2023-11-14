import { Provider } from 'react-redux';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Header from '../Header/Header';
import MainWrapper from '../MainWrapper/MainWrapper';
import { store } from '../../redux/store/store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Header />
        <MainWrapper />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
