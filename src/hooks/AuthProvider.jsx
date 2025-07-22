import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // pour bloquer pendant chargement

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/users/me", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setUser(null); // pas connecté
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
