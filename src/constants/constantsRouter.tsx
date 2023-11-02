import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import CharacterDetailsWrapper from '../components/CharacterDetailsWrapper';

const CONSTANTS_ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <CharacterDetailsWrapper />,
      },
    ],
  },
]);

export default CONSTANTS_ROUTER;
