import { Component } from 'react';
import './assets/styles/global.module.scss';
import Page from './components/Page/Page';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <Page />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
