import List from "../../Shared/List/List";
import { FaHome } from "react-icons/fa";
import NavLinks from "../Student/NavLinks/NavLinks";
import { Link } from "react-router-dom";
import logo from "/logo.png";


const Sidebar = () => {
     //TODO: get isAdmin value from the database
    const isStudent = true;
  return (
    <div className="flex flex-col justify-between -ml-7 lg:-ml-0 p-3 w-60 min-h-screen bg-[#4D95EA]">
      <div className="space-y-3">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-1  pb-3 border-b-2 text-gray-900"
        >
          <img className="w-12 rounded-full " src={logo} alt="" />
          <span className="mt-3 font-extrabold text-xl">
            LearnEnglish
          </span>
        </Link>

        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <List label="Home" address="/" icon={FaHome} />
            {isStudent && <NavLinks />}
          </ul>
        </div>
      </div>
      {/* <div></div> */}
      <div>
        <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt=""
            className="w-12 h-12 rounded-lg dark:bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
            <span className="flex items-center space-x-1">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline dark:text-gray-600"
              >
                View profile
              </a>
            </span>
          </div>
        </div>
        {/* llllllllllllllllll */}
        <div className="rounded-sm">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center p-2 space-x-3 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current dark:text-gray-600"
            >
              <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
              <rect width="32" height="64" x="256" y="232"></rect>
            </svg>
            <span>Logout</span>
          </a>
        </div>
        {/* llllllllllllllllll */}
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default Sidebar