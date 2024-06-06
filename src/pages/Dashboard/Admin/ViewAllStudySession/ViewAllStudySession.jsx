import toast from "react-hot-toast";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import useAllStudySession from "../../../../hooks/useAllStudySession";

const ViewAllStudySession = () => {

  const {studySessions,isLoading,refetch} = useAllStudySession()

  const axiosSecure = useAxiosSecure();



  // handleStatus
  const handleStatus = async (id, prevStatus, status) => {
    if (prevStatus === status)
      return toast.success(`You already ${status} the request.`);

    try {
      const { data } = await axiosSecure.patch(`/study-session/${id}`, {
        status,
      });
      if (data?.modifiedCount > 0) {
        toast.success(`${status} successfully.`);
        refetch();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const openModal = async (id) => {
    const result = await Swal.fire({
      title: "Update Registration Fee",
      html: `
      <input type="number" id="registrationFeeInput" placeholder="Enter Registration Fee" class="swal2-input" />
    `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const fee = document.getElementById("registrationFeeInput").value;

        if (!fee) {
          Swal.showValidationMessage("Please Enter Registration Fee.");
        }
        return fee;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.isConfirmed) {
      const fee = result?.value;
      await handleRegistrationFee(id, fee);
    }
  };

  //  Updated RegistrationFee function
  const handleRegistrationFee = async (id, fee) => {
    try {
      const { data } = await axiosSecure.patch(
        `/study-session-registrationFee/${id}`,
        {
          registrationFee: fee,
        }
      );
      if (data?.modifiedCount > 0) {
        refetch();
        toast.success("Registration fee updated successfully.");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <section className="container px-4 mx-auto pt-12">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">Study Session</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {studySessions?.length > 0 && studySessions?.length}
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
                          <div className="flex items-center">
                            Registration Fee
                          </div>
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
                    {studySessions?.length > 0 &&
                      studySessions?.map((session, index) => (
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

                          <td className="px-4 cursor-pointer py-4 text-sm text-gray-500 ">
                            <button
                              onClick={() => openModal(session?._id)}
                              className="flex items-center gap-2 bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                            >
                              ${session?.registrationFee}
                              <MdModeEdit size="20px" />
                            </button>
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
                          {/* kkkkkkkkkkkkkkkkkkkkkkkkkkk */}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              {/* Accept Button: approved */}
                              <button
                                title="Approve the Session"
                                onClick={() =>
                                  handleStatus(
                                    session?._id,
                                    session?.status,
                                    "approved"
                                  )
                                }
                                // disabled={session?.status === "Complete"}
                                className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </button>
                              {/* Reject Button */}
                              <button
                                title="Reject the Session"
                                onClick={() =>
                                  handleStatus(
                                    session?._id,
                                    session?.status,
                                    "rejected"
                                  )
                                }
                                // disabled={session?.status === "Complete"}
                                className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>

                          {/* <td className="px-4 py-4 text-sm">
                            <button
                              disabled={session?.status !== "rejected"}
                              onClick={() => handleStatus(session?._id)}
                              title="New Approval Request"
                              className="text-gray-800 transition-colors duration-200  hover:text-red-800 focus:outline-none disabled:cursor-not-allowed"
                            >
                              <IoIosGitPullRequest />
                            </button>
                          </td> */}
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

export default ViewAllStudySession;
