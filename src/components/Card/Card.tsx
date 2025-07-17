import { Component } from 'react';
import type { Character } from '../../utils/interface';
import styles from './card.module.scss';

class Card extends Component<Character> {
  render() {
    const { image, name, species, gender, status } = this.props;
    return (
      <div className={styles.card}>
        <img className={styles.image} src={image} alt="" />
        <p className={styles.name}>{name}</p>
        <div className={styles.info}>
          <span>Species: </span>
          <span>{species}</span>
        </div>
        <div className={styles.info}>
          <span>Gender: </span>
          <span>{gender}</span>
        </div>
        <div className={styles.info}>
          <span>Status: </span>
          <span
            className={
              status === 'Alive'
                ? styles.alive
                : status === 'Dead'
                  ? styles.dead
                  : styles.unknown
            }
          >
            {` ${status.toUpperCase()}`}
          </span>
        </div>
      </div>
    );
  }
}

export default Card;
