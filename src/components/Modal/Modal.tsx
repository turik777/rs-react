import type { FC } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: FC<IProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    throw new Error('Modal root element was not found.');
  }

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <p className="text-2xl">{title}</p>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-500 text-4xl cursor-pointer"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
