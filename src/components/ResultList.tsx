import React from "react";
import ResultItem from "./ResultItem";
import { Movie } from "../types/movie";
interface ResultListProps {
  results: Array<Movie>;
}
const ResultList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <div>
      {results.map((result) => (
        <ResultItem
          key={result.imdbID}
          year={result.Year}
          title={result.Title}
        />
      ))}
    </div>
  );
};
export default ResultList;