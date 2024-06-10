
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";


const AdminViewAllMaterials = () => {

  const axiosSecure = useAxiosSecure();
     const [currentPage, setCurrentPage] = useState(1);
     const [itemPerPage, setItemPerPage] = useState(5);
     const [materials,setMaterials] = useState();
     const [count, setCount] = useState(0);
     const numberOfPages = Math.ceil(count / itemPerPage);
     const pages = [...Array(numberOfPages).keys()].map(
       (element) => element + 1
     );


  const {
    data: materials2 = [],
    isLoading: materialsLoading,
    refetch: materialsRefetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["materials", currentPage, itemPerPage],
    enabled: !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/allMaterials?page=${currentPage}&size=${itemPerPage}`
      );
      setMaterials(data)
      return data;
    },
  });


     const {
       data: countData = [],
       isLoading: countIsLoading,
       refetch: countRefetch,
       isError: countIsError,
       error: countError,
     } = useQuery({
       queryKey: ["users-count"],
       enabled: !!localStorage.getItem("access-token"),
       queryFn: async () => {
         const { data } = await axiosSecure(`/materials-count`);
         setCount(data.count);
         return data;
       },
     });



    const handleDelete = async (id) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,remove it!",
        });

        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`allMaterial/${id}`);

          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Removed!",
              text: "Material has been removed.",
              icon: "success",
            });


            materialsRefetch();
            // countRefetch();
            // Update local state directly to remove deleted material
            const updatedMaterials = materials.filter(
              (material) => material._id !== id
            );
            setMaterials(updatedMaterials);
            setCount((prevCount) => prevCount - 1);
            // Optionally, you can refetch count to keep it in sync
            countRefetch();
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };



  if (materialsLoading || countIsLoading) return <LoadingSpinner />;

  if (isError || countIsError) {
    toast.error(error.message);
  }

  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };

  return (
    <div className="mb-10">
      <section className="container px-4 mx-auto pt-12">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">Study material</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {materials?.length > 0 ? materials?.length : 0}
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
                        Image
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
                        <span>Tutor Email</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Session Id </span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        Google Drive Link
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {materials?.length > 0 &&
                      materials?.map((material, index) => (
                        <tr key={material?._id}>
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

                          <td className="px-4 py-4 text-lg space-x-2">
                            <button
                              onClick={() => handleDelete(material?._id)}
                              className="text-red-600"
                            >
                              <MdDelete />
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

      {/* pagination section */}

      <div className="flex justify-center mt-16">
        {/* previous button */}
        <button
          onClick={() => handlePaginationButton(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-gray-700 dark:text-gray-900 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#4D95EA]  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {/* numbers */}
        {pages?.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => handlePaginationButton(btnNum)}
            className={`hidden ${
              currentPage === btnNum
                ? "bg-[#0372f2] text-white"
                : "bg-[#8abaf1]  text-white"
            } px-4 py-2 mx-1 transition-colors duration-300 dark:text-gray-100  transform  rounded-md sm:inline`}
          >
            {btnNum}
          </button>
        ))}

        {/* next button */}
        <button
          onClick={() => handlePaginationButton(currentPage + 1)}
          disabled={currentPage === numberOfPages}
          className="px-4 py-2 mx-1 text-gray-700 dark:text-gray-900 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#4D95EA] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

export default AdminViewAllMaterials