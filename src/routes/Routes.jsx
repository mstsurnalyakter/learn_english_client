import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SingUp from "../pages/Authentication/SingUp/SingUp";
import Login from "../pages/Authentication/Login/Login";
import Dashboard from "../layouts/Dashboard";
import BookedSession from "../pages/Dashboard/Student/BookedSession/BookedSession";
import CreateNote from "../pages/Dashboard/Student/CreateNote/CreateNote";
import ManageNotes from "../pages/Dashboard/Student/ManageNotes/ManageNotes";
import StudyMaterials from "../pages/Dashboard/Student/StudyMaterials/StudyMaterials";
import CreateStudySession from "../pages/Dashboard/Tutor/CreateStudySession/CreateStudySession";
import ViewAllMaterials from "../pages/Dashboard/Tutor/ViewAllMaterials/ViewAllMaterials";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterials/UploadMaterials";

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
      {
        path: "study-materials",
        element: <StudyMaterials />,
      },
      // tutor routes
      {
        path: "create-study-session",
        element: <CreateStudySession />,
      },
      {
        path: "view-all-materials",
        element: <ViewAllMaterials />,
      },
      {
        path: "upload-materials",
        element:<UploadMaterials/>
      },
      // admin routes
      // {},
    ],
  },
]);

export default router;
