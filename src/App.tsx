import { Component } from 'react';

import Header from './components/Header';
import Preloader from './components/UI/preloader/Preloader';
import CharactersWrapper from './components/CharactersWrapper';
import fetchData from './services/fetchData';
import { ICharacter } from './types/types';

import './App.css';

interface IAppState {
  characters: ICharacter[];
  isLoaded: boolean;
  // hasError: boolean;
}

class App extends Component<Record<string, unknown>, IAppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      characters: [],
      isLoaded: false,
    };
  }

  getDate = (query?: string) => {
    this.setState({ isLoaded: true });

    const currentQuery = query || localStorage.getItem('searchRequest') || '';

    fetchData(currentQuery).then(
      (result) => {
        this.setState({ characters: result.results, isLoaded: false });
      },
      (error) => {
        console.error(error);
        this.setState({
          isLoaded: true,
        });
      }
    );
  };

  componentDidMount = () => this.getDate();

  render() {
    return (
      <>
        <Header getDate={this.getDate} />
        {this.state.isLoaded && <Preloader />}
        {!this.state.isLoaded && (
          <CharactersWrapper characters={this.state.characters} />
        )}
      </>
    );
  }
}

export default App;
