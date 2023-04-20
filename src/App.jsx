import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAuth } from "./contexts/Auth";

import RootLayout from "./components/layouts/RootLayout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import UserRecipes from "./pages/user/recipes";
import NotFound from "./pages/404";

function App() {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
          index: true,
        },
        {
          path: "/:username/recipes",
          element: <PrivateRoute component={UserRecipes} />,
        },
      ],
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
