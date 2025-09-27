import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Auth functions
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    token,
    setToken,
    login,
    logout,
    navigate
  };

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
};

export const useAppContext = () => {
  return useContext(AppContext);
};