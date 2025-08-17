import type { FC, MouseEvent } from 'react';
import type { Character } from '../../interface/interface';
import styles from './result.module.scss';
import Loader from '../Loader/Loader';
import CardList from '../CardList/CardList';

interface IProps {
  result: Character[];
  loading: boolean;
  error: string | null;
  onCardClick: (
    event: MouseEvent<HTMLDivElement>,
    id: string | undefined
  ) => void;
}

const Result: FC<IProps> = ({ loading, result, error, onCardClick }) => {
  return (
    <div className={styles.result}>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : result.length === 0 ? (
        <div className={styles.null}>No results</div>
      ) : (
        <div className={styles.info}>
          <CardList result={result} onCardClick={onCardClick} />
        </div>
      )}
    </div>
  );
};

export default Result;
