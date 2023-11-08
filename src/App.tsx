import Header from './components/Header';
import Main from './pages/MainPage/MainPage';
import { CharactersProvider } from './context/CharactersProvider';

import './App.css';

const App = () => {
  return (
    <CharactersProvider>
      <Header />
      <Main />
    </CharactersProvider>
  );
};

export default App;
