import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <Link to={`/react-hook-form`}>
        <button>React Hook Form</button>
      </Link>
      <Link to={`uncontrolled-form`}>
        <button>Uncontrolled Form</button>
      </Link>
    </div>
  );
};

export default MainPage;
