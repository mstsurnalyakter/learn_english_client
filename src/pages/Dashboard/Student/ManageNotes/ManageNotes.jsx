import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

const ManageNotes = () => {
  const axiosSecure = useAxiosSecure();
  const {user,loading} = useAuth();

  const { data: notes = [], notesLoading } = useQuery({
    queryKey: ["notes", user?.email],
    enabled:
      (!loading && !!user?.email) || !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/note/${user?.email}`);
      return data;
    },
  });
  console.log(notes);

 if(notesLoading) return <LoadingSpinner/>

  return (
    <div>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 mb-8 dark:text-gray-600">
            Sagittis tempor donec id vestibulum viverra. Neque condimentum
            primis orci at lacus amet bibendum.
          </p>
          <div className="space-y-4">
            {notes?.length > 0 &&
              notes?.map((note) => (
                <details
                  key={note?._id}
                  className="w-full border-2 border-[#a7cbf4] rounded-lg"
                >
                  <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                    <div>
                      <h3>{note?.title}</h3>
                      <p>
                        {new Date(
                          note?.date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div></div>
                  </summary>
                  <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                    Lectus iaculis orci metus vitae ligula dictum per. Nisl per
                    nullam taciti at adipiscing est.{" "}
                  </p>
                </details>
              ))}

            {/* <details className="w-full border-2 border-[#a7cbf4] rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                Ex orci laoreet egestas sapien magna egestas scelerisque?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                Lectus iaculis orci metus vitae ligula dictum per. Nisl per
                nullam taciti at adipiscing est.{" "}
              </p>
            </details> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageNotes;
