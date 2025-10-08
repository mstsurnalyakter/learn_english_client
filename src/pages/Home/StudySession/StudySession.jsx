import { useState } from "react";
import SessionCard from "../../../components/Card/SessionCard/SessionCard"
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
      <div className="text-center">
        <h2 className="font-bold text-2xl">Discover the Study Sessions</h2>
        <p className="text-sm  max-w-2xl mx-auto mt-2">Join live classes or book private sessions to fit your learning pace.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedSessions?.length > 0 ? (
          approvedSessions
            ?.slice(0, showAll)
            .map((session) => (
              <SessionCard key={session?._id} session={session} />
            ))
        ) : (
          <div className="col-span-full py-12 text-center">
            No sessions available right now. Check back soon or contact support for upcoming classes.
          </div>
        )}
      </div>

      {approvedSessions?.length > 6 && (
        <div className={`text-center`}>
          {btn ? (
            <Button
              className="bg-blue-600 text-white capitalize px-6 py-2 rounded-md"
              onClick={() => {
                setShowAll(6);
                setBtn(!btn);
              }}
            >
              See Fewer Sessions
            </Button>
          ) : (
            <Button
              className="bg-blue-600 text-white capitalize px-6 py-2 rounded-md"
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