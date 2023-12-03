import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to={`/`}>
        <button className="button">Main Page</button>
      </Link>
      <Link to={`/react-hook-form`}>
        <button className="button">React Hook Form</button>
      </Link>
      <Link to={`uncontrolled-form`}>
        <button className="button">Uncontrolled Form</button>
      </Link>
    </header>
  );
};

export default Header;
