import PropTypes from "prop-types";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ReviewSection from "./ReviewSection";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import useReviews from "../../hooks/useReviews";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Review = ({ id, user, tutorInfo }) => {
  const axiosSecure = useAxiosSecure;
  const {reviews,reviewLoading,reviewRefetch} = useReviews(id);

  const [data, setData] = useState({
    review: "",
    rating: 0,
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewInfo = {
      review: data.review,
      tutorName: tutorInfo?.name,
      tutorEmail: tutorInfo?.email,
      sessionID: id,
      studentName: user?.displayName,
      studentEmail: user?.email,
      studentPhoto: user?.photoURL,
      rating: data.rating,
    };

    try {
      const response = await axiosSecure.post("/review", reviewInfo);
      if (response.data?.insertedId) {
        reviewRefetch();
        setData({
          review: "",
          rating: 0,
        });
        event.target.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };



  if(reviewLoading) return <LoadingSpinner/>

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-semibold text-center mt-10 space-y-6">
          Your opinion matters!
        </h2>
        <h5 className="text-center">How was your experience?</h5>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="max-w-48 w-full mx-auto text-center">
            <div id="rating">Rating</div>
            <Rating
              isRequired
              value={data.rating}
              visibleLabelId="rating"
              onChange={(selectedValue) =>
                setData((prevData) => ({ ...prevData, rating: selectedValue }))
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <textarea
              id="review"
              required
              onChange={(event) =>
                setData((prevData) => ({
                  ...prevData,
                  review: event.target.value,
                }))
              }
              rows="3"
              placeholder="Enter your Review..."
              className="p-4 rounded-md border-2 dark:text-gray-800 dark:bg-gray-50"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="px-3 py-2 bg-[#4D95EA] text-white" type="submit">
              Submit review
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {
          reviews?.length > 0 && reviews?.map(review=><ReviewSection key={review?._id} review={review} />)
        }
      </div>
    </div>
  );
};

Review.propTypes = {
  id: PropTypes.string,
  tutorInfo: PropTypes.object,
  user: PropTypes.object,
};

export default Review;
