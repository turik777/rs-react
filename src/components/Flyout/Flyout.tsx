import type { FC } from 'react';
import styles from './flyout.module.scss';
import { useCharStore } from '../../store/useStore';
import Button from '../Button/Button';

interface IProps {
  download: () => void;
}

const Flyout: FC<IProps> = ({ download }) => {
  const selectedChars = useCharStore((state) => state.selectedCharIds);
  const clearSelection = useCharStore((state) => state.clearAll);

  return (
    <div className={styles.flyout}>
      <Button onClick={clearSelection} color="primary">
        Unselect all
      </Button>
      <span>{selectedChars.length} items are selected</span>
      <Button onClick={download} color="primary">
        Download
      </Button>
    </div>
  );
};

export default Flyout;
