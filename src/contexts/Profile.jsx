import React from "react";
import useUser from "../hooks/useUser";
import { useAuth } from "./Auth";

export const ProfileContext = React.createContext();

export function useProfile() {
  return React.useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = React.useState();
  const { user } = useAuth();
  const { getUser } = useUser();

  const getUserProfile = async (username) => {
    const data = await getUser(username);
    setProfile(data);
  };

  React.useEffect(() => {
    if (user) {
      getUserProfile(user.user_metadata.username);
    }
  }, [user]);

  return (
    <ProfileContext.Provider value={[profile, setProfile]}>
      {children}
    </ProfileContext.Provider>
  );
}
