import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { thirdPartyApiInstance } from "../../helpers/apiInstance";

interface Review {
  reviewerName: string;
  reviewText: string;
  rating: number;
  movieId: number;
  reviewDate: string;
  id: number;
}

const ReviewItem: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [reviewData, setReviewData] = useState<Review | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getMovieIdByTitle = async (
    title: string | undefined
  ): Promise<number> => {
    try {
      const response = await thirdPartyApiInstance.get(`/movies`, {
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
      const response = await thirdPartyApiInstance.get(`/reviews`, {
        params: { movieId },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const movieId = await getMovieIdByTitle(title);
        if (movieId !== -1) {
          const reviews = await getReviewsByMovieId(movieId);
          // Set only the first review or null if no reviews are found
          setReviewData(reviews.length > 0 ? reviews[0] : null);
        } else {
          console.error("No movie found with the given title.");
          setReviewData(null);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setReviewData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [title]);

  return (
    <div className="content container">
      {loading ? (
        <p>Loading...</p>
      ) : reviewData ? (
        <div>
          <h3>{title}</h3>
          <p>{reviewData.reviewText}</p>
          {reviewData.reviewDate && <p>Review Date: {reviewData.reviewDate}</p>}
          {reviewData.reviewerName && (
            <p>Reviewed By: {reviewData.reviewerName}</p>
          )}
        </div>
      ) : (
        <p>No review data available</p>
      )}
    </div>
  );
};

export default ReviewItem;
