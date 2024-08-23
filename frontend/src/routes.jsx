import App from "./App.jsx";
import Home from "./components/Home/Home.jsx";
import { createBrowserRouter } from "react-router-dom";
import LogIn from "./components/Log In/LogIn.jsx";
import SignUp from "./components/Sign Up/SignUp.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/log-in",
        element: <LogIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default routes;
