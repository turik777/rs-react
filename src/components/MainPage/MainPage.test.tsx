import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MainPage from './MainPage';
import { useFormStore } from '../../store/store';
import '@testing-library/jest-dom/vitest';

vi.mock('../../store/store', () => ({
  useFormStore: vi.fn(),
}));

const mockStore = {
  submittedForms: [],
  addForm: vi.fn(),
};

vi.mock('../ControlledForm/ControlledForm', () => ({
  default: vi.fn(({ onSubmit }) => (
    <form
      data-testid="controlled-form"
      onSubmit={() =>
        onSubmit({
          name: 'John Doe',
          age: 25,
          email: 'john.doe@example.com',
        })
      }
      aria-label="Controlled Form"
    ></form>
  )),
}));

vi.mock('../UncontrolledForm/UncontrolledForm', () => ({
  default: vi.fn(({ onSubmit }) => (
    <form
      data-testid="uncontrolled-form"
      onSubmit={() =>
        onSubmit({
          name: 'Jane Doe',
          age: 25,
          email: 'jane.doe@example.com',
        })
      }
      aria-label="Uncontrolled Form"
    ></form>
  )),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useFormStore).mockReturnValue(mockStore);
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

describe('MainPage', () => {
  it('renders the main page and opens/closes controlled form modal', () => {
    render(<MainPage />);
    expect(screen.getByText('Forms App')).toBeInTheDocument();
    expect(screen.getByText('Open Controlled Form')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Open Controlled Form'));
    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Controlled Form')).not.toBeInTheDocument();
  });

  it('opens and closes uncontrolled form modal', () => {
    render(<MainPage />);
    fireEvent.click(screen.getByText('Open Uncontrolled Form'));
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Uncontrolled Form')).not.toBeInTheDocument();
  });

  it('submits controlled form data and updates submitted data list', () => {
    render(<MainPage />);
    fireEvent.click(screen.getByText('Open Controlled Form'));
    const mockData = {
      name: 'John Doe',
      age: 25,
      email: 'john.doe@example.com',
    };
    const form = screen.getByTestId('controlled-form');
    fireEvent.submit(form, { target: mockData });
    expect(mockStore.addForm).toHaveBeenCalledWith(
      expect.objectContaining({
        ...mockData,
      })
    );
    expect(screen.queryByText('Controlled Form')).not.toBeInTheDocument();
  });

  it('submits uncontrolled form data and updates submitted data list', () => {
    render(<MainPage />);
    fireEvent.click(screen.getByText('Open Uncontrolled Form'));
    const mockData = {
      name: 'Jane Doe',
      age: 25,
      email: 'jane.doe@example.com',
    };
    const form = screen.getByTestId('uncontrolled-form');
    fireEvent.submit(form, { target: mockData });
    expect(mockStore.addForm).toHaveBeenCalledWith(
      expect.objectContaining({
        ...mockData,
      })
    );
    expect(screen.queryByText('Uncontrolled Form')).not.toBeInTheDocument();
  });
});
