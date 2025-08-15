'use client';

import { type FC } from 'react';
import styles from '../../../components/About/about.module.scss';
import { useTheme } from '../../../utils/hooks/useTheme';
import { Link } from '../../../i18n/navigation';
import { useTranslations } from 'next-intl';

const About: FC = () => {
  const year = new Date().getFullYear();
  const { theme } = useTheme();

  const t = useTranslations('About');

  return (
    <div className={`${styles.about} ${styles[theme]}`}>
      <span>{t('made')}</span>
      <span>{t('by')}</span>
      <span>
        <Link
          className={styles.link}
          href="https://www.github.com/turik777"
          target="_blank"
        >
          <span>{t('name')}</span>
        </Link>
      </span>
      <span>{year}</span>
      <span>
        <Link
          className={styles.link}
          href="https://rs.school/courses/reactjs"
          target="_blank"
        >
          <span>RS School</span>
        </Link>
      </span>
    </div>
  );
};

export default About;
