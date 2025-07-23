import type { FC } from 'react';
import type { Character } from '../../interface/interface';
import styles from './card-list.module.scss';
import Card from '../Card/Card';
interface IProps {
  result: Character[];
}

const CardList: FC<IProps> = ({ result }) => {
  return (
    <div className={styles.list}>
      {result.map(({ id, name, image, species, gender, status }) => (
        <Card
          key={id}
          name={name}
          image={image}
          species={species}
          gender={gender}
          status={status}
        />
      ))}
    </div>
  );
};

export default CardList;
