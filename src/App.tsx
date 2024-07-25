import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import axios from 'axios';
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

const App: React.FC = () => {
  const [results, setResults] = useState<Array<{ id: number; title: string; year: string, poster:string }>>([]);

  const handleSearch = async (query: string) => {
    let movies = await getMovies(query);
    setResults(movies);
  };

  const getMovies = (query:string) : any[] => {

    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${query}}&y`)
    .then((res) => console.log(res.data))
    .catch((error) => console.error(error))

    return [];
  }

  return (
    <div>
      <h1>Search App</h1>
      <SearchForm onSearch={handleSearch} />
      <ResultList results={results} />
    </div>
  );
};

export default App;
