import PropTypes from 'prop-types'
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UpdateModal from './UpdateModal';

const Row = ({ material, index, refetch }) => {

     const axiosSecure = useAxiosSecure();
     let [isEditModalOpen, setIsEditModalOpen] = useState(false);


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
        const { data } = await axiosSecure.delete(`material/${id}`);

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Material has been deleted.",
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
    <tr>
      <th className="px-4 py-4 font-medium text-sm text-gray-700 ">
        {index + 1}
      </th>

      <td className="px-4 py-4 flex gap-1 font-medium text-sm text-gray-700 ">
        <img
          alt=""
          className="w-16 h-14 rounded dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
          src={material?.imageURL}
        />
      </td>
      <td className="px-4 py-4 gap-1 font-medium text-sm text-gray-700 ">
        <span>{material?.title}</span>
      </td>

      <td className="px-4 flex flex-col  py-4 text-sm text-gray-500 ">
        <span>{material?.email}</span>
      </td>

      <td
        title={material?.sessionID}
        className="px-4 py-4 text-sm text-gray-500 "
      >
        {material?.sessionID.slice(0, 6)}..
      </td>

      <td className="px-4 py-4 text-sm text-blue-600 underline ">
        <a
          href={material?.link}
          className=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {material?.link.slice(0, 20)}...
        </a>
      </td>

      {/* <td className="px-4 py-4 text-lg space-x-2">
        <button
          onClick={() => handleDelete(material?._id)}
          className="text-red-600"
        >
          <MdDelete />
        </button>
        <Link to={`/dashboard/update/${material?._id}`}>
          <button className="text-[#0f67cc] ">
            <BiSolidEdit />
          </button>
        </Link>
      </td> */}
      <td className="px-4 py-4 text-lg space-x-2">
        <button
          onClick={() => handleDelete(material?._id)}
          className="text-red-600"
        >
          <MdDelete />
        </button>
        {/* <Link to={`/dashboard/update/${material?._id}`}> */}
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-[#0f67cc] "
        >
          <BiSolidEdit />
        </button>
        <UpdateModal
          isOpen={isEditModalOpen}
          refetch={refetch}
          setIsEditModalOpen={setIsEditModalOpen}
          material={material}
        />
        {/* </Link> */}
      </td>

      {/* lllllllllll */}
    </tr>
  );
};

Row.propTypes = {
  material: PropTypes.object,
  refetch: PropTypes.func,
  index:PropTypes.number,
};

export default Row