import Head from 'next/head';
import { ReactNode } from 'react';

import Header from '../Header/Header';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <ErrorBoundary>
        <Header />
        <main>{children}</main>
      </ErrorBoundary>
    </>
  );
};

export default Layout;
