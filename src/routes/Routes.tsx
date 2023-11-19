import { createHashRouter } from 'react-router-dom';

import NothingFound from '@/views/NothingFound/NothingFound';
import CardDetails from '../components/CardDetails/CardDetails';
import MainPage from '@/views/MainPage/MainPage';

const Routes = createHashRouter([
  {
    path: '/',
    element: <MainPage />,
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
