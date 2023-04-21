import Container from "../../../components/layouts/Container";
import React from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  Link,
  useLoaderData,
} from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import { TextInput, Select } from "../../../components/FormComponents";
import RecipeCard from "../../../components/RecipeCard";

export default function UserRecipes() {
  const recipes = useLoaderData();
  const [search, setSearch] = React.useState("");
  const [visibility, setVisibility] = React.useState("all");
  const [dishType, setDishType] = React.useState("all");
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && user.user_metadata.username !== username) {
      navigate(`/${user.user_metadata.username}/recipes`, { replace: true });
    }
  }, [user, username, navigate]);

  let filteredRecipes = recipes;

  filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  filteredRecipes = filteredRecipes.filter((recipe) => {
    if (visibility === "all") return true;
    return recipe.is_public === JSON.parse(visibility);
  });

  filteredRecipes = filteredRecipes.filter((recipe) => {
    if (dishType === "all") return true;
    return recipe.dish_types.includes(dishType);
  });

  return (
    <>
      {username !== user.user_metadata.username && (
        <Navigate to={`/${user.user_metadata.usernamee}/recipes`} replace />
      )}

      <Container>
        <h1 className="text-5xl font-bold mb-3">My Recipes🍲</h1>
        <p className="text-2xl">
          This page contain all of your inserted recipes
        </p>

        <div className="flex my-4 gap-1 flex-wrap">
          <div className="flex">
            <Link
              className="btn btn-primary w-36"
              to={`/${user.user_metadata.username}/recipes/add`}
            >
              Add Recipe
            </Link>
            <TextInput
              placeholder="Search recipe by title!"
              className="md:max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            className="max-w-fit"
            onChange={(e) => setDishType(e.target.value)}
          >
            <option value="all">All types</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </Select>
          <Select
            className="max-w-fit"
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="all">All Visibility</option>
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredRecipes &&
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                username={user.user_metadata.username}
              />
            ))}
        </div>
      </Container>
    </>
  );
}
