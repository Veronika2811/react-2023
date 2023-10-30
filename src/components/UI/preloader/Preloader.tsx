import { Component } from 'react';

import classes from './Preloader.module.css';

export default class Preloader extends Component {
  render() {
    return (
      <div className={classes.preloader__wrapper}>
        <div className={classes.preloader__inner}></div>
      </div>
    );
  }
}
