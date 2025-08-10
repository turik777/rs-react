import type { FC } from 'react';
import type { Character } from '../../interface/interface';
import styles from './card-list.module.scss';
import Card from '../Card/Card';
import { useSearchParams, useNavigate } from 'react-router';

interface IProps {
  result: Character[];
  page: number;
}

const CardList: FC<IProps> = ({ result, page }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent, id: string | undefined) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('input[type="checkbox"]') || target.closest('label')) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    params.set('details', `${id}`);
    navigate({ pathname: '/', search: `${params}` });
  };

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
              handleClick(event, character.id);
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
