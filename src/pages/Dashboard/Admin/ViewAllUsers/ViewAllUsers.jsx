import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useUsers from "../../../../hooks/useUsers"
import UserDataRow from "./UserDataRow";


const ViewAllUsers = () => {
  const {users,isLoading,refetch} = useUsers();

  if (isLoading) return <LoadingSpinner/>
  return (
    <>
      <section className="container px-4 mx-auto pt-12">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">Study Session</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {users?.length > 0 && users?.length}
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
                          <span>Image</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Name</span>
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
                          <div className="flex items-center">Role</div>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <button className="flex items-center gap-x-2">
                          <div className="flex items-center">Timestamp</div>
                        </button>
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {users?.length > 0 &&
                      users?.map((user, index) => (
                        <UserDataRow
                          key={user?._id}
                          refetch={refetch}
                          index={index}
                          user={user}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewAllUsers