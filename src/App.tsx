import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import ResultList from "./components/ResultList";
import ResultItem from "./components/ResultItem";
import axios from "axios";
import { Movie } from "./types/movie";
import ReviewItem from "./components/ReviewItem";

const apiKey = process.env.VITE_REACT_APP_API_KEY;

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query: string) => {
    const result = await getMovies(query);
    setMovies(result);
  };

  const getMovies = (query: string): Promise<Movie[]> => {
    return axios
      .get(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${query}`)
      .then((res) => res.data.Search)
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  return (
    <Router>
      <div className="container">
        <h1 className="content">Search App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm onSearch={handleSearch} setSearched={setSearched} />
                <ResultList movies={movies} searched={searched} />
              </>
            }
          />
          <Route path="/movie/:id" element={<ResultItem />} />
          <Route path="/review/:title" element={<ReviewItem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
