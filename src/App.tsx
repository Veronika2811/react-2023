import { Component } from 'react';

import InputField from './components/InputField';

import './App.css';
import CardList from './components/CardList';

interface ICharacter {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

class App extends Component<{}, {items: ICharacter[]}> {
  constructor(props: {}) {
    super(props)
    this.state = {
      // error: null,
      // isLoaded: false,
      items: [],
    };
    this.getDate = this.getDate.bind(this);
  }

  getDate(query?: string) {
    const currentQuery = query || localStorage.getItem("searchRequest");

    fetch(
      `https://rickandmortyapi.com/api/character/${currentQuery ? `?name=${currentQuery}` : ''}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.results);
          this.setState({ items: result.results });
          // this.setState({
          //   // isLoaded: true,
          //   items: result.results,
          // });
        },
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error,
          // });
        }
      );
  };

  componentDidMount() {
    this.getDate();
  }

  render() {
    return (
      <>
        <InputField getDate={this.getDate} />
        <CardList items={this.state.items} />
      </>
    );
  }
}

export default App;
