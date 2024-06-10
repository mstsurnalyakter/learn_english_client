import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useReviews from "../../../../hooks/useReviews";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import DynamicTitle from "../../../../components/Shared/DynamicTitle/DynamicTitle";
import Review from "../../../../components/Review/Review";


const BookedSessionDetail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const { reviews } = useReviews(id);

  // averageRating

  const sum = reviews.reduce((sum, review) => sum + review?.rating, 0);
  const averageRating = parseFloat((sum / reviews?.length).toPrecision(2));



  const {
    data: session = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session", id],
    enabled: !!id && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`session/${id}`);
      return data;
    },
  });

  const {
    imageURL,
    sessionTitle,
    registrationFee,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    sessionDescription,
    sessionDuration,
    status,
    students,
    _id,
    user: tutorInfo,
  } = session || {};


  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-10 mb-10">
      <header className="">
        <DynamicTitle pageTitle="Session Details" />
        <div className="h-[350px]">
          <img src={imageURL} alt="" className="w-full h-full" />
        </div>
      </header>

      <div className="shadow-md dark:bg-gray-300 border space-y-3 mx-auto px-8 py-8 lg:py-10 lg:px-10">
        <h2 className="text-4xl font-medium">{sessionTitle}</h2>
        <div className="flex gap-3">
          <p>
            <b>Tutor Name:</b> {tutorInfo?.name}
          </p>
          <p>
            <b>Tutor Email:</b> {tutorInfo?.email}
          </p>
        </div>
        <p>
          <b>Students:</b> {students}
        </p>
        <p className="flex items-center gap-2">
          <b>Average Rating:</b>
          <span className="text-orange-800">
            <FaStar />
          </span>
          {averageRating || 0}
        </p>
        <p>
          <b>Status:</b> {status}
        </p>
        <p>
          <b>Registration Fee:</b> {registrationFee}
        </p>
        <p>
          <b>Session Duration:</b> {sessionDuration} hours
        </p>
        <p>
          <b>Registration Date:</b>{" "}
          {new Date(registrationStartDate).toLocaleDateString()} to{" "}
          {new Date(registrationEndDate).toLocaleDateString()}
        </p>
        <p>
          <b>Class:</b> {new Date(classStartDate).toLocaleDateString()} to{" "}
          {new Date(classEndDate).toLocaleDateString()}
        </p>

        <p>
          <b>Description:</b> <span className="text-sm">{sessionDescription}</span>
        </p>
        {/* <button
          onClick={() => (registrationFee > 0 ? setIsOpen(true) : handleBook())}
          disabled={
            role === "admin" ||
            role === "tutor" ||
            !checkStartDate ||
            !checkEndDate
          }
          className="px-4 w-full py-2 mt-4 disabled:cursor-not-allowed rounded  bg-[#4D95EA] text-white font-semibold"
        >
          Book Now
        </button> */}
        {/* modal
        <BookingModal
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
          bookingInfo={{
            ...session,
            sessionID: session?._id,
            student,
          }}
        /> */}
      </div>
      {/* lllllllllllllllll */}
      <Review id={_id} user={user} tutorInfo={tutorInfo} />
      {/* <div>
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
      </div> */}
      {/* lllllllllllllllll */}
    </div>
  );
};

export default BookedSessionDetail;
