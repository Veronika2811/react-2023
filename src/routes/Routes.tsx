import { createBrowserRouter } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';
import ReactHookFormPage from '../pages/ReactHookFormPage/ReactHookFormPage';
import UncontrolledFormPage from '../pages/UncontrolledFormPage/UncontrolledFormPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookFormPage />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledFormPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default Routes;
