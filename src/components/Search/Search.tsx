import { type FC, useState } from 'react';
import styles from './search.module.scss';
import Button from '../Button/Button';

interface IProps {
  search: (query: string) => void;
}

const Search: FC<IProps> = ({ search }) => {
  const [query, setQuery] = useState(
    () => localStorage.getItem('search_3iq6e') || ''
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    localStorage.setItem('search_3iq6e', query);
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
    </div>
  );
};

export default Search;
