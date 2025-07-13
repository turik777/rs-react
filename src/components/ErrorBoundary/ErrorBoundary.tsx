import React, { Component } from 'react';
import styles from './error-boundary.module.scss';
import Button from '../Button/Button';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  state: IState = { hasError: false };

  componentDidCatch(error: Error) {
    if (error) {
      this.setState({ hasError: true });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.fallback}>
          <p>Something went wrong.</p>
          <Button color="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
