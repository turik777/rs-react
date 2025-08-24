import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import '@testing-library/jest-dom/vitest';

describe('Button', () => {
  it('render with children', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('apply custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('button', 'custom-class');
  });

  it('call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
