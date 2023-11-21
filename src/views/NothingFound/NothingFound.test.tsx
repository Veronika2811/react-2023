import { Provider } from 'react-redux';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it } from 'vitest';
import { 
  // fireEvent, 
  render,
  // screen
 } from '@testing-library/react';
import '@testing-library/jest-dom';

import NothingFound from './NothingFound';
// import MainPage from '@/views/MainPage/MainPage';
// import CardDetails from '@/components/CardDetails/CardDetails';
import { store } from '@/store/store';

// const useNavigateMock = vi.fn();

// vi.mock(`react-router-dom`, async (): Promise<unknown> => {
//   const actual: Record<string, unknown> =
//     await vi.importActual(`react-router-dom`);

//   return {
//     ...actual,
//     useNavigate: () => useNavigateMock,
//   };
// });

describe('NothingFound component', () => {
  it('renders correctly NothingFound component', () => {
    const container = render(
      // <MemoryRouter>
        <Provider store={store}>
          <NothingFound />
        </Provider>
      // </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  // it('should display a "Nothing found" page when following an incorrect route', () => {
  //   const BAD_ROUTE = '/bad/route';

  //   render(
  //     // <MemoryRouter initialEntries={[BAD_ROUTE]}>
  //     //   <Routes>
  //     //     <Route path="/" element={<MainPage />}>
  //     //       <Route path="" element={<CardDetails />} />
  //     //     </Route>
  //     //     <Route path="*" element={<NothingFound />} />
  //     //   </Routes>
  //     // </MemoryRouter>
  //   );

  //   // expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
  // });

  // it('should go to home page', () => {
  //   const BAD_ROUTE = '/bad/route';

  //   render(
  //     <MemoryRouter initialEntries={[BAD_ROUTE]}>
  //       <Routes>
  //         <Route path="/" element={<MainPage />}>
  //           <Route path="" element={<CardDetails />} />
  //         </Route>
  //         <Route path="*" element={<NothingFound error="error-router" />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const nothingFoundButton = screen.getByTestId('nothing-found-button');

  //   fireEvent.click(nothingFoundButton);

  //   expect(useNavigateMock).toHaveBeenCalledWith('/');
  // });
});
