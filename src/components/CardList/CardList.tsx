import { type FC, type MouseEvent } from 'react';
import type { Character } from '../../interface/interface';
import styles from './card-list.module.scss';
import Card from '../Card/Card';

interface IProps {
  result: Character[];
  onCardClick: (
    event: MouseEvent<HTMLDivElement>,
    id: string | undefined
  ) => void;
}

const CardList: FC<IProps> = ({ result, onCardClick }) => {
  return (
    <div className={styles.list}>
      {result.map((character) => (
        <div className={styles.link} key={character.id}>
          <Card
            data-testid="card"
            character={character}
            id={character.id}
            name={character.name}
            image={character.image}
            onClick={(event) => {
              event.stopPropagation();
              onCardClick(event, character.id);
            }}
            size="small"
            hover="hover"
            checkbox={true}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
