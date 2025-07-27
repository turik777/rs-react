import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import About from './About';
import { BrowserRouter } from 'react-router';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('About', () => {
  it('renders about page element', () => {
    renderWithRouter(<About />);
    const info = screen.getByText('2025');
    expect(info).toBeInTheDocument();
  });
});
