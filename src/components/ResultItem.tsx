import React from 'react';
import PosterImg from './PosterImg';

interface ResultItemProps {
  result: {
      year: string;
      poster: string; id: number; title: string; description: string 
};
}

const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  return (
    <div>
      <PosterImg url={result.poster}> </PosterImg>
      <h3>{result.title} ({result.year})</h3>
    </div>
  );
};

export default ResultItem;
