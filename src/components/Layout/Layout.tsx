import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

import classes from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
