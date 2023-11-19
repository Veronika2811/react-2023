import { Component, ErrorInfo, ReactNode } from 'react';

import Button from '../UI/button/Button';

import classes from './ErrorBoundary.module.css';

interface IErrorBoundaryProps {
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  reloadPage = () => location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.error__wrapper}>
          <h1>Oops! Something went wrong!</h1>
          <Button type="button" onClick={this.reloadPage}>
            Repeat
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
