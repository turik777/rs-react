import { Component } from 'react';
import './assets/styles/global.module.scss';
import Search from './components/Search/Search';
import Result from './components/Result/Result';
import { getAllCharacters, searchCharacters } from './utils/api';
import type { Character } from './utils/interface';
import Button from './components/Button/Button';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
  throwError: boolean;
}

class App extends Component {
  state: State = {
    characters: [],
    loading: true,
    error: null,
    throwError: false,
  };

  query = localStorage.getItem('search') || '';

  componentDidMount() {
    if (this.query) {
      this.handleSearch(this.query);
    } else {
      this.handleGetAll();
    }
  }

  handleGetAll = async () => {
    this.setState({ loading: true });
    try {
      const characters = await getAllCharacters();
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

  handleSearch = async (value: string) => {
    this.setState({ loading: true });
    try {
      const characters = await searchCharacters(value);
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

  render() {
    const { characters, loading, error, throwError } = this.state;

    if (throwError) {
      throw new Error('Test render error.');
    }

    return (
      <>
        <Search search={this.handleSearch} />
        <Result result={characters} loading={loading} error={error} />
        <Button
          color="error"
          onClick={() => this.setState({ throwError: true })}
        >
          Throw Error
        </Button>
      </>
    );
  }
}

export default App;
