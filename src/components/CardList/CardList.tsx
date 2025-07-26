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

  const handleClick = (id: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    params.set('details', `${id}`);
    navigate({ pathname: '/', search: `${params}` });
  };

  return (
    <div className={styles.list}>
      {result.map(({ id, name, image }) => (
        <div className={styles.link} key={id} onClick={() => handleClick(id)}>
          <Card data-testid="card" name={name} image={image} size="small" />
        </div>
      ))}
    </div>
  );
};

export default CardList;
