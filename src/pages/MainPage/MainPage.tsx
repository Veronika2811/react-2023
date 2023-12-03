import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';

import CardList from '../../components/CardList/CardList';

const MainPage = () => {
  const users = useSelector((state: RootState) => state.FORM_SLICE.user);

  return (
    <div>
      <Link to={`/react-hook-form`}>
        <button>React Hook Form</button>
      </Link>
      <Link to={`uncontrolled-form`}>
        <button>Uncontrolled Form</button>
      </Link>
      {users.length && <CardList cardList={users} />}
    </div>
  );
};

export default MainPage;
