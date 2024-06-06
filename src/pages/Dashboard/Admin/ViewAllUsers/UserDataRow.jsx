import PropTypes from 'prop-types'
import UpdateUserModal from './UpdateUserModal';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { formatDistanceToNow } from "date-fns";

const UserDataRow = ({ user, refetch, index }) => {

  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser, loading } = useAuth();

  // modalHandler
  const modalHandler = async (selected) => {
    if (loggedInUser?.email === user?.email) {
      toast.error("Action not Allow");
      return setIsOpen(false);
    }
       try {
         const { data } = await axiosSecure.patch(`/users/${user?.email}`, {
           role: selected,
         });
    if (data?.modifiedCount > 0) {
        refetch();
        console.log(data);
        toast.success("User role updated successfully.");
        setIsOpen(false);
    }
       } catch (error) {
         console.log(error);
         toast.error(error.message);
       }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          <img
            alt=""
            className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
            src={user?.imageURL}
          />
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {user?.timestamp && formatDistanceToNow(new Date(user?.timestamp))}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
  isLoading: PropTypes.bool,
  index: PropTypes.number,
};

export default UserDataRow