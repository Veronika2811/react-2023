import { Component } from 'react';

import InputField from './InputField';
import Button from './UI/button/Button';

import './styles.css';

interface IHeaderProps {
  getDate: (query: string) => void;
}

interface IHeaderState {
  hasError: boolean;
}

class Header extends Component<IHeaderProps, IHeaderState> {
  state = {
    hasError: false,
  };

  getErrorOnPage = () => this.setState({ hasError: true });

  render() {
    if (this.state.hasError) {
      throw new Error('Something went wrong!');
    }

    return (
      <header className="header">
        <InputField getDate={this.props.getDate} />
        <Button type="button" onClick={this.getErrorOnPage}>
          Error
        </Button>
      </header>
    );
  }
}

export default Header;
