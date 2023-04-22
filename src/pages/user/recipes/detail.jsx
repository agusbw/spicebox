import Container from "../../../components/layouts/Container";
import {
  useLoaderData,
  useParams,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import React from "react";
import DetailRecipeContainer from "../../../components/layouts/DetailRecipeContainer";
import { RECIPE_IMAGE_URL } from "../../../constants";
import useRecipe from "../../../hooks/useRecipe";
import Swal from "sweetalert2";

export default function UserDetailRecipe() {
  const recipe = useLoaderData();
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { deleteRecipe } = useRecipe();

  React.useEffect(() => {
    if (user && user.user_metadata.username !== username) {
      navigate(`/${user.user_metadata.username}/recipes`, { replace: true });
    }
  }, [user, username, navigate]);

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      const error = await deleteRecipe(recipe.id, recipe.image);
      if (error) {
        Swal.fire("Error!", "Something went wrong, try again!", "error");
        return;
      }
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      navigate(`/${user.user_metadata.username}/recipes`, { replace: true });
    }
  };

  return (
    <>
      {username !== user.user_metadata.username && (
        <Navigate to={`/${user.user_metadata.username}/recipes`} replace />
      )}

      {recipe === null ? (
        <Navigate to={`/${user.user_metadata.username}/recipes`} replace />
      ) : (
        <Container>
          <div className="md:max-w-5xl mx-auto">
            <div className="lg:flex gap-4">
              <div className="flex flex-col gap-3 lg:w-9/12">
                <div className="rounded-md shadow-md w-full bg-base-100 border">
                  <img
                    src={`${RECIPE_IMAGE_URL}/${recipe.image}`}
                    alt="Food Image"
                    className="w-full h-56 object-cover rounded-md"
                  />
                </div>
                <DetailRecipeContainer>
                  <h1 className="text-3xl font-bold">{recipe.title}</h1>
                  <p>
                    {recipe.description ? recipe.description : "No description"}
                  </p>
                </DetailRecipeContainer>
                <DetailRecipeContainer>
                  <h2 className="text-xl font-bold">Recipe Details</h2>
                  <p>
                    {recipe.serving_time
                      ? `Cooking time: ${recipe.serving_time} minutes`
                      : ""}
                  </p>
                  <p>
                    Diets:{" "}
                    {recipe.diets.length > 0 ? ` ${recipe.diets}` : "none"}
                  </p>
                  <p>
                    Visibility:
                    {recipe.is_public ? " Public" : " Private"}
                  </p>
                  <p>Halal: {recipe.is_halal ? " Yes" : " No"}</p>
                </DetailRecipeContainer>
                <DetailRecipeContainer className="lg:hidden">
                  <div className="flex w-full gap-4">
                    <Link className="btn btn-sm btn-outline btn-success  flex-1">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline btn-error flex-1"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete
                    </button>
                  </div>
                </DetailRecipeContainer>
                <DetailRecipeContainer>
                  <h2 className="text-xl font-bold mb-4">Ingredients</h2>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div className="" key={index}>
                      <p>{ingredient}</p>
                      <div className="divider m-0"></div>
                    </div>
                  ))}
                </DetailRecipeContainer>
                <DetailRecipeContainer>
                  <h2 className="text-xl font-bold mb-4">Cooking Steps</h2>
                  {recipe.instructions.map((instruction, index) => (
                    <div className="" key={index}>
                      <p className="font-semibold">Step {index + 1}</p>
                      <p>{instruction}</p>
                      <div className="divider m-0"></div>
                    </div>
                  ))}
                </DetailRecipeContainer>
              </div>
              <DetailRecipeContainer
                className={"hidden lg:block sticky  top-24 w-3/12 h-fit"}
              >
                <h2 className="text-xl font-bold mb-4">Actions</h2>
                <div className="flex flex-col w-full gap-3 justify-center items-center">
                  <div className="flex w-full gap-4">
                    <Link className="btn btn-sm btn-success flex-1" to={"/"}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-error flex-1"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <Link
                    className="link link-primary"
                    to={`/${user.user_metadata.username}/recipes`}
                  >
                    Your other recipes
                  </Link>
                </div>
              </DetailRecipeContainer>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
