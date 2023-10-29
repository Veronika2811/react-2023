import { Component } from 'react';

import errorSvg from '../assets/search-error.png';

class NothingFound extends Component {
  render() {
    return (
      <>
        <img className="icon" src={errorSvg} alt="Oops" />
        <h2>
          Sorry, but we couldn&apos;t find anything matching your request.
        </h2>
      </>
    );
  }
}

export default NothingFound;
