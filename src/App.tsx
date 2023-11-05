import { useState } from 'react';

import Header from './components/Header';
import Main from './pages/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [perPage, setPerPage] = useState<number>(20);

  return (
    <ErrorBoundary>
      <Header setSearchQuery={setSearchQuery} setPerPage={setPerPage} />
      <Main searchQuery={searchQuery} perPage={perPage} />
    </ErrorBoundary>
  );
};

export default App;
