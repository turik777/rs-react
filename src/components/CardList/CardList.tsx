import { Component } from 'react';
import type { Character } from '../../interface/interface';
import styles from './card-list.module.scss';
import Card from '../Card/Card';

interface IProps {
  result: Character[];
}

class CardList extends Component<IProps> {
  render() {
    const { result } = this.props;
    return (
      <div className={styles.list}>
        {result.map(({ id, name, image, species, gender, status }) => (
          <Card
            key={id}
            name={name}
            image={image}
            species={species}
            gender={gender}
            status={status}
          />
        ))}
      </div>
    );
  }
}

export default CardList;
