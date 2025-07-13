import { Component } from 'react';
import './assets/styles/global.module.scss';
import Search from './components/Search/Search';
import Result from './components/Result/Result';
import { getAllCharacters, searchCharacters } from './utils/api';
import type { Character } from './utils/interface';

interface State {
  characters: Character[];
  loading: boolean;
}

class App extends Component {
  state: State = {
    characters: [],
    loading: true,
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
    const characters = await getAllCharacters();
    this.setState({ characters, loading: false });
  };

  handleSearch = async (value: string) => {
    this.setState({ loading: true });
    const characters = await searchCharacters(value);
    this.setState({ characters, loading: false });
  };

  render() {
    const { characters, loading } = this.state;

    return (
      <>
        <Search search={this.handleSearch} />
        <Result result={characters} loading={loading} />
      </>
    );
  }
}

export default App;
