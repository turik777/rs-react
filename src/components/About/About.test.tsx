import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import About from './About';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );

describe('About', () => {
  it('renders about page element', () => {
    renderWithRouter(<About />);
    const info = screen.getByText('2025');
    expect(info).toBeInTheDocument();
  });
});
