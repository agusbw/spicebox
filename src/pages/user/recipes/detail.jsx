import Container from "../../../components/layouts/Container";
import { useLoaderData, useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import DetailRecipeContainer from "../../../components/layouts/DetailRecipeContainer";
import thumbnail from "../../../assets/image-thumbnail.jpg";
import { RECIPE_IMAGE_URL } from "../../../constants";
import useRecipe from "../../../hooks/useRecipe";
import Swal from "sweetalert2";
import LineThroughText from "../../../components/LineThroughList";
import { getFullName } from "../../../utils/functions";
import CollapsibleList from "../../../components/CollapsibleList";
import ProfilePicture from "../../../components/ProfilePicture";
import { Helmet } from "react-helmet-async";

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
      {recipe === null ? (
        <Navigate to="/not-found" replace={true} state={{ notFound: true }} />
      ) : (
        <>
          <Helmet>
            <title>{recipe.title} | SpiceBox</title>
          </Helmet>
          <Container className="min-h-screen mx-auto">
            <div className="md:max-w-5xl mx-auto">
              <div className="lg:flex gap-4">
                <div className="flex flex-col gap-3 lg:w-8/12">
                  <div className="rounded-md shadow-md w-full bg-base-100 border">
                    <img
                      src={
                        recipe.image
                          ? `${RECIPE_IMAGE_URL}/${recipe.image}`
                          : thumbnail
                      }
                      alt="Food Image"
                      className="w-full h-56 object-cover rounded-md"
                    />
                  </div>
                  <DetailRecipeContainer>
                    <h1 className="text-4xl font-oswald font-bold text-secondary">
                      {recipe.title}
                    </h1>
                    <p className="text-lg mt-4 text-justify font-light">
                      {recipe.description
                        ? recipe.description
                        : "No description"}
                    </p>
                  </DetailRecipeContainer>
                  <DetailRecipeContainer>
                    <h2 className="text-3xl font-oswald text-secondary">
                      Recipe Details
                    </h2>
                    <div className="mt-3 flex-col flex">
                      <div className="flex flex-col gap-1 md:flex-row md:gap-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1">
                            <div className="w-6 h-6 hover:bg-secondary-focus transition-all duration-300 bg-primary-focus rounded-full text-center flex justify-center items-center text-white font-bold text-xl">
                              -
                            </div>
                            <p className="font-normal">
                              <span className="font-semibold">
                                Dish types:{" "}
                              </span>
                              {recipe.dish_types.length > 0 ? (
                                <span>
                                  {recipe.dish_types.map((dish, index) => (
                                    <span
                                      key={index}
                                      className="badge badge-accent me-1"
                                    >
                                      {dish}{" "}
                                    </span>
                                  ))}
                                </span>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-6 h-6 hover:bg-secondary-focus transition-all duration-300 bg-primary-focus rounded-full text-center flex justify-center items-center text-white font-bold text-xl">
                              -
                            </div>
                            <p className="font-normal">
                              <span className="font-semibold">
                                Serving time:{" "}
                              </span>
                              {recipe.serving_time
                                ? `${recipe.serving_time} minute(s)`
                                : ""}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-6 h-6 hover:bg-secondary-focus transition-all duration-300 bg-primary-focus rounded-full text-center flex justify-center items-center text-white font-bold text-xl">
                              -
                            </div>
                            <p className="font-normal">
                              <span className="font-semibold">Portion: </span>
                              {recipe.portion
                                ? `${recipe.portion} person(s)`
                                : ""}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-6 h-6 hover:bg-secondary-focus transition-all duration-300 bg-primary-focus rounded-full text-center flex justify-center items-center text-white font-bold text-xl">
                              -
                            </div>
                            <p className="font-normal">
                              <span className="font-semibold">
                                Difficulty:{" "}
                              </span>
                              {recipe.difficulty && (
                                <span className="badge badge-primary">
                                  {recipe.difficulty}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1">
                            <div className="w-6 h-6 hover:bg-secondary-focus transition-all duration-300 bg-primary-focus rounded-full text-center flex justify-center items-center text-white font-bold text-xl">
                              -
                            </div>
                            <p className="font-normal">
                              <span className="font-semibold"> Diets: </span>
                              {recipe.diets.length > 0
                                ? ` ${recipe.diets}`
                                : "none"}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-6 h-6 hover:bg-secondary-focus transition-all duration-300 bg-primary-focus rounded-full text-center flex justify-center items-center text-white font-bold text-xl">
                              -
                            </div>
                            <p className="font-normal">
                              <span className="font-semibold">
                                Visibility:{" "}
                              </span>
                              {recipe.is_public ? " Public" : " Private"}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-6 h-6 hover:bg-secondary-focus transition-all duration-300 bg-primary-focus rounded-full text-center flex justify-center items-center text-white font-bold text-xl">
                              -
                            </div>
                            <p className="font-normal">
                              <span className="font-semibold">Halal: </span>
                              {recipe.is_halal ? (
                                <span className="badge badge-success">
                                  Halal
                                </span>
                              ) : (
                                <span className="badge badge-warning">
                                  Non-Halal
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DetailRecipeContainer>
                  <DetailRecipeContainer className="lg:hidden">
                    <div className="flex flex-col justify-center items-center mb-4">
                      <div className="w-16 rounded-full">
                        <ProfilePicture />
                      </div>
                      <div className="text-center">
                        <p className="font-oswald text-lg">
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
                  </DetailRecipeContainer>
                  <div className="divider"></div>
                  <CollapsibleList variant="secondary" title="Ingredients">
                    {recipe &&
                      recipe?.ingredients.map((ingredient, index) => (
                        <li key={index} className="font-light text-lg">
                          <LineThroughText
                            variant="secondary"
                            text={ingredient}
                          />
                        </li>
                      ))}
                  </CollapsibleList>
                  <div className="divider"></div>
                  <CollapsibleList variant="primary" title="Cooking Steps">
                    {recipe?.instructions.map((instruction, index) => (
                      <li key={index} className="font-light text-lg">
                        <LineThroughText variant="primary" text={instruction} />
                      </li>
                    ))}
                  </CollapsibleList>
                </div>
                <DetailRecipeContainer
                  className={"hidden lg:block sticky top-24 w-4/12 h-fit"}
                >
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-16 h-16 rounded-full">
                      <ProfilePicture />
                    </div>
                    <div className="text-center">
                      <p className="font-oswald text-lg">
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
      )}
    </>
  );
}
