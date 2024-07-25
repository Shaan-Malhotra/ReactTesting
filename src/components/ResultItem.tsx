import React from 'react';

interface ResultItemProps {
  result: { id: number; title: string; description: string };
}

const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  return (
    <div>
      <h3>{result.title}</h3>
      <p>{result.description}</p>
    </div>
  );
};

export default ResultItem;
