import { useState, FormEvent } from 'react';

import Button from './UI/button/Button';

interface IInputFieldProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ setSearchQuery }: IInputFieldProps) => {
  const [value, setValue] = useState<string>(
    localStorage.getItem('Veronika2811-react-2023__searchRequest') || ''
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'Veronika2811-react-2023__searchRequest',
      value.trim()
    );
    setSearchQuery(value);
  };

  const handleChange = (searchRequest: string) => setValue(searchRequest);

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="text"
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
