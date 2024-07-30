import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Review {
  reviewerName: string;
  reviewText: string;
  rating: number;
  movieId: number;
  reviewDate: string;
  id: number;
}

const ReviewItem: React.FC = () => {
  const { Title } = useParams<{ Title: string }>();
  const [reviewData, setReviewData] = useState<Review | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getMovieIdByTitle = async (title: string): Promise<number> => {
    try {
      const response = await fetch(
        `http://localhost:5000/movies?title=${title}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.length > 0 ? data[0].id : -1;
    } catch (error) {
      console.error("Failed to fetch movie id:", error);
      return -1;
    }
  };

  const getReviewsByMovieId = async (movieId: number): Promise<Review[]> => {
    try {
      const response = await fetch(
        `http://localhost:5000/reviews?movieId=${movieId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const movieId = await getMovieIdByTitle(Title);
        console.log(Title);
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
  }, [Title]);

  return (
    <div className="content container">
      {loading ? (
        <p>Loading...</p>
      ) : reviewData ? (
        <div>
          <h3>{Title}</h3>
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
