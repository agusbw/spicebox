import { Link, useLoaderData } from "react-router-dom";
import { RECIPE_IMAGE_URL } from "../../constants";
import Container from "../../components/layouts/Container";
import { getInitials, joinWords, getFullName } from "../../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function PublicDetailRecipe() {
  const recipe = useLoaderData();
  const [showIngredients, setShowIngredients] = React.useState(true);
  const [showInstructions, setShowInstructions] = React.useState(true);

  const handleDisplayInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const handleDisplayIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <Container className="min-h-screen mx-auto">
      <div className="md:max-w-5xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl lg:text-5xl font-vidaloka mb-2 ">
            {recipe.title}{" "}
            {recipe.is_halal ? (
              <span className="text-sm lg:text-lg align-middle bg-green-400 px-3 py-2 rounded-full font-semibold font-sans">
                Halal
              </span>
            ) : (
              <span className="text-sm lg:text-lg align-middle bg-red-400 px-3 py-2 rounded-full font-semibold font-sans">
                Non-Halal
              </span>
            )}
          </h1>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span>
                  {getInitials(
                    recipe.profiles.firstname,
                    recipe.profiles.lastname
                  )}
                </span>
              </div>
            </div>
            <p className="ml-2">
              By{" "}
              {getFullName(recipe.profiles.firstname, recipe.profiles.lastname)}
              /
              <Link
                className="link link-primary
            "
                to={`/recipes/users/${recipe.profiles.username}`}
              >
                @{recipe.profiles.username}
              </Link>
            </p>
          </div>
          <div className="divider"></div>
          <p>{recipe.description ? recipe.description : "No description"}</p>
          <p>
            Diets:{" "}
            {recipe.diets.length <= 0 ? (
              <span className="badge badge-warning">No diets</span>
            ) : (
              recipe.diets.map((diet, index) => (
                <span key={index} className="badge badge-primary mr-1">
                  {diet}
                </span>
              ))
            )}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <img
            src={`${RECIPE_IMAGE_URL}/${recipe.image}`}
            alt="Food Image"
            className="lg:w-1/2 w-full object-cover mx-auto"
          />

          <div className="md:stats shadow w-fit mx-auto">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Cooking Time</div>
              <div className="stat-value">{recipe.serving_time}</div>
              <div className="stat-desc">Minutes</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Difficulty</div>
              <div className="stat-value">{recipe.difficulty}</div>
              <div className="stat-desc"></div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Portion</div>
              <div className="stat-value">{recipe.portion}</div>
              <div className="stat-desc">Person(s)</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Dish types</div>
              <div className="stat-value text-xl">
                {joinWords(recipe.dish_types)}
              </div>
              <div className="stat-desc"></div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDisplayIngredients}
              className="bg-primary hover:bg-primary-focus text-white font-bold text-2xl w-8 h-8 btn-circle rounded-full"
            >
              {showIngredients ? "-" : "+"}
            </button>
            <h2 className="text-2xl font-vidaloka">Ingredients</h2>
          </div>
          <div className="overflow-hidden">
            <ul
              className={`transition-all duration-300 ease-in-out ml-3 ${
                showIngredients ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="font-light text-lg">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="me-2 text-sm text-accent"
                  />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDisplayInstructions}
              className="bg-secondary text-white hover:bg-secondary-focus font-bold text-2xl w-8 h-8 btn-circle rounded-full"
            >
              {showInstructions ? "-" : "+"}
            </button>
            <h2 className="text-2xl font-vidaloka">Cooking Steps</h2>
          </div>
          <div className="overflow-hidden">
            <ol
              className={`list-decimal transition-all duration-300 ease-in-out ml-8 ${
                showInstructions ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="font-light text-lg">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Container>
  );
}
