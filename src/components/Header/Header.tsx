import { NavLink } from 'react-router-dom';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <NavLink to={`/`}>
        <button className="button">Main Page</button>
      </NavLink>
      <NavLink to={`/react-hook-form`}>
        <button className="button">React Hook Form</button>
      </NavLink>
      <NavLink to={`uncontrolled-form`}>
        <button className="button">Uncontrolled Form</button>
      </NavLink>
    </header>
  );
};

export default Header;
