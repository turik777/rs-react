import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Modal', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');

  beforeEach(() => {
    document.body.appendChild(modalRoot);
  });

  it('renders the modal when isOpen is true', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} title="Test Title" onClose={onClose} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={false} title="Test Title" onClose={onClose} />);
    expect(screen.queryByText('Test Title')).toBeNull();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} title="Test Title" onClose={onClose} />);
    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} title="Test Title" onClose={onClose} />);
    fireEvent.click(screen.getByTestId('overlay'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when the modal content is clicked', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} title="Test Title" onClose={onClose} />);
    fireEvent.click(screen.getByText('Test Title'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when the escape key is pressed', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} title="Test Title" onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
