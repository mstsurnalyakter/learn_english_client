import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Row from "./Row";

const TutorViewAllMaterials = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tutorMaterials = [],
    isLoading:tutorMaterialsLoading,
    refetch: tutorMaterialsRefetch,
  } = useQuery({
    queryKey: ["tutorMaterials", user?.email],
    enabled:
      (!loading && !!user?.email) || !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/tutorMaterials/${user?.email}`);
      return data;
    },
  });

  console.log(tutorMaterials);

return (
  <div>
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Study material</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {tutorMaterials?.length > 0 ? tutorMaterials?.length : 0}
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
                      <span>Email</span>
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
                  {tutorMaterials?.length > 0 &&
                    tutorMaterials?.map((material, index) => (
                      <Row
                        index={index}
                        material={material}
                        refetch={tutorMaterialsRefetch}
                        key={material?._id}
                      />
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

export default TutorViewAllMaterials;
