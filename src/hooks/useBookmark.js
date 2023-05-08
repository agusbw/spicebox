import supabase from "../supabase";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function useBookmark() {
  const [isLoading, setIsLoading] = React.useState(false);

  const getUserBookmarks = async (user_id) => {
    try {
      const { data } = await supabase
        .from("bookmarks")
        .select(
          `
          *,
          profile: user_id (
           *
          )
          ,
          recipe: recipe_id (
          *
        )
        `
        )
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addBookmark = async (recipe_id, user_id) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("bookmarks")
        .insert([
          {
            id: uuidv4(),
            recipe_id: recipe_id,
            user_id: user_id,
          },
        ])
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeBookmark = async (recipe_id, user_id) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase

        .from("bookmarks")
        .delete()
        .match({ recipe_id: recipe_id, user_id: user_id })
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkBookmark = async (recipe_id, user_id) => {
    try {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("recipe_id", recipe_id)
        .eq("user_id", user_id);

      return data[0];
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserBookmarks,
    addBookmark,
    removeBookmark,
    isLoading,
    checkBookmark,
  };
}
