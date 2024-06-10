import PropTypes from 'prop-types'
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useState } from 'react';
import UpdateModal from './UpdateModal';
import RejectionModal from './RejectionModal';
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Swal from 'sweetalert2';
import UpdateSessionModal from './UpdateSessionModal';

const Row = ({ session, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [isRejectionModal, setIsRejectionModal] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
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

    const handleDelete = async (id) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`session/${id}`);

          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Session has been deleted.",
              icon: "success",
            });
            refetch();
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };



  return (
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
        ${session?.registrationFee}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500 ">
        {new Date(session?.registrationStartDate).toLocaleDateString()} to{" "}
        {new Date(session?.registrationEndDate).toLocaleDateString()}
      </td>

      <td className="px-4 py-4 text-sm font-medium text-gray-700">
        {session?.status === "approved" ? (
          <div className="flex flex-col gap-2">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                session?.status === "approved" && "bg-green-100 text-green-900"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  session?.status === "approved" && "bg-green-900"
                } `}
              ></span>
              <h2 className="text-sm font-normal ">{session?.status}</h2>
            </div>
            <div className='flex items-center gap-3 text-xl justify-center'>
              <button
                onClick={() => handleDelete(session?._id)}
                className="text-red-600"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="text-[#0f67cc] "
              >
                <BiSolidEdit />
              </button>
              <UpdateSessionModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                refetch={refetch}
                session={session}
        />
            </div>
          </div>
        ) : (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
              session?.status === "pending" && "bg-yellow-100 text-yellow-900"
            } ${session?.status === "rejected" && "bg-red-100 text-red-900"}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                session?.status === "pending" && "bg-yellow-900"
              } ${session?.status === "rejected" && "bg-red-900"} `}
            ></span>
            <h2 className="text-sm font-normal ">{session?.status}</h2>
          </div>
        )}

      </td>


      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          {/* Accept Button: approved */}
          <button
            title="Approve the Session"
            onClick={() => setIsEditModalOpen(true)}
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

          <UpdateModal
            isOpen={isEditModalOpen}
            refetch={refetch}
            setIsEditModalOpen={setIsEditModalOpen}
            session={session}
            handleStatus={handleStatus}
          />

          {/* Reject Button */}
          <button
            title="Reject the Session"
            onClick={() => setIsRejectionModal(true)}
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
          <RejectionModal
            isOpen={isRejectionModal}
            refetch={refetch}
            setIsRejectionModal={setIsRejectionModal}
            session={session}
            handleStatus={handleStatus}
          />
        </div>
      </td>
    </tr>
  );
};

Row.propTypes = {
  session: PropTypes.object,
  index: PropTypes.number,
  refetch: PropTypes.func,
};

export default Row