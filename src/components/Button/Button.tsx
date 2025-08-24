import type { ButtonHTMLAttributes, FC } from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <button
      className={`
      button
      ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
