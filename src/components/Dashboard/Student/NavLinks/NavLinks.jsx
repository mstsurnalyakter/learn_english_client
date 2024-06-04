import { FaBookOpen, FaBookmark } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import List from "../../../Shared/List/List"

const NavLinks = () => {
  return (
    <>
      <List
        label="Booked Session"
        address="/dashboard/booked-session"
        icon={FaBookmark}
      />
      <List label="Create Note" address="/dashboard/create-note" icon={FaPen} />
      <List
        label="Manage Notes"
        address="/dashboard/manage-notes"
        icon={IoDocument}
      />
      <List
        label="Study Materials"
        address="/dashboard/study-materials"
        icon={FaBookOpen}
      />
    </>
  );
}

export default NavLinks