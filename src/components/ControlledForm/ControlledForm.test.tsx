import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ControlledForm from './ControlledForm';

vi.mock('../Button/Button', () => ({
  default: vi.fn(({ children, ...props }) => (
    <button {...props}>{children}</button>
  )),
}));

vi.mock('../ErrorMessage/ErrorMessage', () => ({
  default: vi.fn(({ errors, field }) => {
    if (errors[field]) {
      return <div>{errors[field].message}</div>;
    }
    return null;
  }),
}));

vi.mock('../PasswordStrength/PasswordStrength', () => ({
  default: vi.fn(() => <div>Password Strength</div>),
}));

vi.mock('../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn((file) => Promise.resolve(`base64-${file.name}`)),
}));

const mockOnSubmit = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  render(<ControlledForm onSubmit={mockOnSubmit} />);
});

describe('ControlledForm', () => {
  it('render all form fields and the submit button', () => {
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Male/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profile Picture/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Accept Terms and Conditions/i)
    ).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('initially disable the submit button', () => {
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('show validation errors for invalid input', async () => {
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { value: '-1' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test-email' },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'test' },
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Name must start with an uppercase letter./i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Age must be a positive number./i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address./i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters long./i)
      ).toBeInTheDocument();
    });
  });

  it('show password confirmation error if passwords do not match', async () => {
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'Albania' },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'Password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'DifferentPassword' },
    });
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match./i)).toBeInTheDocument();
    });
  });
});
