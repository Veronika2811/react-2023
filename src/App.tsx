import { useState } from 'react';

import Header from './components/Header';
import Main from './pages/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <ErrorBoundary>
      <Header setSearchQuery={setSearchQuery} />
      <Main searchQuery={searchQuery} />
    </ErrorBoundary>
  );
};

export default App;
