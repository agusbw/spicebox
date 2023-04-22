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
import PaginationButton from "../../../components/PaginationButton";

export default function UserRecipes() {
  const recipes = useLoaderData();
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filterState, setFilterState] = React.useState({
    search: "",
    visibility: "all",
    currentPage: 1,
    dishType: "all",
  });

  const { search, visibility, currentPage, dishType } = filterState;

  React.useEffect(() => {
    if (user && user.user_metadata.username !== username) {
      navigate(`/${user.user_metadata.username}/recipes`, { replace: true });
    }
  }, [user, username, navigate]);

  const handleSearchChange = (e) => {
    setFilterState({
      ...filterState,
      search: e.target.value,
      currentPage: 1,
    });
  };

  const handleVisibilityChange = (e) => {
    setFilterState({
      ...filterState,
      visibility: e.target.value,
      currentPage: 1,
    });
  };

  const handleDishTypeChange = (e) => {
    setFilterState({
      ...filterState,
      dishType: e.target.value,
      currentPage: 1,
    });
  };

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

  const totalPages = Math.ceil(filteredRecipes.length / 4);

  filteredRecipes = filteredRecipes.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  const handlePageChange = (page) => {
    setFilterState({
      ...filterState,
      currentPage: page,
    });
  };

  return (
    <>
      {username !== user.user_metadata.username && (
        <Navigate to={`/${user.user_metadata.username}/recipes`} replace />
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
              onChange={handleSearchChange}
            />
          </div>
          <Select className="max-w-fit" onChange={handleDishTypeChange}>
            <option value="all">All types</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </Select>
          <Select className="max-w-fit" onChange={handleVisibilityChange}>
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
                linkToDetail={`/${user.user_metadata.username}/recipes/${recipe.id}`}
              />
            ))}
        </div>

        <PaginationButton
          className="w-full flex justify-center mt-12"
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
