import type { FC } from 'react';
import type { Character } from '../../interface/interface';
import styles from './card-list.module.scss';
import Card from '../Card/Card';
import { useSearchParams, useRouter } from 'next/navigation';

interface IProps {
  result: Character[];
  page: number;
}

const CardList: FC<IProps> = ({ result, page }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent, id: string | undefined) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('input[type="checkbox"]') || target.closest('label')) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    params.set('details', `${id}`);
    router.push(`/?${params}`);
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
