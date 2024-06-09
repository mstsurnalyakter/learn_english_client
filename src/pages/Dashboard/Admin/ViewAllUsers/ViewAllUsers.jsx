import { useState } from "react";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import UserDataRow from "./UserDataRow";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";


const ViewAllUsers = () => {
  // const { users, userLoading, refetch } = useUsers();
  const axiosSecure = useAxiosSecure();
  const [users,setUsers] = useState([])
   const [currentPage, setCurrentPage] = useState(1);
   const [itemPerPage, setItemPerPage] = useState(5);
     const [search, setSearch] = useState("");
     const [searchText, setSearchText] = useState("");
    const [count, setCount] = useState(0);
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()].map(
      (element) => element + 1
    );


    const {
      data = [],
      isLoading,
      refetch,
      isError,
      error,
    } = useQuery({
      queryKey: ["all-users", currentPage, itemPerPage, search],
      enabled: !!localStorage.getItem("access-token"),
      queryFn: async () => {
        const { data } = await axiosSecure(
          `/all-users?page=${currentPage}&size=${itemPerPage}&search=${search}`
        );
        setUsers(data);
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
        queryKey: ["users-count",search],
        enabled: !!localStorage.getItem("access-token"),
        queryFn: async () => {
          const { data } = await axiosSecure(`/users-count?search=${search}`);
          setCount(data.count);
          return data;
        },
      });


  if (isLoading || countIsLoading) return <LoadingSpinner />;

    if (isError || countError) {
      toast.error(error.message);
    }



    const handleSearch = (e) => {
      e.preventDefault();
      setSearch(searchText.trim());
      setCurrentPage(1)
      refetch();
    };


     const handlePaginationButton = (value) => {
       console.log(value);
       setCurrentPage(value);
       refetch()
     };

  return (
    <div>
      <header>
        <div className="w-full   object-cover bg-cover h-[140px]">
          <div className="flex items-center justify-center w-full h-full bg-[#4D95EA]">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                Search a User by Name or Email
              </h1>

              <form onSubmit={handleSearch} className="relative mt-4">
                <input
                  type="text"
                  name="search"
                  placeholder=" Search a User by Name or Email"
                  className="py-3 outline-none w-full pl-3 rounded"
                  id="search"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <button
                  type="submit"
                  className="!absolute bg-[#4D95EA] text-white px-3 py-2 right-1 top-1 rounded"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

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
              currentPage === btnNum ? "bg-[#2686f5] text-white " : ""
            } px-4 py-2 mx-1 transition-colors duration-300 dark:text-gray-100  transform  rounded-md sm:inline bg-[#94c0f2]  text-white`}
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

export default ViewAllUsers