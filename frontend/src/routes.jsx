import App from "./App.jsx";
import Home from "./components/Home/Home.jsx";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default routes;
