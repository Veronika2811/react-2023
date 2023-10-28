import { Component, FormEvent } from 'react';

interface InputFieldProps {
  value: string;
}

class InputField extends Component<
  { getDate: (request: string) => void },
  InputFieldProps
> {
  constructor(props: { getDate: (request: string) => void }) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    localStorage.setItem('searchRequest', this.state.value);
    this.props.getDate(this.state.value);
  }

  handleChange(searchRequest: string) {
    this.setState({ value: searchRequest.trim() });
  }

  render() {
    return (
      <form className="input" onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter request"
          className="input__box"
          value={this.state.value}
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <button type="submit" className="input__submit">
        Search
        </button>
      </form>
    );
  }
}

export default InputField;
