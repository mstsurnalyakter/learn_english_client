

import TutorCard from "../../../components/Card/TutorCard/TutorCard";
import useUsers from "../../../hooks/useUsers";

const Tutor = () => {
  const { users, userLoading, refetch } =  useUsers();
  const tutors = users?.filter((user) => user?.role === 'tutor');
  console.log(tutors);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {tutors?.length > 0 && tutors?.map((user) => <TutorCard user={user} key={user?._id} />)}
    </div>
  );
}



export default Tutor