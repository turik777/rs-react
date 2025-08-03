import type { FC } from 'react';
import styles from './button.module.scss';
import { useTheme } from '../../utils/hooks/useTheme';

interface IProps {
  children: string;
  color: 'primary' | 'error';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<IProps> = ({ children, color, onClick, disabled }) => {
  const { theme } = useTheme();

  return (
    <button
      className={`${styles.button} ${styles[color]} ${styles[theme]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
