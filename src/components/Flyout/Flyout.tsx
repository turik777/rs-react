import type { FC } from 'react';
import styles from './flyout.module.scss';
import { useCharStore } from '../../store/useStore';
import Button from '../Button/Button';
import { useTheme } from '../../utils/hooks/useTheme';
import { useTranslations } from 'next-intl';

interface IProps {
  download: () => void;
}

const Flyout: FC<IProps> = ({ download }) => {
  const selectedChars = useCharStore((state) => state.selectedChars);
  const clearSelection = useCharStore((state) => state.clearAll);
  const { theme } = useTheme();

  const t = useTranslations('HomePage');

  return (
    <div className={`${styles.flyout} ${styles[theme]}`}>
      <Button onClick={clearSelection} color="primary">
        {t('unselect')}
      </Button>
      <span>
        {selectedChars.length} {t('selected')}
      </span>
      <Button onClick={download} color="primary">
        {t('download')}
      </Button>
    </div>
  );
};

export default Flyout;
