import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout/Layout';
import { wrapper } from '@/api/store';

import '@/styles/globals.css';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
