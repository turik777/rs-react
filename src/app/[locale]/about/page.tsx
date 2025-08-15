'use client';

import { type FC } from 'react';
import styles from '../../../components/About/about.module.scss';
import { Link } from 'react-router';
import { useTheme } from '../../../utils/hooks/useTheme';
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
          to="https://www.github.com/turik777"
          target="_blank"
        >
          <span>{t('name')}</span>
        </Link>
      </span>
      <span>{year}</span>
      <span>
        <Link
          className={styles.link}
          to="https://rs.school/courses/reactjs"
          target="_blank"
        >
          <span>RS School</span>
        </Link>
      </span>
    </div>
  );
};

export default About;
