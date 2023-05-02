import axios from "axios";
import { useState } from "react";
import { SPOONACULAR_BASE_URL } from "../constants";

const RANDOM_RECIPE_COUNT = 1;

const headers = {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_SPOONACULAR_API_KEY,
};

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getRandomRecipe = async (tag = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${SPOONACULAR_BASE_URL}/random?number=${RANDOM_RECIPE_COUNT}&tags=${tag}`,
        {
          headers: headers,
        }
      );
      return response.data.recipes[0];
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDetailRecipe = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${SPOONACULAR_BASE_URL}/${id}/information?includeNutrition-false`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getRandomRecipe, isLoading, getDetailRecipe };
};

export default useFetch;
