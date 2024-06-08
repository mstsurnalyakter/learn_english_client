import { useState } from "react";
import SessionCard from "../../../components/Card/SessionCard/SessionCard"
import useAllStudySession from "../../../hooks/useAllStudySession";
import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

const StudySession = () => {
   const [showAll, setShowAll] = useState(6);
  const [btn, setBtn] = useState(false);
  const axiosCommon = useAxiosCommon();




   const {
     data: approvedSessions = [],
     approvedSessionLoading,
     approvedSessionRefetch,
   } = useQuery({
     queryKey: ["approvedSession"],
     queryFn: async () => {
       const { data } = await axiosCommon(`/sessions/approved`);
       return data;
     },
   });

   if(approvedSessionLoading) return <LoadingSpinner/>


  return (
    <div className="space-y-8">
      <h2 className="text-center font-bold text-2xl">Discover the Study Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {approvedSessions?.length > 0 &&
          approvedSessions
            ?.slice(0, showAll)
            .map((session) => (
              <SessionCard key={session?._id} session={session} />
            ))}
      </div>
      {approvedSessions?.length > 6 && (
        <div className={`text-center`}>
          {btn ? (
            <Button
              className="bg-[#0073e1] capitalize"
              onClick={() => {
                setShowAll(6);
                setBtn(!btn);
              }}
            >
              See Fewer Sessions
            </Button>
          ) : (
            <Button
              className="bg-[#0073e1] capitalize"
              onClick={() => {
                setShowAll(approvedSessions?.length);
                setBtn(!btn);
              }}
            >
              See All Sessions
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default StudySession