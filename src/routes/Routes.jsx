import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SingUp from "../pages/Authentication/SingUp/SingUp";
import Login from "../pages/Authentication/Login/Login";

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
         element: <SingUp />
        },
      {
         path: "/login",
         element: <Login />
        },
    ],
  },
]);


export default router;