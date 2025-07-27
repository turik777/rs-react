import type { FC } from 'react';
import styles from './not-found.module.scss';

const NotFound: FC = () => {
  return (
    <div className={styles['not-found']}>
      <h1>404</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
    </div>
  );
};

export default NotFound;
