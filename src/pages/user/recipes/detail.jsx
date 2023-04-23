import Container from "../../../components/layouts/Container";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import DetailRecipeContainer from "../../../components/layouts/DetailRecipeContainer";
import profile from "../../../assets/profile.png";
import { RECIPE_IMAGE_URL } from "../../../constants";
import useRecipe from "../../../hooks/useRecipe";
import Swal from "sweetalert2";
import { getFullName } from "../../../utils/functions";

export default function UserDetailRecipe() {
  const recipe = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { deleteRecipe } = useRecipe();

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
    });

    if (!isConfirmed) return;
    const error = await deleteRecipe(recipe.id, recipe.image);
    if (error) {
      Swal.fire("Error!", "Something went wrong, try again!", "error");
      return;
    }
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    navigate(`/${user.user_metadata.username}/recipes`, { replace: true });
  };

  return (
    <>
      <Container className="min-h-screen mx-auto">
        <div className="md:max-w-5xl mx-auto">
          <div className="lg:flex gap-4">
            <div className="flex flex-col gap-3 lg:w-8/12">
              <div className="rounded-md shadow-md w-full bg-base-100 border">
                <img
                  src={`${RECIPE_IMAGE_URL}/${recipe.image}`}
                  alt="Food Image"
                  className="w-full h-56 object-cover rounded-md"
                />
              </div>
              <DetailRecipeContainer>
                <h1 className="text-3xl font-vidaloka">{recipe.title}</h1>
                <p>
                  {recipe.description ? recipe.description : "No description"}
                </p>
              </DetailRecipeContainer>
              <DetailRecipeContainer>
                <h2 className="text-2xl font-vidaloka">Recipe Details</h2>
                <p>
                  {recipe.dish_types.length > 0 ? (
                    <span>
                      Dish Types:{" "}
                      {recipe.dish_types.map((dish, index) => (
                        <span key={index} className="badge badge-accent me-1">
                          {dish}{" "}
                        </span>
                      ))}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p>
                  {recipe.serving_time
                    ? `Cooking time: ${recipe.serving_time} minutes`
                    : ""}
                </p>
                <p>
                  {recipe.portion ? `Portion: ${recipe.portion} person` : ""}
                </p>
                <p>
                  {recipe.difficulty ? `Difficulty: ${recipe.difficulty}` : ""}
                </p>
                <p>
                  Diets: {recipe.diets.length > 0 ? ` ${recipe.diets}` : "none"}
                </p>
                <p>
                  Visibility:
                  {recipe.is_public ? " Public" : " Private"}
                </p>
                <p>Halal: {recipe.is_halal ? " Yes" : " No"}</p>
              </DetailRecipeContainer>
              <DetailRecipeContainer className="lg:hidden">
                <div className="flex flex-col justify-center items-center mb-4">
                  <div className="">
                    <img
                      src={`${profile}`}
                      alt="Food Image"
                      className="object-cover btn-circle w-24 h-24"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-vidaloka text-lg">
                      {user &&
                        getFullName(
                          user.user_metadata.firstname,
                          user.user_metadata.lastname
                        )}
                    </p>
                    <Link>@{user.user_metadata.username}</Link>
                  </div>
                </div>
                <div className="flex w-full gap-4">
                  <Link className="btn btn-sm btn-primary flex-1">Edit</Link>
                  <button
                    className="btn btn-sm btn-secondary flex-1"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </DetailRecipeContainer>
              <DetailRecipeContainer className={"bg-orange-100"}>
                <h2 className="text-2xl font-vidaloka mb-4">Ingredients</h2>
                {recipe.ingredients.map((ingredient, index) => (
                  <div className="font-light text-lg" key={index}>
                    <p>{ingredient}</p>
                    <div className="divider m-0"></div>
                  </div>
                ))}
              </DetailRecipeContainer>
              <DetailRecipeContainer className={"bg-teal-50"}>
                <h2 className="text-2xl font-vidaloka mb-4">Cooking Steps</h2>
                {recipe.instructions.map((instruction, index) => (
                  <div className="font-light text-lg" key={index}>
                    <p>Step {index + 1}</p>
                    <p>{instruction}</p>
                    <div className="divider m-0"></div>
                  </div>
                ))}
              </DetailRecipeContainer>
            </div>
            <DetailRecipeContainer
              className={"hidden lg:block sticky top-24 w-4/12 h-fit"}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="">
                  <img
                    src={`${profile}`}
                    alt="Food Image"
                    className="object-cover btn-circle w-24 h-24"
                  />
                </div>
                <div className="text-center">
                  <p className="font-vidaloka text-lg">
                    {user &&
                      getFullName(
                        user.user_metadata.firstname,
                        user.user_metadata.lastname
                      )}
                  </p>
                  <Link>@{user.user_metadata.username}</Link>
                </div>
              </div>
              <div className="flex flex-col w-full gap-3 mt-3 justify-center items-center">
                <div className="flex w-full gap-4">
                  <Link
                    className="btn btn-sm btn-primary flex-1"
                    to={`/${user.user_metadata.username}/recipes/${recipe.id}/update`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-secondary flex-1"
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
    </>
  );
}
