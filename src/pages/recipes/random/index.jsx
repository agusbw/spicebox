import useFetch from "../../../hooks/useFetch";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalizeFristLetter } from "../../../utils/functions";
import {
  faTriangleExclamation,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { forwardRef } from "react";
import Container from "../../../components/layouts/Container";
import { MEAL_TYPES, DIETS, CUISINES } from "../../../constants";

const Select = forwardRef(function Select(
  { className, children, ...rest },
  ref
) {
  return (
    <select
      className={`${className} select bg-base-200 outline-none outline-offset-0 focus:outline-offset-0 hover:outline hover:outline-4 ease-in-out transition-all duration-100 hover:outline-red-200 hover:bg-white hover:border hover:border-gray-300 focus:border-red-300 focus:bg-white focus:outline-red-200 focus:outline-4 active:outline-0`}
      {...rest}
      ref={ref}
    >
      {children}
    </select>
  );
});

const Card = ({ recipe }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-md border">
      {recipe !== null ? (
        <>
          {recipe.image && (
            <figure>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover"
              />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title">{recipe.title && recipe.title}</h2>
            <p>
              Minute of Serving:{" "}
              <span className="badge badge-secondary">
                {recipe.readyInMinutes
                  ? `${recipe.readyInMinutes} Minutes`
                  : "N/A"}
              </span>
            </p>
            <div className="flex gap-1 flex-wrap">
              {recipe.diets &&
                recipe.diets.map((diet, index) => (
                  <span className="badge badge-warning" key={index}>
                    {diet}
                  </span>
                ))}
            </div>
            <div className="card-actions justify-end">
              <Link
                className="btn btn-primary btn-sm"
                to={`/recipes/random/${recipe.id}`}
              >
                Detail Recipe
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-xl text-center py-5 font-bold text-error">
            <FontAwesomeIcon icon={faTriangleExclamation} /> Recipe Not Found
          </p>
        </>
      )}
    </div>
  );
};

export default function RandomRecipe() {
  const { getRandomRecipe, isLoading } = useFetch();
  const [recipe, setRecipe] = useState();
  const mealRef = useRef();
  const dietRef = useRef();
  const cuisineRef = useRef();

  const handleClick = async () => {
    const meal = mealRef?.current?.value;

    const diet = dietRef?.current?.value;
    const cuisine = cuisineRef?.current?.value;
    const valuesToConcatenate = [meal, diet, cuisine].filter((value) => value);
    const tags = valuesToConcatenate.join(",");
    try {
      const recipe = await getRandomRecipe(encodeURIComponent(tags));
      recipe ? setRecipe(recipe) : setRecipe(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="flex flex-col justify-center items-center gap-2 mt-3">
        <h1 className="text-5xl font-bold text-center font-oswald text-primary">
          Get Random Recipe
        </h1>
        <p className="text-2xl font-semibold text-secondary text-center">
          Confused about what to cook today?
        </p>
        <p className="text-center">
          Get random recipe based on your meal type, diet and cuisine.
        </p>
        <div className="flex flex-wrap gap-3 mb-4 justify-center">
          <div>
            <label className="label text-base label-text font-semibold">
              <span className="label-text">Meal type</span>
            </label>
            <Select ref={mealRef}>
              <option value="">All</option>
              {MEAL_TYPES.map((meal, index) => (
                <option key={index} value={meal}>
                  {capitalizeFristLetter(meal)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="label text-base label-text font-semibold">
              <span className="label-text">Diet</span>
            </label>
            <Select ref={dietRef}>
              <option value="">All</option>
              {DIETS.map((diet, index) => (
                <option key={index} value={`${diet}`}>
                  {capitalizeFristLetter(diet)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="label text-base label-text font-semibold">
              <span className="label-text">Cuisine</span>
            </label>
            <Select ref={cuisineRef}>
              <option value="">All</option>
              {CUISINES.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {capitalizeFristLetter(cuisine)}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <button
          className="btn btn-secondary w-fit btn-circle px-4 mb-4"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Get Recipe
        </button>
        {isLoading && <Loading />}
        {recipe !== undefined && !isLoading ? <Card recipe={recipe} /> : null}
      </div>
    </Container>
  );
}
