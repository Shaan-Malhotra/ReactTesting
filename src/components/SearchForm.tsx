import React, { useEffect, useState } from "react";

const SearchForm: React.FC = () => {
  const [movieData, setMovieData] = useState(null);
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const movieTitle = "Lion King";
  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

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
      <h1>Movie Information</h1>
      {movieData ? (
        <div>
          <h2>{movieData.Title}</h2>
          <p>{movieData.Plot}</p>
          <p>Released: {movieData.Released}</p>
          <p>Director: {movieData.Director}</p>
          {/* Add more movie details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SearchForm;
