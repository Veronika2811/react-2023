import { Component } from 'react';

import Header from './components/Header';
import Preloader from './components/UI/preloader/Preloader';
import fetchData from './services/fetchData';
import { ICharacter } from './types/types';

import './App.css';

interface IAppState {
  items: ICharacter[];
  isLoaded: boolean;
}

class App extends Component<Record<string, unknown>, IAppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  getDate = (query?: string) => {
    this.setState({ isLoaded: true });

    const currentQuery = query || localStorage.getItem('searchRequest') || '';

    setTimeout(() => {
      fetchData(currentQuery).then(
        (result) => {
          this.setState({ items: result.results, isLoaded: false });
        },
        (error) => {
          console.error(error);
          this.setState({
            isLoaded: true,
          });
        }
      );
    }, 1000)
  };

  componentDidMount = () => this.getDate();

  render() {
    return (
      <>
        <Header getDate={this.getDate} />
        {this.state.isLoaded && <Preloader />}
        {/* {!this.state.isLoaded && <CardList items={this.state.items} />} */}
      </>
    );
  }
}

export default App;
