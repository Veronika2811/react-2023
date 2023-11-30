import { createBrowserRouter } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';
import ReactHookFormPage from '../pages/ReactHookFormPage/ReactHookFormPage';
import UncontrolledFormPage from '../pages/UncontrolledFormPage/UncontrolledFormPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookFormPage />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledFormPage />,
  },
]);

export default Routes;