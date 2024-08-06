import { omdbMovieApiInstance } from "../api/ApiInstance";
import { Movie } from "../types/movie";

const getMovies = (query: string): Promise<Movie[]> => {
  return omdbMovieApiInstance
    .get(`?type=movie&s=${query}&`)
    .then((res) => res.data.Search)
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export { getMovies };
