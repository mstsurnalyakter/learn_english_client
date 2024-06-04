
import { FaPen } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import List from "../../../Shared/List/List"
import { IoIosCreate } from "react-icons/io";

const NavLinks = () => {
  return (
    <>
      <List
        label="Create Study Session"
        address="/dashboard/create-study-session"
        icon={IoIosCreate}
      />
      <List
        label="View All Materials"
        address="/dashboard/view-all-materials"
        icon={IoDocument}
      />
      <List
        label="Upload Materials"
        address="/dashboard/upload-materials"
        icon={FaPen}
      />
    </>
  );
}

export default NavLinks