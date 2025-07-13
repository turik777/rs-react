import { Component } from 'react';
import './assets/styles/global.module.scss';
import Search from './components/Search/Search';
import Result from './components/Result/Result';
import { getAllCharacters, searchCharacters } from './utils/api';
import type { Character } from './utils/interface';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class App extends Component {
  state: State = {
    characters: [],
    loading: true,
    error: null,
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
    const { characters, loading, error } = this.state;

    return (
      <>
        <Search search={this.handleSearch} />
        <Result result={characters} loading={loading} error={error} />
      </>
    );
  }
}

export default App;
