import { useContext } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { CharactersContext } from '../context/context';

interface ISelectProps {
  setSearchParams: SetURLSearchParams;
}

const Select = ({ setSearchParams }: ISelectProps) => {
  const { setPerPage } = useContext(CharactersContext);

  return (
    <select
      className="select"
      name="count-elements"
      onChange={(e) => {
        setPerPage(+e.target.value);
        setSearchParams((searchParams) => {
          searchParams.set('page', '1');
          return searchParams;
        });
      }}
    >
      <option value="20">20 cards</option>
      <option value="10">10 cards</option>
    </select>
  );
};

export default Select;
