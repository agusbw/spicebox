import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./contexts/Auth";
import useRecipe from "./hooks/useRecipe";
import useBookmark from "./hooks/useBookmark";

import RootLayout from "./components/layouts/RootLayout";
import PrivateRoute from "./components/hoc/PrivateRoute";
import PrivateRecipeRoute from "./components/hoc/PrivateRecipeRoute";

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
import Bookmark from "./pages/user/bookmark";
import RecipesByUser from "./pages/recipes/users";
import Profile from "./pages/user";
import NotFound from "./pages/404";
import useUser from "./hooks/useUser";

function App() {
  const { user } = useAuth();
  const {
    getUserRecipes,
    getRecipe,
    getPublicRecipes,
    getUserAndRecipe,
    getUserPublicRecipes,
  } = useRecipe();
  const { getUser } = useUser();
  const { getUserBookmarks } = useBookmark();

  const router = createBrowserRouter([
    {
      path: "/not-found",
      element: <NotFound />,
    },
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
          path: "/:username",
          element: <PrivateRoute component={Profile} />,
          loader: async ({ params }) => {
            const user = await getUser(params.username);
            return user ? user : null;
          },
        },
        {
          path: "/:username/recipes",
          element: <PrivateRoute component={UserRecipes} />,
          loader: async () => {
            if (user) {
              const recipes = await getUserRecipes(user.id);
              return recipes && recipes.length > 0 ? recipes : [];
            }
            return null;
          },
        },
        {
          path: "/:username/bookmarks",
          element: <PrivateRoute component={Bookmark} />,
          loader: async () => {
            if (user) {
              const bookmarks = await getUserBookmarks(user.id);
              const recipes = bookmarks.map((bookmark) => bookmark.recipe);
              return recipes && recipes.length > 0 ? recipes : [];
            }
            return null;
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
            return recipe ? recipe : null;
          },
        },
        {
          path: "/:username/recipes/:recipeId",
          element: <PrivateRecipeRoute component={UserDetailRecipe} />,
          loader: async ({ params }) => {
            const recipe = await getUserAndRecipe(params.recipeId);
            return recipe ? recipe : null;
          },
        },
        {
          path: "/recipes",
          element: <PublicRecipes />,
          loader: async () => {
            const recipes = await getPublicRecipes();
            return recipes && recipes.length > 0 ? recipes : [];
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
          path: "/recipes/users/:username",
          element: <RecipesByUser />,
          loader: async ({ params }) => {
            const user = await getUser(params.username);
            if (user) {
              const recipes = await getUserPublicRecipes(user.id);
              return recipes && recipes.length > 0 ? recipes : [];
            }
            return null;
          },
        },
        {
          path: "/recipes/:recipeId",
          element: <PublicDetailRecipe />,
          loader: async ({ params }) => {
            const recipe = await getUserAndRecipe(params.recipeId);
            return recipe ? recipe : null;
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
