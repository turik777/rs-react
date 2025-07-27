import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NotFound from './NotFound';
import { BrowserRouter } from 'react-router';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('NotFound', () => {
  it('renders elements', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('404')).toBeInTheDocument();
    expect(
      getByText('Sorry, the page you’re looking for doesn’t exist.')
    ).toBeInTheDocument();
  });
});
