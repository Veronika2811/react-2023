import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from './UI/button/Button';

interface IInputFieldProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ setSearchQuery }: IInputFieldProps) => {
  const [value, setValue] = useState<string>(
    localStorage.getItem('Veronika2811-react-2023__searchRequest') || ''
  );
  const [, setSearchParams] = useSearchParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'Veronika2811-react-2023__searchRequest',
      value.trim()
    );
    setSearchQuery(value);

    setSearchParams((searchParams) => {
      searchParams.set('page', '1');
      return searchParams;
    });
  };

  const handleChange = (searchRequest: string) => setValue(searchRequest);

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Enter request"
        autoFocus
        className="input__box"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default InputField;
