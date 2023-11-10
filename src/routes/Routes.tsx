import { createHashRouter } from 'react-router-dom';

import App from '../components/App/App';
import NothingFound from '../components/NothingFound/NothingFound';
import CardDetails from '../components/CardDetails/CardDetails';

const Routes = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NothingFound error="error-router" />,
    children: [
      {
        path: '',
        element: <CardDetails />,
      },
    ],
  },
]);

export default Routes;
