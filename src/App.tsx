import type { FC } from 'react';
import Page from './components/Page/Page';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Page />
    </ErrorBoundary>
  );
};

export default App;
