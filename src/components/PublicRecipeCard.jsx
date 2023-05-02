import { Link } from "react-router-dom";
import { RECIPE_IMAGE_URL } from "../constants";
import thumbnail from "../assets/image-thumbnail.jpg";

export default function PublicRecipeCard({ recipe }) {
  return (
    <div className="card bg-base-100 shadow-xl image-full">
      <figure>
        <img
          src={recipe.image ? `${RECIPE_IMAGE_URL}/${recipe.image}` : thumbnail}
        />
      </figure>
      <div className="card-body pt-10 relative">
        {recipe.is_halal && (
          <div className="badge badge-success absolute top-0 right-0 font-semibold m-3">
            Halal
          </div>
        )}
        <h2 className="card-title">{recipe.title}</h2>
        <p className="line-clamp-2">{recipe.description}</p>
        <div className="flex gap-1 flex-wrap">
          {recipe.dish_types.map((dish_type, index) => (
            <span key={index} className="badge badge-secondary">
              {dish_type}
            </span>
          ))}
          {recipe.diets.map((diet, index) => (
            <span key={index} className="badge badge-warning">
              {diet}
            </span>
          ))}
        </div>
        <div className="card-actions justify-end">
          <Link
            className="btn btn-primary rounded-full btn-sm"
            to={`/recipes/${recipe.id}`}
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
