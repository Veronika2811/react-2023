import { Component } from 'react';

import InputField from './components/InputField';

import './App.css';

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
  };

  getDate = (query?: string) => {
    fetch(
      `https://rickandmortyapi.com/api/character/
      ${query ? `?name=${query}` : ''}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
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
      </>
    );
  }
}

export default App;
