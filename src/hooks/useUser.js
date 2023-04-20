import supabase from "../supabase";

export default function useUser() {
  const updateUser = async (user_id, user) => {
    try {
      const { status } = await supabase
        .from("profiles")
        .update(user)
        .eq("id", user_id);

      return status;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (user_id) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user_id);

      return data;
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

  return { updateUser, getUser, getUsernames, validateUsername };
}
