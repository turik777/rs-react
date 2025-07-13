import { Component } from 'react';
import styles from './button.module.scss';

interface IProps {
  children: string;
  color: 'primary' | 'error';
  onClick: () => void;
}

class Button extends Component<IProps> {
  render() {
    const { children, color, onClick } = this.props;

    return (
      <button className={`${styles.button} ${styles[color]}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
