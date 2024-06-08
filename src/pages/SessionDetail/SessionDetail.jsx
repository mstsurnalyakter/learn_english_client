import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import DynamicTitle from "../../components/Shared/DynamicTitle/DynamicTitle";
import { FaStar } from "react-icons/fa";
import Review from "../../components/Review/Review";
import useUsers from "../../hooks/useUsers";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import BookingModal from "./BookingModal";
import { useState } from "react";

const SessionDetail = () => {
  const axiosSecure = useAxiosSecure();
  const { users } = useUsers();
  const { user } = useAuth();
  const { id } = useParams();

// llllllllllllllllllllllllllllll

const [isOpen, setIsOpen] = useState(false);

 const closeModal = () => {
    setIsOpen(false);
 };

// llllllllllllllllllllllllllllll

  const findUser = users?.find(
    (singleUser) => singleUser.email === user?.email
  );

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

  if (isLoading) return <LoadingSpinner/>

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
          dynamic data added
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
          onClick={() => setIsOpen(true)}
          disabled={findUser?.role === "admin" || findUser?.role === "tutor"}
          className="px-4 w-full py-2 mt-4 disabled:cursor-not-allowed rounded  bg-[#4D95EA] text-white font-semibold"
        >
          Book Now
        </button>
        {/* modal */}
        <BookingModal
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
          bookingInfo={{
            ...session,
            sessionID:session?._id,
            student: {
              name: user?.displayName,
              email: user?.email,
              image: user?.photoURL,
            },
          }}
        />
      </div>
      {/* lllllllllllllllll */}
      <Review id={_id} user={user} tutorInfo={tutorInfo} />
      {/* lllllllllllllllll */}
    </div>
  );
};

export default SessionDetail;
