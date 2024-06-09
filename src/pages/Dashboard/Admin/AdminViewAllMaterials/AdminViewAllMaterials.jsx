
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const AdminViewAllMaterials = () => {

  const axiosSecure = useAxiosSecure();

  const {
    data: materials = [],
    isLoading: materialsLoading,
    refetch: materialsRefetch,
  } = useQuery({
    queryKey: ["materials"],
    enabled: !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/allMaterials`);
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
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <div>
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
    </div>
  );
}

export default AdminViewAllMaterials