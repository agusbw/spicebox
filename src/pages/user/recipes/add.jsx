import { useForm } from "react-hook-form";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import InputErrorMessage from "../../../components/InputErrorMessage";
import useRecipe from "../../../hooks/useRecipe";
import { splitWordsToArray } from "../../../utils/functions";
import { useAuth } from "../../../contexts/Auth";
import { TextInput, Select } from "../../../components/FormComponents";
import Container from "../../../components/layouts/Container";
import React from "react";
import { Helmet } from "react-helmet";

export default function AddUserRecipe() {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { username } = useParams();
  const [ingredientsCount, setIngredientsCount] = useState(1);
  const { user } = useAuth();
  const [stepsCount, setStepsCount] = useState(1);
  const { addUserRecipe, uploadRecipeImage } = useRecipe();

  React.useEffect(() => {
    if (user && user.user_metadata.username !== username) {
      navigate("/", {
        replace: true,
      });
    }
  }, [user, username, navigate]);

  const onSubmit = async (data) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonText: "Yes, add it!",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
    });

    if (!isConfirmed) return;
    const recipeImage = data.image[0];
    const image = await uploadRecipeImage(user.id, recipeImage);
    const diets = splitWordsToArray(data.diets);
    const recipe = {
      ...data,
      image,
      diets,
      user_id: user.id,
    };

    const status = await addUserRecipe(recipe);
    if (status === 201) {
      Swal.fire({
        title: "Success!",
        text: "Your recipe has been added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setIngredientsCount(1);
      setStepsCount(1);
      reset();
      return;
    }
    Swal.fire({
      title: "Error!",
      text: "Something went wrong, please try again",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  return (
    <>
      {" "}
      {username !== user.user_metadata.username && (
        <Navigate to={`/${user.user_metadata.usernamee}/recipes`} replace />
      )}
      <Helmet>
        <title>Add Recipe | SpiceBox</title>
      </Helmet>
      <Container>
        <h1 className="text-4xl font-bold mb-3">Add Recipe📖</h1>
        <p className="text-2xl">Add your own recipe here ❤ !</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 border border-gray-200 shadow-md p-5 w-full rounded-md"
        >
          <div className="flex flex-col md:flex-row lg:flex-row w-full gap-5 mb-3 md:gap-10">
            <div className="md:max-h-96 md:overflow-auto md:pe-5 md:px-1 md:w-1/3">
              <h2 className="text-2xl font-bold">Recipe Details</h2>
              <div className="form-control w-full">
                <TextInput
                  label="Recipe Title*"
                  placeholder="Hawaiian Pizza"
                  name="title"
                  type="text"
                  className="input-sm"
                  register={register("title", {
                    required: {
                      value: true,
                      message: "Please enter a title for your recipe",
                    },
                  })}
                />
                {errors.title && (
                  <InputErrorMessage message={errors.title.message} />
                )}
              </div>
              <div className="form-control w-full">
                <label className="label text-base label-text font-semibold">
                  <span className="label-text">Description*</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Max 200 characters"
                  className="input w-full text-sm p-2 bg-base-200 outline-none outline-offset-0 focus:outline-offset-0 hover:outline hover:outline-4 ease-in-out transition-all duration-100 hover:outline-red-200 hover:bg-white hover:border hover:border-gray-300 focus:border-red-300 focus:bg-white focus:outline-red-200 focus:outline-4 active:outline-0"
                  rows={4}
                  name="description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Please enter a description for your recipe",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description should be less than 200 characters",
                    },
                  })}
                />
              </div>
              {errors.description && (
                <InputErrorMessage message={errors.description.message} />
              )}
              <div className="form-control w-full max-w-xs">
                <label className="label text-base label-text font-semibold">
                  <span className="label-text">Choose food image*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Please upload an image for your recipe",
                    },
                    validate: {
                      lessThan10MB: (fileList) => {
                        const file = fileList[0];
                        if (file.size > 3000000) {
                          return "Image size should be less than 3MB";
                        }
                        return true;
                      },
                      acceptedFormats: (fileList) => {
                        const file = fileList[0];
                        const acceptedFormats = [
                          "image/jpeg",
                          "image/png",
                          "image/jpg",
                          "image/webp",
                        ];
                        if (!acceptedFormats.includes(file.type)) {
                          return "Image format not supported";
                        }
                        return true;
                      },
                    },
                  })}
                  className="file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs bg-base-200 outline-none outline-offset-0 focus:outline-offset-0 hover:outline hover:outline-4 ease-in-out transition-all duration-100 hover:outline-red-200 hover:bg-white hover:border hover:border-gray-300 focus:border-red-300 focus:bg-white focus:outline-red-200 focus:outline-4 active:outline-0"
                />
                {errors.image && (
                  <InputErrorMessage message={errors.image.message} />
                )}
              </div>

              <div className="form-control w-fit">
                <TextInput
                  label="Portion*"
                  name="portion"
                  type="number"
                  placeholder="1"
                  className="input-sm w-1/2 p-0 ps-3"
                  register={register("portion", {
                    required: {
                      value: true,
                      message: "Please enter the portion",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {
                  // If there is an error, show the error message
                  errors.portion && (
                    <InputErrorMessage message={errors.portion.message} />
                  )
                }
              </div>

              <div className="form-control w-fit">
                <TextInput
                  label="Serving time (minutes)*"
                  name="serving_time"
                  type="number"
                  placeholder="30"
                  className="input-sm w-1/2 p-0 ps-3"
                  register={register("serving_time", {
                    required: {
                      value: true,
                      message: "Please enter the serving time",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {
                  // If there is an error, show the error message
                  errors.serving_time && (
                    <InputErrorMessage message={errors.serving_time.message} />
                  )
                }
              </div>

              <div className="form-control w-1/2 my-2">
                <label className="label text-base label-text font-semibold pb-0">
                  <span className="label-text">Recipe difficulty*</span>
                </label>
                <Select
                  className={`font-normal select-sm`}
                  register={register("difficulty", {
                    required: {
                      value: true,
                      message: "Please select a difficulty",
                    },
                  })}
                >
                  <option value="">Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medioum">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
                {
                  // If there is an error, show the error message
                  errors.difficulty && (
                    <InputErrorMessage message={errors.difficulty.message} />
                  )
                }
              </div>

              <div className="w-fit">
                <label className="label text-base label-text font-semibold pb-0">
                  <span className="label-text">Dish types*</span>
                </label>
                <div className="flex gap-2">
                  <div>
                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <span className="label-text mr-2">Breakfast</span>
                        <input
                          type="checkbox"
                          defaultValue="Breakfast"
                          className="checkbox checkbox-secondary"
                          {...register("dish_types", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <span className="label-text mr-2">Lunch</span>
                        <input
                          type="checkbox"
                          defaultValue="Lunch"
                          className="checkbox checkbox-secondary"
                          {...register("dish_types", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <span className="label-text mr-2">Dinner</span>
                        <input
                          type="checkbox"
                          defaultValue="Dinner"
                          className="checkbox checkbox-secondary"
                          {...register("dish_types", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <span className="label-text mr-2">Snack</span>
                        <input
                          type="checkbox"
                          defaultValue="Snack"
                          className="checkbox checkbox-secondary"
                          {...register("dish_types", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errors.dish_types && (
                  <InputErrorMessage message={"Please select a dish type"} />
                )}
              </div>

              <div>
                <label className="label text-base label-text font-semibold">
                  <span className="label-text">Is the recipe halal?*</span>
                </label>
                <div className="flex gap-2 mb-1 items-center">
                  <input
                    type="radio"
                    id="radio1"
                    name="is_halal"
                    className="radio radio-primary h-5 w-5"
                    defaultValue={true}
                    {...register("is_halal", {
                      required: {
                        value: true,
                        message: "Please select if your recipe is halal",
                      },
                    })}
                  />
                  <label htmlFor="radio1">
                    <span className="label-text">Halal</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="radio2"
                    name="is_halal"
                    className="radio radio-primary h-5 w-5"
                    defaultValue={false}
                    {...register("is_halal", {
                      required: {
                        value: true,
                        message: "Please select if your recipe is halal",
                      },
                    })}
                  />
                  <label htmlFor="radio3">
                    <span className="label-text">Non-Halal</span>
                  </label>
                </div>
                {
                  // If there is an error, show the error message
                  errors.is_halal && (
                    <InputErrorMessage message={errors.is_halal.message} />
                  )
                }
              </div>
              <div className="form-control w-full">
                <TextInput
                  label="Diet types"
                  placeholder="Vegan, Vegetarian, Pescatarian"
                  type="text"
                  name="diets"
                  className="input-sm"
                  register={register("diets")}
                />
              </div>
            </div>

            <div className="md:max-h-96 md:overflow-auto md:pe-5 md:px-1 md:w-1/3">
              <h2 className="text-2xl font-bold">Ingredients</h2>
              {[...Array(ingredientsCount)].map((_, index) => {
                return (
                  <div className="form-control w-full max-w-x" key={index}>
                    <TextInput
                      label={`Ingredient ${index + 1}*`}
                      placeholder="1 cup of flour"
                      name={`ingredients[${index}]`}
                      register={register(`ingredients[${index}]`, {
                        required: true,
                      })}
                      className="input-sm"
                    />
                    {errors.ingredients && (
                      <InputErrorMessage
                        message={"Please enter an ingredient"}
                      />
                    )}
                    <div className="flex gap-1">
                      {index === ingredientsCount - 1 && (
                        <button
                          type="button"
                          className="btn btn-success btn-xs mt-2"
                          onClick={() =>
                            setIngredientsCount((prev) => prev + 1)
                          }
                        >
                          Add
                        </button>
                      )}
                      {
                        // Only show the remove button if there is more than 1 ingredient
                        ingredientsCount > 1 &&
                          index === ingredientsCount - 1 && (
                            <button
                              type="button"
                              className="btn btn-error btn-xs mt-2"
                              onClick={() => {
                                unregister(`ingredients[${index}]`);
                                setIngredientsCount((prev) => prev - 1);
                              }}
                            >
                              Remove
                            </button>
                          )
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="md:max-h-96 md:overflow-auto md:pe-5 md:px-1 md:w-1/3">
              <h2 className="text-2xl font-bold">Cooking Steps</h2>
              {
                // Create a list of ingredients
                [...Array(stepsCount)].map((_, index) => {
                  return (
                    <div className="form-control w-full max-w-x" key={index}>
                      <label className="label text-base font-semibold">
                        <span className="label-text">Step {index + 1}*</span>
                      </label>
                      <textarea
                        type="text"
                        placeholder="Mix the flour and water"
                        className="input w-full text-sm p-2 bg-base-200 outline-none outline-offset-0 focus:outline-offset-0 hover:outline hover:outline-4 ease-in-out transition-all duration-100 hover:outline-red-200 hover:bg-white hover:border hover:border-gray-300 focus:border-red-300 focus:bg-white focus:outline-red-200 focus:outline-4 active:outline-0"
                        rows={4}
                        name={`instructions[${index}]`}
                        {...register(`instructions[${index}]`, {
                          required: true,
                        })}
                      />
                      {errors.instructions && (
                        <InputErrorMessage
                          message={"Please enter the instruction"}
                        />
                      )}
                      <div className="flex gap-1">
                        {index === stepsCount - 1 && (
                          <button
                            type="button"
                            className="btn btn-success btn-xs mt-2"
                            onClick={() => {
                              setStepsCount((prev) => prev + 1);
                            }}
                          >
                            Add
                          </button>
                        )}
                        {
                          // Only show the remove button if there is more than 1 ingredient
                          stepsCount > 1 && index === stepsCount - 1 && (
                            <button
                              type="button"
                              className="btn btn-error btn-xs mt-2"
                              onClick={() => {
                                unregister(`instructions[${index}]`);
                                setStepsCount((prev) => prev - 1);
                              }}
                            >
                              Remove
                            </button>
                          )
                        }
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="card-actions justify-end mt-3 items-center">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text me-2 text-error font-semibold">
                  Do you want this recipe accesible for public?
                </span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  {...register("is_public")}
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-32 btn-sm"
              disabled={isSubmitting}
            >
              Add Recipe
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
