import React from 'react';
import ResultItem from "./ResultItem";
import { Movie } from '../types/movie';

interface ResultListProps {
  movies: Movie[];
}

const ResultList: React.FC<ResultListProps> = ({ movies }) => {
  return (
    <div className="result-list">
      {movies.map((result, index) => (
        <div key={index} className="card" style={{ width: '18rem' }}>
          <img src={result.Poster} className="card-img-top" alt={result.Title} />
          <div className="card-body">
            <h5 className="card-title">{result.Title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultList;