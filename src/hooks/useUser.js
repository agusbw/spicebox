import supabase from "../supabase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function useUser() {
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async (user_id, user) => {
    setIsLoading(true);
    try {
      const { statusText } = await supabase
        .from("profiles")
        .update(user)
        .eq("id", user_id);

      return statusText;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (username) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username);
      return data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getUsernames = async () => {
    try {
      let { data } = await supabase.from("profiles").select("username");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const validateUsername = async (username) => {
    try {
      let { data } = await supabase

        .from("profiles")
        .select("username")
        .eq("username", username);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAvatar = async (path) => {
    setIsLoading(true);
    try {
      const { data } = await supabase.storage.from("avatars").remove([path]);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (user_id, image) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${user_id}/${uuidv4()}`, image);
      if (error) {
        throw error;
      }
      return data.path;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUser,
    getUser,
    getUsernames,
    validateUsername,
    uploadAvatar,
    deleteAvatar,
    isLoading,
  };
}
