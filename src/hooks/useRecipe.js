import supabase from "../supabase";
import { v4 as uuidv4 } from "uuid";

export default function useRecipe() {
  const getUserRecipes = async (user_id) => {
    try {
      const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPublicRecipes = async (user_id) => {
    try {
      const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user_id)
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRecipes = async () => {
    try {
      const { data } = await supabase.from("recipes").select("*");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const countUserRecipes = async (user_id) => {
    try {
      const { count, error } = await supabase

        .from("recipes")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user_id);

      if (error) throw error;

      return count;
    } catch (error) {
      console.log(error);
    }
  };

  const getPublicRecipes = async () => {
    try {
      const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRecipesByType = async (user_id, type) => {
    try {
      const typeArr = [type];
      const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user_id)
        .contains("dish_types", [typeArr]);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addUserRecipe = async (recipe) => {
    try {
      const { status } = await supabase.from("recipes").insert(recipe);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadRecipeImage = async (user_id, image) => {
    try {
      const { data } = await supabase.storage
        .from("recipes")
        .upload(`${user_id}/${uuidv4()}`, image);
      const imageUrl = data.path;
      return imageUrl;
    } catch (err) {
      console.log(err);
    }
  };

  const getRecipeImage = async (path) => {
    try {
      const { data } = await supabase.storage.from("recipes").list(path);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getRecipe = async (id) => {
    try {
      const { data } = await supabase.from("recipes").select("*").eq("id", id);
      return data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAndRecipe = async (id) => {
    try {
      let { data } = await supabase
        .from("recipes")
        .select(
          `
            *,
            profiles(
              *
            )
          `
        )
        .eq("id", id);
      return data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipeImage = async (path) => {
    try {
      const { status } = await supabase.storage.from("recipes").remove([path]);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecipe = async (id, recipe) => {
    try {
      const { status } = await supabase
        .from("recipes")
        .update(recipe)
        .eq("id", id);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async (id, path) => {
    try {
      const { error: error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", id);
      const { error: errorImage } = await supabase.storage
        .from("recipes")
        .remove([path]);
      return error || errorImage;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserRecipes,
    getAllRecipes,
    getPublicRecipes,
    addUserRecipe,
    uploadRecipeImage,
    getRecipeImage,
    getRecipe,
    getUserAndRecipe,
    deleteRecipe,
    getUserRecipesByType,
    deleteRecipeImage,
    updateRecipe,
    countUserRecipes,
    getUserPublicRecipes,
  };
}
