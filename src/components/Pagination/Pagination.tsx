import type { FC } from 'react';
import Button from '../Button/Button';
import styles from './pagination.module.scss';

interface IProps {
  page: number;
  pageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: FC<IProps> = ({ page, pageChange, totalPages }) => {
  return (
    <div className={styles.pagination}>
      <Button
        color="primary"
        onClick={() => pageChange(1)}
        disabled={page <= 1}
      >
        {'<<'}
      </Button>
      <Button
        color="primary"
        onClick={() => pageChange(page - 1)}
        disabled={page <= 1}
      >
        {'<'}
      </Button>
      <span>{page}</span>
      <Button
        color="primary"
        onClick={() => pageChange(page + 1)}
        disabled={page >= totalPages}
      >
        {'>'}
      </Button>
      <Button
        color="primary"
        onClick={() => pageChange(totalPages)}
        disabled={page >= totalPages}
      >
        {'>>'}
      </Button>
    </div>
  );
};

export default Pagination;
