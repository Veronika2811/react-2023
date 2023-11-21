// return (id) => {

import CardDetails from '@/components/CardDetails/CardDetails';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

// }

export default function Details() {
  // const router = useRouter()

  // useEffect(() => {
  //   router.push('/?page=1', undefined, { shallow: true })
  // }, [])
 
  // useEffect(() => {

  // }, [router.query.page])


  return (
    <Provider store={store}>
      <CardDetails />
    </Provider>
  );
}