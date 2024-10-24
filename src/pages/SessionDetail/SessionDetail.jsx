import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import DynamicTitle from "../../components/Shared/DynamicTitle/DynamicTitle";
import { FaStar } from "react-icons/fa";
// import Review from "../../components/Review/Review";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import BookingModal from "./BookingModal";
import { useState } from "react";
import toast from "react-hot-toast";
import useReviews from "../../hooks/useReviews";
import useRole from "../../hooks/useRole";
import ReviewSection from "../../components/Review/ReviewSection";

const SessionDetail = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const { user } = useAuth();
  const { id } = useParams();
  const { reviews, reviewLoading } = useReviews(id);
  const [isOpen, setIsOpen] = useState(false);



  // averageRating

  const sum = reviews.reduce((sum, review) => sum + review?.rating, 0);
  const averageRating = parseFloat((sum / reviews?.length).toPrecision(2));

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const student = {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
  };

  const checkStartDate = new Date(session?.registrationStartDate) <= new Date();
  const checkEndDate = new Date(session?.registrationEndDate) >= new Date();

  const handleBook = async () => {
    const bookingInfo = {
      sessionID: _id,
      student,
      sessionTitle,
      user: tutorInfo,
      registrationFee,
      date: new Date(),
    };
    console.log(bookingInfo);

    try {
      const { data } = await axiosSecure.post("/booking", bookingInfo);

      if (data.insertedId) {
        refetch();
        toast.success("Session Booked successfully.");
      }
    } catch (error) {
      if (error.response.data) return toast.error(error.response.data);
      toast.error(error.message);
    }
  };

  if (isLoading || reviewLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-10">
      <header className="">
        <DynamicTitle pageTitle="Session Details" />
        <div className="h-[350px] md:h-[450px]">
          <img src={imageURL} alt="" className="w-full h-full" />
        </div>
      </header>

      <div className="shadow-md dark:bg-gray-300 border space-y-5 mx-auto px-8 py-8 lg:py-10 lg:px-10">
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
          <b>Description:</b> {sessionDescription}
        </p>

        <button
          onClick={() => (registrationFee > 0 ? setIsOpen(true) : handleBook())}
          disabled={
            role === "admin" ||
            role === "tutor" ||
            !checkStartDate ||
            !checkEndDate
          }
          className="px-4 w-full py-2 mt-4 disabled:cursor-not-allowed rounded  bg-[#4D95EA] text-white font-semibold"
        >
          {checkStartDate && checkEndDate ? "Book Now" : "Registration Closed"}
        </button>
        {/* modal */}
        <BookingModal
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
          bookingInfo={{
            ...session,
            sessionID: session?._id,
            student,
          }}
        />
      </div>
      <div className="dark:text-white">
        <h3 className="text-center mb-10 font-bold text-2xl mt-16">
          Student Reviews
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {reviews?.length > 0 &&
            reviews?.map((review) => (
              <ReviewSection key={review?._id} review={review} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
