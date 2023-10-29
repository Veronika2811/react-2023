import { Component } from 'react';

import './styles.css';

export default class Preloader extends Component {
  render() {
    return (
      <div className="preloader__wrapper">
        <div className="preloader__inner"></div>
      </div>
    );
  }
}
