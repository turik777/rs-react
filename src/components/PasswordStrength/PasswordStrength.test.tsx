import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import PasswordStrength from './PasswordStrength';
import '@testing-library/jest-dom/vitest';

afterEach(cleanup);

describe('PasswordStrength', () => {
  it('displays correct strength and color for weak password', () => {
    const { rerender } = render(<PasswordStrength password="" />);
    const bar = screen.getByTestId('strength-bar');
    expect(bar).toHaveStyle('width: 0%');
    expect(bar).toHaveClass('bg-red-500');
    rerender(<PasswordStrength password="abc" />);
    expect(bar).toHaveStyle('width: 20%');
    expect(bar).toHaveClass('bg-red-500');
  });

  it('displays correct strength and color for medium password', () => {
    const { rerender } = render(<PasswordStrength password="abcdeF" />);
    const bar = screen.getByTestId('strength-bar');
    expect(bar).toHaveStyle('width: 40%');
    expect(bar).toHaveClass('bg-orange-500');
    rerender(<PasswordStrength password="abcdeF1" />);
    expect(bar).toHaveStyle('width: 60%');
    expect(bar).toHaveClass('bg-yellow-500');
  });

  it('displays correct strength and color for strong password', () => {
    const { rerender } = render(<PasswordStrength password="abcdeF1!" />);
    const bar = screen.getByTestId('strength-bar');
    rerender(<PasswordStrength password="abcdeF1!" />);
    expect(bar).toHaveStyle('width: 100%');
    expect(bar).toHaveClass('bg-green-500');
  });
});
