import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import CardList from '../../components/CardList/CardList';

const MainPage = () => {
  const users = useSelector((state: RootState) => state.FORM_SLICE.users);

  return (
    <>
      <h1 className="title">Main Page</h1>
      {!!users.length ? <CardList users={users} /> : <p>No Users Cards</p>}
    </>
  );
};

export default MainPage;
