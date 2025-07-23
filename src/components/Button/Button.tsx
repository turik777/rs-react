import type { FC } from 'react';
import styles from './button.module.scss';

interface IProps {
  children: string;
  color: 'primary' | 'error';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<IProps> = ({ children, color, onClick }) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
