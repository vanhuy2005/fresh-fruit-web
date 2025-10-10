import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Use the env object for Vite variables and provide sensible defaults
  const currency = (import.meta.env && import.meta.env.VITE_CURRENCY) || '$';
  const locale = (import.meta.env && import.meta.env.VITE_LOCALE) || 'en-US';
  const currencyCode = (import.meta.env && import.meta.env.VITE_CURRENCY_CODE) || 'USD';

  // Helper to format numbers as currency using Intl.NumberFormat
  const formatCurrency = (value) => {
    if (value == null || value === '') return '';
    try {
      const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 });
      return formatter.format(Number(value));
    } catch (err) {
      // Fallback: prefix with currency symbol and raw number
      return `${currency}${value}`;
    }
  };
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    name: "hẹ hẹ hẹ", 
    email: "abc123@greencart.com",
    avatar: null
  }); //(true)
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState([1, 2, 3]); // Demo cart items
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    // dummyProducts is already an array — don't wrap it in another array
    setProducts(dummyProducts); // Fetch and set products
    // Debug: Log loaded product ids so we can verify the edited assets file is picked up
    try {
      if (typeof window !== 'undefined' && Array.isArray(dummyProducts)) {
        // show small summary to console (helps when HMR isn't picking up changes)
        // eslint-disable-next-line no-console
        console.log('AppContext: loaded products', dummyProducts.map((p) => ({ _id: p._id, name: p.name })));
      }
    } catch (e) {
      // ignore
    }
  }
  useEffect(() => {
    fetchProducts();  
  }, []);
  // Login function
  const login = (userData, userToken) => {
    if (userData && userToken) {
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('token', userToken);
    } else {
      // Demo login
      setUser({ 
        name: "hẹ hẹ hẹ", 
        email: "abc123@greencart.com",
        avatar: null
      });
    }
    setShowUserLogin(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
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
    loading,
    setLoading,
    token,
    setToken,
    login,
    logout,
    products,
  currency,
  locale,
  currencyCode,
  formatCurrency,
    cart: cartItems // Alias for compatibility
  };

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
};

export const useAppContext = () => {
  return useContext(AppContext);
};