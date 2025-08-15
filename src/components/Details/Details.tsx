import { type FC } from 'react';
import styles from './details.module.scss';
import Card from '../Card/Card';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { useCharacterById } from '../../utils/hooks/useCharacterById';

const Details: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const id = searchParams.get('details') || '';

  const {
    data: character,
    isFetching,
    isLoading,
    isError,
    error,
  } = useCharacterById(id);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    router.push(`${pathname}?${params}`);
  };

  if (!id) return null;

  return (
    <div
      className={styles.details}
      onClick={(event) => event.stopPropagation()}
    >
      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : !character ? (
        <div>Character not found</div>
      ) : (
        <>
          <Card
            character={character}
            name={character.name}
            image={character.image}
            species={character.species}
            gender={character.gender}
            status={character.status}
          />
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        </>
      )}
    </div>
  );
};

export default Details;
