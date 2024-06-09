import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import UpdateNoteForm from "./UpdateNoteForm";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";

const UpdateNote = ({ note, refetch }) => {
  const axiosSecure = useAxiosSecure();
    const [edit, setEdit] = useState(false);

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
           const { data } = await axiosSecure.delete(`note/${id}`);

           if (data.deletedCount > 0) {
             Swal.fire({
               title: "Deleted!",
               text: "Note has been deleted.",
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
    <div>
      {edit ? (
        <UpdateNoteForm note={note} refetch={refetch} setEdit={setEdit} />
      ) : (
        <>
          <details className="w-full border-2 border-[#a7cbf4] rounded-lg">
            <summary className="px-4 items-center py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              <div className="flex pl-5 -mt-7 justify-between">
                <div>
                  <h3 className="font-bold mb-1">{note?.title}</h3>
                  <p>
                    Last Update:
                    {new Date(note?.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-2xl">
                  <button
                    onClick={() => handleDelete(note?._id)}
                    className="text-red-600"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => setEdit(true)}
                    className="text-[#0f67cc] "
                  >
                    <BiSolidEdit />
                  </button>
                </div>
              </div>
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              {note?.description}
            </p>
          </details>
        </>
      )}
    </div>
  );
};

UpdateNote.propTypes = {
  note:PropTypes.object,
  refetch:PropTypes.func
};

export default UpdateNote;
