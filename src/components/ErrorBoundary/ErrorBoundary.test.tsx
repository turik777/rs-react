import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from '../../context/ThemeProvider';

describe('ErrorBoundary', () => {
  it('renders fallback UI when there is an error', () => {
    const ThrowError = () => {
      throw Error('Error test message');
    };
    render(
      <ThemeProvider>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </ThemeProvider>
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders element when no error is thrown', () => {
    render(
      <ThemeProvider>
        <ErrorBoundary>
          <div data-testid="test element">Test Element</div>
        </ErrorBoundary>
      </ThemeProvider>
    );
    expect(screen.getByTestId('test element')).toBeInTheDocument();
  });
});
