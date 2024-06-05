import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SingUp from "../pages/Authentication/SingUp/SingUp";
import Login from "../pages/Authentication/Login/Login";
import Dashboard from "../layouts/Dashboard";
import BookedSession from "../pages/Dashboard/Student/BookedSession/BookedSession";
import CreateNote from "../pages/Dashboard/Student/CreateNote/CreateNote";
import ManageNotes from "../pages/Dashboard/Student/ManageNotes/ManageNotes";
import CreateStudySession from "../pages/Dashboard/Tutor/CreateStudySession/CreateStudySession";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterials/UploadMaterials";
import ViewAllUsers from "../pages/Dashboard/Admin/ViewAllUsers/ViewAllUsers";
import ViewAllStudySession from "../pages/Dashboard/Admin/ViewAllStudySession/ViewAllStudySession";
import ViewAllMaterials from "../pages/Dashboard/Common/ViewAllMaterials/ViewAllMaterials";
import ViewAllStudySessions from "../pages/Dashboard/Tutor/ViewAllStudySessions/ViewAllStudySessions";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SingUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // common route
      {
        index: true,
        element: <ViewAllMaterials />,
      },
      // student routes
      {
        path: "booked-session",
        element: <BookedSession />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
      {
        path: "manage-notes",
        element: <ManageNotes />,
      },
      // tutor routes
      {
        path: "create-study-session",
        element: <CreateStudySession />,
      },
      {
        path: "upload-materials",
        element: <UploadMaterials />,
      },
      {
        path: "view-all-study-sessions",
        element:<ViewAllStudySessions/>
      },
      // admin routes
      {
        path: "view-all-users",
        element: <ViewAllUsers />,
      },
      {
        path: "view-all-study-session",
        element: <ViewAllStudySession />,
      },
    ],
  },
]);

export default router;
