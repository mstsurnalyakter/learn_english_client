

import TutorCard from "../../../components/Card/TutorCard/TutorCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const Tutor = () => {
  const axiosCommon = useAxiosCommon();

      const {
        data:tutors = [],
        isLoading:tutorsLoading,
      } = useQuery({
        queryKey: ["tutors"],
        queryFn: async () => {
          const { data } = await axiosCommon(`/tutors/tutor`);
          return data;
        },
      });

      if (tutorsLoading) return <LoadingSpinner/>

  return (
    <div className="space-y-10">
      <div className="max-w-3xl mx-auto text-center space-y-3 px-4">
        <h2 className="font-bold text-2xl">Our Tutors</h2>
        <p className="text-sm ">
          All tutors on our platform are experienced and ready to help you
          reach your language goals. Browse profiles and pick the tutor who
          matches your learning style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {tutors?.length > 0 ? (
          tutors?.map((user) => <TutorCard user={user} key={user?._id} />)
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
            No tutors found right now. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
}



export default Tutor