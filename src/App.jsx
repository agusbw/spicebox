import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./contexts/Auth";
import useRecipe from "./hooks/useRecipe";

import RootLayout from "./components/layouts/RootLayout";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRecipeRoute from "./components/PrivateRecipeRoute";

import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import PublicRecipes from "./pages/recipes/";
import UserRecipes from "./pages/user/recipes";
import AddRecipe from "./pages/user/recipes/add";
import UpdateRecipe from "./pages/user/recipes/update";
import UserDetailRecipe from "./pages/user/recipes/detail";
import PublicDetailRecipe from "./pages/recipes/detail";
import RandomDetailRecipe from "./pages/recipes/random/detail";
import RandomRecipe from "./pages/recipes/random/";
import NotFound from "./pages/404";

function App() {
  const { user } = useAuth();
  const { getUserRecipes, getRecipe, getPublicRecipes, getUserAndRecipe } =
    useRecipe();

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
          path: "/:username/recipes/:recipeId/update",
          element: <PrivateRecipeRoute component={UpdateRecipe} />,
          loader: async ({ params }) => {
            const recipe = await getRecipe(params.recipeId);
            return recipe;
          },
        },
        {
          path: "/:username/recipes/:recipeId",
          element: <PrivateRecipeRoute component={UserDetailRecipe} />,
          loader: async ({ params }) => {
            const recipe = await getRecipe(params.recipeId);
            return recipe;
          },
        },
        {
          path: "/recipes",
          element: <PrivateRoute component={PublicRecipes} />,
          loader: async () => {
            const recipes = await getPublicRecipes();
            return recipes;
          },
        },
        {
          path: "/recipes/random",
          element: <PrivateRoute component={RandomRecipe} />,
        },
        {
          path: "/recipes/random/:recipeId",
          element: <PrivateRoute component={RandomDetailRecipe} />,
        },
        {
          path: "/recipes/:recipeId",
          element: <PrivateRoute component={PublicDetailRecipe} />,
          loader: async ({ params }) => {
            const recipe = await getUserAndRecipe(params.recipeId);
            return recipe;
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
