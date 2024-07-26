import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieData } from "../types/movieData";

const ResultItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = process.env.VITE_REACT_APP_API_KEY;
  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await fetch(movieUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieUrl]);

  return (
    <div className="content container">
      {loading ? (
        <p>Loading...</p>
      ) : movieData ? (
        <div>
          <div>
            <h3>{movieData.Title}</h3>
            <p>{movieData.Plot}</p>
            <p>Released: {movieData.Released}</p>
            <p>Director: {movieData.Director}</p>
          </div>
          <div>
            <img src={movieData.Poster} alt={`${movieData.Title} Poster`} />
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ResultItem;
