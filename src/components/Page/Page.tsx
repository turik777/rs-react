import { Component } from 'react';
import Search from '../Search/Search';
import Result from '../Result/Result';
import { getAllCharacters, searchCharacters } from '../../utils/api';
import type { Character } from '../../interface/interface';
import Button from '../Button/Button';
import styles from './page.module.scss';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
  throwError: boolean;
}

class Page extends Component {
  state: State = {
    characters: [],
    loading: true,
    error: null,
    throwError: false,
  };

  query = localStorage.getItem('search_3iq6e') || '';

  componentDidMount() {
    if (this.query) {
      this.handleSearch(this.query);
    } else {
      this.handleGetAllCharacters();
    }
  }

  handleApiCall = async (apiCall: () => Promise<Character[]>) => {
    this.setState({ loading: true });
    try {
      const characters = await apiCall();
      this.setState({ characters });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      } else {
        this.setState({ error: 'An unexpected error occurred.' });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  handleGetAllCharacters = async () => {
    await this.handleApiCall(() => getAllCharacters());
  };

  handleSearch = async (value: string) => {
    await this.handleApiCall(() => searchCharacters(value));
  };

  render() {
    const { characters, loading, error, throwError } = this.state;

    if (throwError) {
      throw new Error('Test render error.');
    }

    return (
      <>
        <div className={styles.page}>
          <Search search={this.handleSearch} />
          <Result result={characters} loading={loading} error={error} />
          <Button
            color="error"
            onClick={() => this.setState({ throwError: true })}
          >
            Throw Error
          </Button>
        </div>
      </>
    );
  }
}

export default Page;
