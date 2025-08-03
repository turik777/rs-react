import type { FC, MouseEvent } from 'react';
import type { Character } from '../../interface/interface';
import styles from './card.module.scss';
import { useCharStore } from '../../store/useStore';

interface IProps extends Character {
  size?: 'medium' | 'small';
  hover?: 'hover' | 'none';
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  checkbox?: boolean;
}

const Card: FC<IProps> = ({
  id,
  image,
  name,
  species,
  gender,
  status,
  size = 'medium',
  hover = 'none',
  onClick,
  checkbox = false,
}) => {
  const isSelected = useCharStore((state) =>
    id ? state.selectedCharIds.includes(id) : false
  );
  const toggleSelect = useCharStore((state) => state.toggle);

  function getStatusStyle(status: string) {
    switch (status) {
      case 'Alive':
        return styles.alive;
      case 'Dead':
        return styles.dead;
      default:
        return styles.unknown;
    }
  }

  return (
    <div
      className={`${styles.card} ${styles[size]} ${styles[hover]}`}
      onClick={onClick}
    >
      <img className={`${styles.image} ${styles[size]}`} src={image} alt="" />
      <p className={styles.name}>{name}</p>
      {species && (
        <div className={styles.info}>
          <span>Species: </span>
          <span>{species}</span>
        </div>
      )}
      {gender && (
        <div className={styles.info}>
          <span>Gender: </span>
          <span>{gender}</span>
        </div>
      )}
      {status && (
        <div className={styles.info}>
          <span>Status: </span>
          <span
            className={getStatusStyle(status)}
          >{` ${status?.toUpperCase()}`}</span>
        </div>
      )}
      {checkbox && (
        <div>
          <input
            type="checkbox"
            id={`favorite-${id}`}
            checked={isSelected}
            onChange={() => id && toggleSelect(id)}
          />
          <label htmlFor={`favorite-${id}`}>Add to favorite</label>
        </div>
      )}
    </div>
  );
};

export default Card;
