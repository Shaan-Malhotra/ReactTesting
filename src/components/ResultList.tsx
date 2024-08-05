import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";

interface ResultListProps {
  movies: Movie[];
  searched: boolean;
}

const ResultList: React.FC<ResultListProps> = ({ movies, searched }) => {
  console.log(searched + "searched");
  return (
    <div className="result-list content" id="result-list">
      {movies &&
        movies.map((movie: Movie) => (
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
            <Link to={`/review/${movie.Title}`}>
              <div className="card-body">
                <h5 className="card-title">Movie Review</h5>
              </div>
            </Link>
          </div>
        ))}
      {searched && (
        <img
          style={{ width: "130%" }}
          src="../images/notfound.png"
          alt="No movies found"
        />
      )}
    </div>
  );
};

export default ResultList;
