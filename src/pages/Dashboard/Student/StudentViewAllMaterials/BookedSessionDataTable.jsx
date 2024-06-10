
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useBookingSessions from "../../../../hooks/useBookingSessions";

const BookedSessionDataTable = () => {
  const { bookingSessions, bookingsSessionLoading, bookingRefetch } =
    useBookingSessions();

  if (bookingsSessionLoading) return <LoadingSpinner />;

  return (
    <div>
      <section className="container px-4 mx-auto pt-12">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">
            My Study Session
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {bookingSessions?.length > 0 ? bookingSessions?.length : 0}
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
                          <span>Title</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <span>Tutor</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Registration Fee </span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        Session Id
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-[#4D95EA]"
                      >
                        Booking Date
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {bookingSessions?.length > 0 &&
                      bookingSessions?.map((session, index) => (
                        <tr key={session._id}>
                          <th className="px-4 py-4 font-medium text-sm text-gray-700 ">
                            {index + 1}
                          </th>

                          <td className="px-4 py-4 font-medium text-sm text-gray-700 ">
                            {session?.sessionTitle}
                          </td>

                          <td className="px-4 flex flex-col  py-4 text-sm text-gray-500 ">
                            <span>{session?.user?.name}</span>
                            <span>{session?.user?.email}</span>
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 ">
                            ${session?.registrationFee}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 ">
                            {session?.sessionID}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 ">
                            {new Date(session?.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 ">
                            <Link
                              to={`/dashboard/materials/${session?.sessionID}`}
                            >
                              <button
                                type="button"
                                className="flex items-center bg-[#4D95EA] text-white hover:bg-[#358ef4]  justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
                              >
                               View Materials
                              </button>
                            </Link>
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
};

export default BookedSessionDataTable;
