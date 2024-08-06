import { reviewApiInstance } from "../api/ApiInstance";
import { Review } from "../types/review";

const getMovieIdByTitle = async (
    title: string | undefined
  ): Promise<number> => {
    try {
      const response = await reviewApiInstance.get(`/movies`, {
        params: { title },
      });
      return response.data.length > 0 ? response.data[0].id : -1;
    } catch (error) {
      console.error("Failed to fetch movie id:", error);
      return -1;
    }
  };

const getReviewsByMovieId = async (movieId: number): Promise<Review[]> => {
    try {
      const response = await reviewApiInstance.get(`/reviews`, {
        params: { movieId },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return [];
    }
  };

export { getReviewsByMovieId, getMovieIdByTitle }