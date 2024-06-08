import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../../../../hooks/useRole";
import AdminViewAllMaterials from "../../Admin/AdminViewAllMaterials/AdminViewAllMaterials";
import StudentViewAllMaterials from "../../Student/StudentViewAllMaterials/StudentViewAllMaterials";
import TutorViewAllMaterials from "../../Tutor/TutorViewAllMaterials/TutorViewAllMaterials";


const ViewAllMaterials = () => {
      const {role, isLoading} = useRole();
      if (isLoading) return <LoadingSpinner/>
  return (
    <>
      {role === "student" && <StudentViewAllMaterials />}
      {role === "tutor" && <TutorViewAllMaterials />}
      {role === "admin" && <AdminViewAllMaterials />}
    </>
  );
}

export default ViewAllMaterials