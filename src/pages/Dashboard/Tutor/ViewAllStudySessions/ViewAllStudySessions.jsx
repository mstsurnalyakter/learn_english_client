import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useStudySession from "../../../../hooks/useStudySession";
import { IoIosGitPullRequest } from "react-icons/io";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

const ViewAllStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const { studySession, isLoading, refetch } = useStudySession();

  // handleStatus
  const handleStatus = async (id) => {
    const { data } = await axiosSecure.patch(`/study-session/${id}`, {
      status: "pending",
    });
    if (data?.modifiedCount > 0) {
      toast.success("New Approval Request Successfully Send");

      refetch();
      console.log(data);
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <div>
      <section className="container px-4 mx-auto pt-12">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">Study Session</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {studySession?.length > 0 ? studySession?.length : 0}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg shadow-xl">
                <table className="min-w-full mx-auto divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <span>Tutor</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Registration Fee </span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        Registration Date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        Status
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {studySession?.length > 0 &&
                      studySession?.map((session, index) => (
                        <tr key={session._id}>
                          <th className="px-4 py-4 font-medium text-sm text-gray-700 ">
                            {index + 1}
                          </th>
                          <td className="px-4 py-4 font-medium text-sm text-gray-700 ">
                            {session?.sessionTitle}
                          </td>

                          <td className="px-4 flex flex-col  py-4 text-sm text-gray-500 ">
                            <span>{session?.user?.name}</span>
                            <span>{session?.user?.email}</span>
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 ">
                            ${session?.registrationFee}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 ">
                            {new Date(
                              session?.registrationStartDate
                            ).toLocaleDateString()}{" "}
                            to{" "}
                            {new Date(
                              session?.registrationEndDate
                            ).toLocaleDateString()}
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-gray-700">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                                session?.status === "pending" &&
                                "bg-yellow-100 text-yellow-900"
                              } ${
                                session?.status === "approved" &&
                                "bg-green-100 text-green-900"
                              }${
                                session?.status === "rejected" &&
                                "bg-red-100 text-red-900"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  session?.status === "pending" &&
                                  "bg-yellow-900"
                                }${
                                  session?.status === "approved" &&
                                  "bg-green-900"
                                } ${
                                  session?.status === "rejected" && "bg-red-900"
                                } `}
                              ></span>
                              <h2 className="text-sm font-normal ">
                                {session?.status}
                              </h2>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm">
                            <button
                              disabled={session?.status !== "rejected"}
                              onClick={() => handleStatus(session?._id)}
                              title="New Approval Request"
                              className="text-gray-800 transition-colors duration-200  hover:text-red-800 focus:outline-none disabled:cursor-not-allowed"
                            >
                              <IoIosGitPullRequest />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewAllStudySessions;
