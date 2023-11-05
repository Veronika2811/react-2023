import { SetURLSearchParams } from 'react-router-dom';

interface ISelectProps {
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: SetURLSearchParams;
}

const Select = ({ setPerPage, setSearchParams }: ISelectProps) => {
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
