import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Messages from "./components/Messsages";
import Account from "./components/Account";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="login" />
      // Create errorElement
    },
    {
      path: "signup",
      element: <SignUp />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: ":id/profile",
      element: <Profile />,
      children: [
        {
          path: "messages",
          element: <Messages />
        },
        {
          path: "account",
          element: <Account />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
