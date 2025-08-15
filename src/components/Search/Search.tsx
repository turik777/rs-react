import type { FC, MouseEvent } from 'react';
import styles from './search.module.scss';
import Button from '../Button/Button';
import { NavLink } from 'react-router';
import useStoredQuery from '../../utils/hooks/useSearchQuery';
import { useTheme } from '../../utils/hooks/useTheme';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

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

  const t = useTranslations('HomePage');
  const nextMode = theme === 'light' ? t('themeDark') : t('themeLight');
  const router = useRouter();
  const pathname = usePathname();
  const toggleLanguage = (event: MouseEvent<HTMLButtonElement>) => {
    const newLocale = event.currentTarget.textContent;
    const newPath = `/${newLocale}${pathname.slice(3)}`;
    router.push(newPath);
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
        {t('search')}
      </Button>
      <NavLink to="/about">
        <Button color="primary">{t('about')}</Button>
      </NavLink>
      <Button onClick={toggleTheme} color="primary">
        {t('theme', { mode: nextMode })}
      </Button>
      <Button onClick={toggleLanguage} color="primary">
        {t('language')}
      </Button>
    </div>
  );
};

export default Search;
