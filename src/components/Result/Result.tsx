import { Component } from 'react';
import type { Character } from '../../utils/interface';
import styles from './result.module.scss';
import Loader from '../Loader/Loader';

interface IProps {
  result: Character[];
  loading: boolean;
  error: string | null;
}

class Result extends Component<IProps> {
  render() {
    const { loading, result, error } = this.props;

    return (
      <div className={styles.result}>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : result.length === 0 ? (
          <div className={styles.null}>No results</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles['header-cell']}>Name</th>
                <th className={styles['header-cell']}>Description</th>
              </tr>
            </thead>
            <tbody className={styles['table-body']}>
              {result.map(({ id, name, description }) => (
                <tr className={styles.row} key={id}>
                  <td className={`${styles.cell} ${styles.name}`}>{name}</td>
                  <td className={styles.cell}>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Result;
