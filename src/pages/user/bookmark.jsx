import Container from "../../components/layouts/Container";
import {
  useLoaderData,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import React from "react";
import { Helmet } from "react-helmet-async";
import PublicRecipeCard from "../../components/PublicRecipeCard";
import PaginationButton from "../../components/PaginationButton";

const RECIPE_PER_PAGE = 8;

export default function Bookmark() {
  const recipes = useLoaderData();
  const { user } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  const [filterState, setFilterState] = React.useState({
    currentPage: 1,
  });

  React.useEffect(() => {
    if (user && user.user_metadata.username !== username) {
      navigate("/", {
        replace: true,
      });
    }
  }, [user, username, navigate]);

  const { currentPage } = filterState;

  let filteredRecipes = recipes;

  const totalPages = Math.ceil(filteredRecipes?.length / RECIPE_PER_PAGE);

  filteredRecipes = filteredRecipes?.slice(
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
        <Navigate to="/not-found" replace={true} state={{ notFound: true }} />
      ) : (
        <>
          <Helmet>
            <title>Bookmark | SpiceBox</title>
          </Helmet>
          <Container>
            <h1 className="text-4xl font-bold mb-3">Bookmark 📗</h1>
            {recipes.length === 0 ? (
              <p className="text-lg">No saved recipes</p>
            ) : (
              <>
                <p className="text-lg ">
                  Found{" "}
                  <span className="font-bold text-primary">
                    {recipes.length}
                  </span>{" "}
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
        </>
      )}
    </>
  );
}
