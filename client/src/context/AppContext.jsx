import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    name: "John Doe", 
    email: "john@greencart.com",
    avatar: null
  }); //(true)
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState([1, 2, 3]); // Demo cart items
  const [searchQuery, setSearchQuery] = useState('');

  // Login function
  const login = () => {
    setUser({ 
      name: "John Doe", 
      email: "john@greencart.com",
      avatar: null
    });
    setShowUserLogin(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  const value = { 
    navigate, 
    user, 
    setUser, 
    setIsSeller, 
    isSeller,
    showUserLogin,
    setShowUserLogin,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
    login,
    logout
  };

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
};

export const useAppContext = () => {
  return useContext(AppContext);
};