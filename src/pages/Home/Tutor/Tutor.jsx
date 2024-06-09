

import TutorCard from "../../../components/Card/TutorCard/TutorCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const Tutor = () => {
  const axiosCommon = useAxiosCommon();

      const {
        data:tutors = [],
        isLoading:tutorsLoading,
        refetch:tutorsRefetch,
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
      <div className="w-1/2 mx-auto text-center space-y-3">
        <h2 className="text-center font-bold text-2xl">Our Tutors</h2>
        <p>
          100% of tutors on our platform are native English speakers. They are
          all experts at teaching the LearnEnglish curriculum. Many hold
          graduate degrees from top universities in the US, UK, and Canada. We
          are continually impressed by our tutors, and we think you will be too!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tutors?.length > 0 &&
          tutors?.map((user) => <TutorCard user={user} key={user?._id} />)}
      </div>
    </div>
  );
}



export default Tutor