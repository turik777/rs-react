import type { FC } from 'react';
import styles from './about.module.scss';
import { Link } from 'react-router';

const About: FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.about}>
      <span>Made</span>
      <span>by</span>
      <span>
        <Link
          className={styles.link}
          to="https://www.github.com/turik777"
          target="_blank"
        >
          <span> Artur Bazaluk</span>
        </Link>
      </span>
      <span>{year}</span>
      <span>
        <Link className={styles.link} to="https://rs.school/" target="_blank">
          <span>RS School</span>
        </Link>
      </span>
    </div>
  );
};

export default About;
