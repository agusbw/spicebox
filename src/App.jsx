import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./contexts/Auth";
import useRecipe from "./hooks/useRecipe";

import RootLayout from "./components/layouts/RootLayout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import UserRecipes from "./pages/user/recipes";
import AddRecipe from "./pages/user/recipes/add";
import UserDetailRecipe from "./pages/user/recipes/detail";
import NotFound from "./pages/404";

function App() {
  const { user } = useAuth();
  const { getUserRecipes, getRecipe } = useRecipe();

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
          loader: async () => {
            if (user) {
              const recipes = await getUserRecipes(user.id);
              return recipes;
            }
            return [];
          },
        },
        {
          path: "/:username/recipes/add",
          element: <PrivateRoute component={AddRecipe} />,
        },
        {
          path: "/:username/recipes/:recipeId",
          element: <PrivateRoute component={UserDetailRecipe} />,
          loader: async ({ params }) => {
            if (user) {
              const recipe = await getRecipe(params.recipeId);
              if (recipe.user_id !== user.id) {
                return null;
              }
              return recipe;
            }
            return null;
          },
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" replace={true} /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" replace={true} /> : <Register />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
