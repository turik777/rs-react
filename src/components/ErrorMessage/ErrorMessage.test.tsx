import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './ErrorMessage';
import '@testing-library/jest-dom/vitest';

describe('ErrorMessage', () => {
  it('should display the error message when a string error exists', () => {
    const errors = {
      name: {
        type: 'required',
        message: 'This field is required',
      },
    };
    render(<ErrorMessage field="name" errors={errors} />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should not display an error message when no error exists', () => {
    const errors = {};
    render(<ErrorMessage field="name" errors={errors} />);
    const errorMessage = screen.queryByText('This field is required');
    expect(errorMessage).toBeNull();
  });
});
