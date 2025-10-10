import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || '₫';
  
  const [user, setUser] = useState({ 
    name: "hẹ hẹ hẹ", 
    email: "abc123@greencart.com",
    avatar: null
  });
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({}); // Changed to object for better cart management
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add Product to Cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    
    setCartItems(cartData);
  };

  // Remove Product from Cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }
    
    setCartItems(cartData);
  };

  // Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Get Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const product = products.find(product => product._id === item);
      if (product) {
        totalAmount += (product.offerPrice || product.price) * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems({});
  };

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
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    clearCart();
  };

  const value = { 
    navigate, 
    user, 
    setUser, 
    setIsSeller, 
    isSeller,
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
    setProducts,
    currency,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartAmount,
    clearCart,
    cart: cartItems // Alias for compatibility
  };

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
};

export const useAppContext = () => {
  return useContext(AppContext);
};