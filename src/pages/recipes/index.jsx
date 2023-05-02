import { useLoaderData, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TextInput, Select } from "../../components/FormComponents";
import PublicRecipeCard from "../../components/PublicRecipeCard";
import PaginationButton from "../../components/PaginationButton";
import Breadcrumbs from "../../components/Breadcrumbs";

const RECIPE_PER_PAGE = 8;

export default function PublicRecipes() {
  const recipes = useLoaderData();
  const [filterState, setFilterState] = React.useState({
    search: "",
    difficulty: "all",
    currentPage: 1,
    dishType: "all",
    is_halal: false,
  });

  const { search, difficulty, currentPage, dishType, is_halal } = filterState;

  const handleSearchChange = (e) => {
    setFilterState({
      ...filterState,
      search: e.target.value,
      currentPage: 1,
    });
  };

  const handleHalalChange = (e) => {
    setFilterState({
      ...filterState,
      is_halal: e.target.checked,
      currentPage: 1,
    });
  };

  const handleDifficultyChange = (e) => {
    setFilterState({
      ...filterState,
      difficulty: e.target.value,
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
    if (difficulty === "all") return true;
    return recipe.difficulty === difficulty;
  });

  filteredRecipes = filteredRecipes.filter((recipe) => {
    if (dishType === "all") return true;
    return recipe.dish_types.includes(dishType);
  });

  filteredRecipes = filteredRecipes.filter((recipe) => {
    if (!is_halal) return true;
    return recipe.is_halal;
  });

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
    <div className="">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col pt-20 px-4 ">
          <div className="lg:w-1/2">
            <Breadcrumbs />
            <h1 className="font-bold text-3xl lg:text-4xl">
              Save Your Favorite Recipes with Ease -{" "}
              <span className="text-secondary">
                Discover Our Recipes Collection!
              </span>
            </h1>
            <div className="flex mt-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button w-fit lg:hidden"
              >
                Filters
              </label>
              <TextInput
                className={"max-w-xs"}
                placeholder="Search recipe by title!"
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center mt-4 gap-4">
              <div className="collapse border border-base-300 bg-base-100 rounded-box collapse-arrow w-fit">
                <input type="checkbox" />
                <div className="collapse-title text-md font-medium">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="text-secondary-focus"
                  />{" "}
                  Informations
                </div>
                <div className="collapse-content">
                  <p>
                    <span className="badge badge-secondary">badge</span> show
                    recipe&apos;s dish type
                  </p>
                  <p>
                    <span className="badge badge-warning">badge</span> show
                    recipe&apos;s diets type
                  </p>
                </div>
              </div>
              <Link
                to="/recipes/random"
                className="btn rounded-md btn-secondary"
              >
                Search random recipe
              </Link>
            </div>
          </div>
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
        </div>
        <div className="drawer-side bg-base-200 shadow-md pt-16">
          <label htmlFor="my-drawer-2" className="drawer-overlay" />
          <ul className="p-4 w-80 bg-base-200 text-base-content flex flex-col">
            <li className="">
              <h3 className="text-2xl">Filters</h3>
              <div className="divider"></div>
            </li>
            <li className="mb-4">
              <label htmlFor="">
                <p>Dish types</p>
              </label>
              <Select variant="secondary" onChange={handleDishTypeChange}>
                <option value="all">All types</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </Select>
            </li>
            <li className="mb-4">
              <label>
                <p>Recipe difficulty</p>
              </label>
              <Select
                variant="secondary"
                className="w-1/2"
                onChange={handleDifficultyChange}
              >
                <option value="all">Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Select>
            </li>
            <li className="mb-4">
              <div className="form-control w-fit">
                <label className="cursor-pointer label">
                  <span className="mr-2">Halal only</span>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    className="checkbox checkbox-secondary"
                    onChange={handleHalalChange}
                  />
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
