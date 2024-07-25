import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";

interface ResultListProps {
  movies: Movie[];
}

const ResultList: React.FC<ResultListProps> = ({ movies }) => {
  return (
    <div className="result-list">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="card" style={{ width: "18rem" }}>
          <Link to={`/movie/${movie.imdbID}`}>
            <img
              src={movie.Poster}
              className="card-img-top"
              alt={movie.Title}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
