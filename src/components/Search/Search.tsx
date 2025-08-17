import type { FC, MouseEvent } from 'react';
import styles from './search.module.scss';
import Button from '../Button/Button';
import useStoredQuery from '../../utils/hooks/useSearchQuery';
import { useTheme } from '../../utils/hooks/useTheme';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '../../i18n/navigation';

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
  const searchParams = useSearchParams();
  const toggleLanguage = (event: MouseEvent<HTMLButtonElement>) => {
    const newLocale = event.currentTarget.textContent;
    const newPath = `/${newLocale}${pathname.slice(3)}`;
    router.push(`${newPath}?${searchParams}`);
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
      <Link href="/about">
        <Button color="primary">{t('about')}</Button>
      </Link>
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
