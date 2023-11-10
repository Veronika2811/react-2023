import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Header from '../Header/Header';
import MainWrapper from '../MainWrapper/MainWrapper';
import { CharactersProvider } from '../../context/CharactersProvider';

const App = () => {
  return (
    <ErrorBoundary>
      <CharactersProvider>
        <Header />
        <MainWrapper />
      </CharactersProvider>
    </ErrorBoundary>
  );
};

export default App;
