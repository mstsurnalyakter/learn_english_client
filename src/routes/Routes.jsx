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
import SessionDetail from "../pages/SessionDetail/SessionDetail";
import PrivateRoute from "./PrivateRoute";



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
      {
        path: "/sessionDetail/:id",
        element: (
          <PrivateRoute>
            <SessionDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // common route
      {
        index: true,
        element: (
          <PrivateRoute>
            <ViewAllMaterials />
          </PrivateRoute>
        ),
      },
      // student routes
      {
        path: "booked-session",
        element: (
          <PrivateRoute>
            <BookedSession />
          </PrivateRoute>
        ),
      },
      {
        path: "create-note",
        element: (
          <PrivateRoute>
            <CreateNote />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-notes",
        element: (
          <PrivateRoute>
            <ManageNotes />
          </PrivateRoute>
        ),
      },
      // tutor routes
      {
        path: "create-study-session",
        element: (
          <PrivateRoute>
            <CreateStudySession />
          </PrivateRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <PrivateRoute>
            <UploadMaterials />
          </PrivateRoute>
        ),
      },
      {
        path: "view-all-study-sessions",
        element: (
          <PrivateRoute>
            <ViewAllStudySessions />
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: "view-all-users",
        element: (
          <PrivateRoute>
            <ViewAllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "view-all-study-session",
        element: (
          <PrivateRoute>
            <ViewAllStudySession />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
