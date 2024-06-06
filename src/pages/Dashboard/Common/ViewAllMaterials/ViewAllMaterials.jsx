import AdminViewAllMaterials from "../../Admin/AdminViewAllMaterials/AdminViewAllMaterials";
import StudentViewAllMaterials from "../../Student/StudentViewAllMaterials/StudentViewAllMaterials";
import TutorViewAllMaterials from "../../Tutor/TutorViewAllMaterials/TutorViewAllMaterials";


const ViewAllMaterials = () => {
      const isStudent = false;
      const isTutor = true;
      const isAdmin = false;
  return (
    <>
    {isStudent && <StudentViewAllMaterials/>}
    {isTutor && <TutorViewAllMaterials/>}
    {isAdmin && <AdminViewAllMaterials/>}
    </>
  )
}

export default ViewAllMaterials