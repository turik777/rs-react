import type { FC, MouseEvent } from 'react';
import type { Character } from '../../interface/interface';
import styles from './card.module.scss';
import { useCharStore } from '../../store/useStore';
import { useTheme } from '../../utils/hooks/useTheme';
import { useTranslations } from 'next-intl';

interface IProps extends Character {
  size?: 'medium' | 'small';
  hover?: 'hover' | 'none';
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  checkbox?: boolean;
  character: Character;
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
  character,
}) => {
  const isSelected = useCharStore((state) => state.isSelected(id));
  const toggleSelect = useCharStore((state) => state.toggle);
  const { theme } = useTheme();

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

  const t = useTranslations('HomePage');

  return (
    <div
      className={`${styles.card} ${styles[size]} ${styles[hover]} ${styles[theme]}`}
      onClick={onClick}
    >
      <img className={`${styles.image} ${styles[size]}`} src={image} alt="" />
      <p className={styles.name}>{name}</p>
      {species && (
        <div className={styles.info}>
          <span>{t('species')} </span>
          <span>{species}</span>
        </div>
      )}
      {gender && (
        <div className={styles.info}>
          <span>{t('gender')} </span>
          <span>{gender}</span>
        </div>
      )}
      {status && (
        <div className={styles.info}>
          <span>{t('status')} </span>
          <span
            className={getStatusStyle(status)}
          >{` ${status?.toUpperCase()}`}</span>
        </div>
      )}
      {checkbox && (
        <div>
          <input
            className={styles.checkbox}
            type="checkbox"
            id={`favorite-${id}`}
            checked={isSelected}
            onChange={() => character && toggleSelect(character)}
          />
          <label className={styles.checkbox} htmlFor={`favorite-${id}`}>
            {t('favorite')}
          </label>
        </div>
      )}
    </div>
  );
};

export default Card;
