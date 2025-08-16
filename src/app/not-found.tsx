import type { FC } from 'react';
import styles from '../components/NotFound/not-found.module.scss';
import { useTranslations } from 'next-intl';

const NotFound: FC = () => {
  const t = useTranslations('NotFound');

  return (
    <div className={styles['not-found']}>
      <h1>404</h1>
      {t('notFound')}
    </div>
  );
};

export default NotFound;
