
import { FaPen } from "react-icons/fa6";
import List from "../../../Shared/List/List"
import { IoIosCreate } from "react-icons/io";
import { FaDiscourse } from "react-icons/fa";

const NavLinks = () => {
  return (
    <>
      <List
        label="Create Study Session"
        address="/dashboard/create-study-session"
        icon={IoIosCreate}
      />
      <List
        label="view all Study Session"
        address="/dashboard/view-all-study-sessions"
        icon={FaDiscourse}
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