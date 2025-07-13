import React, { Component } from 'react';
import styles from './search.module.scss';
import Button from '../Button/Button';

interface IState {
  query: string;
}

interface IProps {
  search: (query: string) => void;
}

class Search extends Component<IProps, IState> {
  state: IState = {
    query: localStorage.getItem('search_3iq6e') || '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { query } = this.state;
    localStorage.setItem('search_3iq6e', query);
    this.props.search(query);
  };

  render() {
    return (
      <div className={styles.search}>
        <input
          className={styles['search-bar']}
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <Button color="primary" onClick={this.handleSearch}>
          Search
        </Button>
      </div>
    );
  }
}

export default Search;
