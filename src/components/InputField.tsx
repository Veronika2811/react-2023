import { Component, FormEvent } from 'react';

import Button from './UI/button/Button';

interface IInputFieldProps {
  getDate: (query: string) => void;
}

interface IInputFieldState {
  value: string;
}

class InputField extends Component<IInputFieldProps, IInputFieldState> {
  constructor(props: IInputFieldProps) {
    super(props);
    this.state = {
      value:
        localStorage.getItem('Veronika2811-react-2023__searchRequest') || '',
    };
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'Veronika2811-react-2023__searchRequest',
      this.state.value.trim()
    );
    this.props.getDate(this.state.value);
  };

  handleChange = (searchRequest: string) => {
    this.setState({ value: searchRequest });
  };

  render() {
    return (
      <form className="input" onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter request"
          autoFocus
          className="input__box"
          value={this.state.value}
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    );
  }
}

export default InputField;
