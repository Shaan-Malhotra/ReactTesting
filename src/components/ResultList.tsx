import React from 'react';
import ResultItem from './ResultItem';

interface ResultListProps {
  results: Array<{ id: number; title: string; description: string; poster: string }>;
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <div>
      {results.map((result) => (
        <ResultItem key={result.id} result={result} />
      ))}
    </div>
  );
};

export default ResultList;
