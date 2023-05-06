import Container from "../../../components/layouts/Container";
import { useLoaderData, Navigate, useParams } from "react-router-dom";
import PublicRecipeCard from "../../../components/PublicRecipeCard";
import PaginationButton from "../../../components/PaginationButton";
import React from "react";

const RECIPE_PER_PAGE = 8;

export default function RecipesByUser() {
  const recipes = useLoaderData();
  const { username } = useParams();
  const [filterState, setFilterState] = React.useState({
    currentPage: 1,
  });

  const { currentPage } = filterState;

  let filteredRecipes = recipes;

  const totalPages = Math.ceil(filteredRecipes.length / RECIPE_PER_PAGE);

  filteredRecipes = filteredRecipes.slice(
    (currentPage - 1) * RECIPE_PER_PAGE,
    currentPage * RECIPE_PER_PAGE
  );

  const handlePageChange = (page) => {
    setFilterState({
      ...filterState,
      currentPage: page,
    });
  };

  return (
    <>
      {recipes === null ? (
        <Navigate to="/" replace={true} state={{ notFound: true }} />
      ) : (
        <Container>
          <h1 className="text-4xl font-bold mb-3">
            Recipes By <span className="text-secondary">{username}</span> 📕
          </h1>
          {recipes.length === 0 ? (
            <p className="text-lg">No recipes found</p>
          ) : (
            <>
              <p className="text-lg ">
                Found{" "}
                <span className="font-bold text-primary">{recipes.length}</span>{" "}
                recipes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
                {filteredRecipes &&
                  filteredRecipes.map((recipe) => (
                    <PublicRecipeCard key={recipe.id} recipe={recipe} />
                  ))}
              </div>
              <PaginationButton
                className="w-full flex justify-center mt-12 mb-10"
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Container>
      )}
    </>
  );
}
