import React, { useEffect, useState } from "react";

import { MovieData } from "../types/movieData";

interface ResultItemProps {
  title: string;
  year: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ title, year }) => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}&y=${year}`;

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(movieUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchMovieData();
  }, [movieUrl]);

  return (
    <div>
      {movieData ? (
        <div>
          <h3>{movieData.Title}</h3>
          <p>{movieData.Plot}</p>
          <p>Released: {movieData.Released}</p>
          <p>Director: {movieData.Director}</p>
          <img src={movieData.Poster} alt="Movie Poster" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResultItem;
