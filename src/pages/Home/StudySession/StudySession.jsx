import { useState } from "react";
import SessionCard from "../../../components/Card/SessionCard/SessionCard"
import useAllStudySession from "../../../hooks/useAllStudySession";
import { Button } from "@material-tailwind/react";

const StudySession = () => {
   const [showAll, setShowAll] = useState(6);
  const { studySessions, isLoading, refetch } = useAllStudySession();
  const [btn, setBtn] = useState(false);

  const approvedSession = studySessions?.filter(
    (session) => session?.status === "approved"
  );


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {studySessions?.length > 0 &&
          approvedSession
            ?.slice(0, showAll)
            .map((session) => (
              <SessionCard key={session?._id} session={session} />
            ))}
      </div>
      {approvedSession?.length > 6 && (
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
                setShowAll(studySessions?.length);
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