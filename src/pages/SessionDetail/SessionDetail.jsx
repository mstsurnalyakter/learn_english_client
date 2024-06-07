import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import DynamicTitle from "../../components/Shared/DynamicTitle/DynamicTitle";
import { FaStar } from "react-icons/fa";

const SessionDetail = () => {
  const axiosSecure = useAxiosSecure();
  const {id} = useParams();
  console.log(id);
  const {
    data: session = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session",id ],
    enabled:!!id && !!localStorage.getItem("access-token"),
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
       user:tutorInfo
    } = session || {};

  console.log(session);
    return (
      <div>
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
            className="px-4 w-full py-2 mt-4 rounded  bg-gradient-to-r from-[#FF4153] via-purple-600 to-[#FF4153] bg-300% text-transparent animate-gradient
              duration-200 text-white cursor-pointer font-semibold"
          >
            Apply
          </button>
        </div>
      </div>
    );

};

export default SessionDetail;
