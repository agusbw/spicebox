import { Link, useLocation } from "react-router-dom";
import thumbnail from "../../../assets/image-thumbnail.jpg";
import Container from "../../../components/layouts/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CollapsibleList from "../../../components/CollapsibleList";
import LineThroughText from "../../../components/LineThroughList";
import { Helmet } from "react-helmet";

export default function PublicDetailRecipe() {
  const location = useLocation();
  const recipe = location.state;
  return (
    <>
      {!recipe ? (
        <Link to="/not-found" />
      ) : (
        <>
          <Helmet>
            <title>{recipe.title} | SpiceBox</title>
          </Helmet>
          <Container className="min-h-screen mx-auto">
            <div className="md:max-w-5xl mx-auto">
              <div className="mb-4">
                <h1 className="text-4xl lg:text-5xl font-oswald font-bold text-secondary mb-4 mt-1">
                  {recipe && recipe.title}
                </h1>

                <div className="divider"></div>
                <div
                  className="content mb-3 text-justify"
                  dangerouslySetInnerHTML={{ __html: recipe?.summary }}
                ></div>
                <p className="text-primary font-bold font-oswald text-2xl">
                  Diets:{" "}
                  {recipe?.diets?.length <= 0 ? (
                    <span className="badge badge-warning font-sans font-normal">
                      No diets
                    </span>
                  ) : (
                    recipe?.diets?.map((diet, index) => (
                      <span
                        key={index}
                        className="badge badge-primary font-sans mr-1 font-normal"
                      >
                        {diet}
                      </span>
                    ))
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <img
                  src={recipe ? recipe.image : thumbnail}
                  alt={recipe ? recipe.title : "Thumbnail"}
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
                    <div className="stat-value">
                      {recipe && recipe.readyInMinutes}
                    </div>
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
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Portion</div>
                    <div className="stat-value">
                      {recipe && recipe.servings}
                    </div>
                    <div className="stat-desc">serve(s)</div>
                  </div>
                </div>
                <div className="divider"></div>
                <CollapsibleList variant="secondary" title="Ingredients">
                  {recipe &&
                    recipe?.extendedIngredients.map((ingredient, index) => (
                      <li key={index} className="font-light text-lg">
                        <LineThroughText
                          variant="secondary"
                          text={ingredient.original}
                        />
                      </li>
                    ))}
                </CollapsibleList>
                <div className="divider"></div>
                <CollapsibleList title="Cooking Steps" variant="primary">
                  {recipe &&
                    recipe?.analyzedInstructions?.map((instruction) => {
                      return instruction?.steps.map((step, index) => {
                        return (
                          <li key={index} className="font-light text-lg">
                            <LineThroughText
                              variant="primary"
                              text={step.step}
                            />
                          </li>
                        );
                      });
                    })}
                </CollapsibleList>
              </div>
              <div className="flex mt-5">
                <Link to="/recipes/random" className="btn btn-primary">
                  <FontAwesomeIcon icon={faArrowLeft} /> Other Recipes
                </Link>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
