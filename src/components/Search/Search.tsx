import type { FC } from 'react';
import styles from './search.module.scss';
import Button from '../Button/Button';
import { NavLink } from 'react-router';
import useStoredQuery from '../../utils/hooks/useSearchQuery';

interface IProps {
  search: (query: string) => void;
}

const Search: FC<IProps> = ({ search }) => {
  const [query, setQuery, saveQuery] = useStoredQuery('search_3iq6e');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    saveQuery();
    search(query);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles['search-bar']}
        type="text"
        value={query}
        onChange={handleInputChange}
      />
      <Button color="primary" onClick={handleSearch}>
        Search
      </Button>
      <NavLink to="/about">
        <Button color="primary">About</Button>
      </NavLink>
    </div>
  );
};

export default Search;
