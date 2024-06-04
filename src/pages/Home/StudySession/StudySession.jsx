import SessionCard from "../../../components/Card/SessionCard/SessionCard"


const StudySession = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <SessionCard />
      <SessionCard />
      <SessionCard />
      <SessionCard />
      <SessionCard />
      <SessionCard />
    </div>
  );
}

export default StudySession