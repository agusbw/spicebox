import React, { useContext, useState, useEffect } from "react";
import supabase from "../supabase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserSession() {
      const session = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    }

    getUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    signUp: async (data) => await supabase.auth.signUp(data),
    signIn: async (data) => await supabase.auth.signInWithPassword(data),
    signOut: async () => await supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
