// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import useAuth from "../../../../hooks/useAuth";
// import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
// import { MdDelete } from "react-icons/md";
// import { BiSolidEdit } from "react-icons/bi";
// import Swal from "sweetalert2";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import UpdateNoteModal from "./UpdateNoteModal";

// const ManageNotes = () => {
//   const axiosSecure = useAxiosSecure();
//   const {user,loading} = useAuth();
//    let [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const { data: notes = [], notesLoading,refetch:noteRefetch } = useQuery({
//     queryKey: ["notes", user?.email],
//     enabled:
//       (!loading && !!user?.email) || !!localStorage.getItem("access-token"),
//     queryFn: async () => {
//       const { data } = await axiosSecure(`/note/${user?.email}`);
//       return data;
//     },
//   });


//   const handleDelete = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         const { data } = await axiosSecure.delete(`note/${id}`);

//         if (data.deletedCount > 0) {
//           Swal.fire({
//             title: "Deleted!",
//             text: "Note has been deleted.",
//             icon: "success",
//           });
//           noteRefetch();
//         }
//       }
//     } catch (error) {
//     toast.error(error.message);
//     console.log(error);
//     }
//   };


//  if(notesLoading) return <LoadingSpinner/>

//   return (
//     <div>
//       <section className="dark:bg-gray-100 dark:text-gray-800">
//         <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
//           <h2 className="text-2xl flex items-center gap-3 mb-5 font-semibold sm:text-4xl">
//             My Notes{" "}
//             <span className="px-3 py-1 text-xl text-blue-600 bg-blue-100 rounded-full ">
//               {notes?.length > 0 ? notes?.length : 0}
//             </span>
//           </h2>

//           <div className="space-y-4">
//             {notes?.length > 0 &&
//               notes?.map((note) => (
//                 <details
//                   key={note?._id}
//                   className="w-full border-2 border-[#a7cbf4] rounded-lg"
//                 >
//                   <summary className="px-4 items-center py-6 focus:outline-none focus-visible:dark:ring-violet-600">
//                     <div className="flex pl-5 -mt-7 justify-between">
//                       <div>
//                         <h3 className="font-bold mb-1">{note?.title}</h3>
//                         <p>{new Date(note?.date).toLocaleDateString()}</p>
//                       </div>
//                       <div className="flex items-center gap-2 text-2xl">
//                         <button
//                           onClick={() => handleDelete(note?._id)}
//                           className="text-red-600"
//                         >
//                           <MdDelete />
//                         </button>
//                         <button
//                           onClick={() => setIsEditModalOpen(true)}
//                           className="text-[#0f67cc] "
//                         >
//                           <BiSolidEdit />
//                         </button>
//                         {/* lllllllllllllllllllll */}
//                         {/* Update Modal */}
//                         {/* <UpdateNoteModal
//                           isOpen={isEditModalOpen}
//                           note={note}
//                           setIsEditModalOpen={setIsEditModalOpen}
//                           refetch={noteRefetch}
//                         /> */}
//                         {/* lllllllllllllllllllll */}
//                       </div>
//                     </div>
//                   </summary>
//                   <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
//                     {note?.description}
//                   </p>
//                   {/* lllllllllllllllllllllllllllll */}
//                   <UpdateNoteModal
//                     isOpen={isEditModalOpen}
//                     note={note}
//                     setIsEditModalOpen={setIsEditModalOpen}
//                     refetch={noteRefetch}
//                   />
//                   {/* lllllllllllllllllllllllllllll */}
//                 </details>
//               ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ManageNotes;




import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import UpdateNote from "./UpdateNote";
// import { MdDelete } from "react-icons/md";
// import { BiSolidEdit } from "react-icons/bi";
// import Swal from "sweetalert2";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import UpdateNoteForm from "./UpdateNoteForm";
// import UpdateNoteForm from "./UpdateNoteForm";

const ManageNotes = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  // let [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const {
    data: notes = [],
    notesLoading,
    refetch: noteRefetch,
  } = useQuery({
    queryKey: ["notes", user?.email],
    enabled:
      (!loading && !!user?.email) || !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/note/${user?.email}`);
      return data;
    },
  });

  console.log(notes);



  if (notesLoading) return <LoadingSpinner />;

  return (
    <div>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
          <h2 className="text-2xl flex items-center gap-3 mb-5 font-semibold sm:text-4xl">
            My Notes{" "}
            <span className="px-3 py-1 text-xl text-blue-600 bg-blue-100 rounded-full ">
              {notes?.length > 0 ? notes?.length : 0}
            </span>
          </h2>

          <div className="space-y-4">
            {notes?.length > 0 &&
              notes?.map((note) => (
               <UpdateNote key={note?._id} note={note} refetch={noteRefetch} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageNotes;