import { useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Main searchQuery={searchQuery} />
    </>
  );
};

export default App;
