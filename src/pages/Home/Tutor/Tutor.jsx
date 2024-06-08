

import TutorCard from "../../../components/Card/TutorCard/TutorCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const Tutor = () => {
  const axiosCommon = useAxiosCommon();

      const {
        data:tutors = [],
        tutorsLoading,
        tutorsRefetch,
      } = useQuery({
        queryKey: ["tutors"],
        queryFn: async () => {
          const { data } = await axiosCommon(`/tutors/tutor`);
          return data;
        },
      });

      if (tutorsLoading) return <LoadingSpinner/>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {tutors?.length > 0 && tutors?.map((user) => <TutorCard user={user} key={user?._id} />)}
    </div>
  );
}



export default Tutor