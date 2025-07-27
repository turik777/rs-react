import { useEffect, useState, type FC } from 'react';
import styles from './details.module.scss';
import Card from '../Card/Card';
import { useSearchParams } from 'react-router';
import type { Character } from '../../interface/interface';
import { getCharacterById } from '../../utils/api';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

const Details: FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('details');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getCharacterById(id)
      .then((data) => {
        setCharacter(data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    setSearchParams(params);
  };

  if (!id) return null;

  return (
    <div
      className={styles.details}
      onClick={(event) => event.stopPropagation()}
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : !character ? (
        <div>Character not found</div>
      ) : (
        <>
          <Card
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
