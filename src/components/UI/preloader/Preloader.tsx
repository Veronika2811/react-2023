import classes from './Preloader.module.css';

const Preloader = () => {
  return (
    <div data-testid="preloader" className={classes.preloader__wrapper} >
      <div className={classes.preloader__inner}></div>
    </div>
  );
};

export default Preloader;
