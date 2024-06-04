import { FaBookOpen, FaDiscourse, FaUsers } from "react-icons/fa";
import List from "../../../Shared/List/List";

const NavLinks = () => {
  return (
    <>
      <List
        label="View All Users"
        address="/dashboard/view-all-users"
        icon={FaUsers}
      />
      <List
        label="View All Study Session"
        address="/dashboard/view-all-study-session"
        icon={FaDiscourse}
      />
      <List
        label="View All Materials"
        address="/dashboard/view-all-materials"
        icon={FaBookOpen}
      />
    </>
  );
};

export default NavLinks;
