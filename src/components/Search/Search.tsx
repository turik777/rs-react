import type { FC } from 'react';
import styles from './search.module.scss';
import Button from '../Button/Button';
import { NavLink } from 'react-router';
import useStoredQuery from '../../utils/hooks/useSearchQuery';
import { useTheme } from '../../utils/hooks/useTheme';

interface IProps {
  search: (query: string) => void;
}

const Search: FC<IProps> = ({ search }) => {
  const [query, setQuery, saveQuery] = useStoredQuery('search_3iq6e');
  const { theme, setTheme } = useTheme();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    saveQuery();
    search(query);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      className={`${styles.search} ${styles[theme]}`}
      onClick={(event) => event.stopPropagation()}
    >
      <input
        className={`${styles['search-bar']} ${styles[theme]}`}
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
      <Button onClick={toggleTheme} color="primary">
        {`Switch to ${theme === 'light' ? 'Dark' : 'Light'}`}
      </Button>
    </div>
  );
};

export default Search;
