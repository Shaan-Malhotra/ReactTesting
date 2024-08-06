import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import ResultList from "./components/ResultList";
import ResultItem from "./components/ResultItem";

import { Movie } from "./types/movie";
import ReviewItem from "./components/ReviewItem";
import { Authenticator } from "@aws-amplify/ui-react";
import { getMovies } from "./services/moviesService";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query: string) => {
    const result = await getMovies(query);
    setMovies(result);
  };

  return (
    <>
      <Authenticator>
        <Router>
          <div className="container">
            <h1 className="content">Search App</h1>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchForm
                      onSearch={handleSearch}
                      setSearched={setSearched}
                    />
                    <ResultList movies={movies} searched={searched} />
                  </>
                }
              />
              <Route path="/movie/:id" element={<ResultItem />} />
              <Route path="/review/:title" element={<ReviewItem />} />
            </Routes>
          </div>
        </Router>
      </Authenticator>
    </>
  );
};

export default App;
