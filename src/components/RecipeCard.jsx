import { Link } from "react-router-dom";
import { RECIPE_IMAGE_URL } from "../constants";
import thumbnail from "../assets/image-thumbnail.jpg";

export default function RecipeCard({ recipe, linkToDetail }) {
  return (
    <div className="bg-base-100 shadow-xl image-full rounded-xl relative">
      <div className="absolute z-10 rounded-se-xl p-2 right-0 top-0 bg-red-400/60 align-middle">
        <span className="text-2xl">{recipe.is_public ? "👥" : "🔒"}</span>
      </div>

      <img
        src={recipe.image ? `${RECIPE_IMAGE_URL}/${recipe.image}` : thumbnail}
        alt="Food"
        className="object-cover w-full rounded-t-xl h-60"
      />
      <div className="p-5 mb-10">
        <h2 className="card-title text-xl mb-1">{recipe.title}</h2>

        {recipe.description && (
          <p className="text-md mb-2 line-clamp-2">{recipe.description}</p>
        )}

        {recipe.dish_types && recipe.dish_types.length > 0 && (
          <p className="text-md">
            Types:{" "}
            {recipe.dish_types.map((dishType, index) => {
              return (
                <span
                  key={index}
                  className="badge badge-md badge-secondary me-1"
                >
                  {dishType}
                </span>
              );
            })}
          </p>
        )}

        {recipe.serving_time && (
          <p>Cooking time: {recipe.serving_time} Minutes</p>
        )}
      </div>
      <div className="flex justify-between items-center mt-5 absolute bottom-0 right-0 left-0 p-5">
        {recipe.is_halal ? (
          <span className="px-4 bg-success">Halal</span>
        ) : (
          <span className="px-4 bg-warning">Non-Halal</span>
        )}
        <Link className="btn btn-primary btn-sm" to={linkToDetail}>
          detail
        </Link>
      </div>
    </div>
  );
}
