import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import axios from 'axios';
import { Movie } from './types/movie';
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    let result = await getMovies(query);
    setMovies(result);
  };

  const getMovies = (query:string) : any => {
    return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${query}}&y`)
    .then((res) => {
      return res.data.Search;
  })
    .catch((error) => console.error(error))
  }

  return (
    <div>
      <h1>Search App</h1>
      <SearchForm onSearch={handleSearch} />
      <ResultList results={movies} />
    </div>
  );
};

export default App;
