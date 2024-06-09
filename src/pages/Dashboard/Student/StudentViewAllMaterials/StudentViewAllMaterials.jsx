import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useBookingSessions from "../../../../hooks/useBookingSessions";
import { FaDownload } from "react-icons/fa6";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

const StudentViewAllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { bookingSessions, bookingsSessionLoading, bookingRefetch } =
    useBookingSessions();
     const targetRef = useRef();

  const {
    data: myMaterials = [],
    isLoading: myMaterialsLoading,
    refetch: myMaterialsRefetch,
  } = useQuery({
    queryKey: ["my-materials"],
    enabled: !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-materials`
      );
      return data;
    },
  });

  const filterMaterials = myMaterials.filter((material) =>
    bookingSessions.some((session) => session.sessionID === material.sessionID)
  );

  if (myMaterialsLoading || bookingsSessionLoading) {
    return <LoadingSpinner/>
  }

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Study material</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {filterMaterials?.length > 0 ? filterMaterials?.length : 0}
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
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                    >
                      Google Drive Link
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {filterMaterials?.length > 0 &&
                    filterMaterials?.map((material, index) => (
                      <tr key={material?._id}>
                        <th className="px-4 py-4 font-medium text-sm text-gray-700 ">
                          {index + 1}
                        </th>

                        <td className="px-4 flex-col items-center py-4 flex gap-2 font-medium text-2xl text-gray-700 ">
                          <img
                            ref={targetRef}
                            alt=""
                            className="w-32 h-14 rounded dark:bg-gray-500 border-2 border-[#c4daf3]"
                            src={material?.imageURL}
                          />
                          <button
                            onClick={() =>
                              generatePDF(targetRef, { filename: "page.pdf" })
                            }
                            className="text-[#1881f9]"
                          >
                            <FaDownload />
                          </button>
                        </td>

                        <td className="px-4 py-4 text-sm text-blue-600 underline ">
                          <a
                            href={material?.link}
                            className=""
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {material?.link}
                          </a>
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
  );
}

export default StudentViewAllMaterials