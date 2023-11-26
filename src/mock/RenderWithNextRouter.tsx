import React, { ReactNode } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { createMockRouter } from './createMockRouter';

interface IRenderWithNextRouter {
  queryParams?: { [key: string]: string };
  children: ReactNode;
}

const RenderWithNextRouter = ({
  queryParams = {},
  children,
}: IRenderWithNextRouter) => {
  const { Provider } = RouterContext;

  console.log(children);

  return (
    <Provider value={createMockRouter({ query: queryParams })}>
      {children}
    </Provider>
  );
};

export default RenderWithNextRouter;
