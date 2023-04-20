import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/404";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      index: true,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
