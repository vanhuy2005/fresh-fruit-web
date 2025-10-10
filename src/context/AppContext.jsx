import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Use the env object for Vite variables and provide a sensible default
  const currency = (import.meta.env && import.meta.env.VITE_CURRENCY) || '$';
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    name: "hẹ hẹ hẹ", 
    email: "abc123@greencart.com",
    avatar: null
  }); //(true)
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState({}); // Changed to object: { productId: quantity }
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [products, setProducts] = useState([]);
  
  const fetchProducts = async () => {
    // dummyProducts is already an array — don't wrap it in another array
    setProducts(dummyProducts); // Fetch and set products
  }
  
  useEffect(() => {
    fetchProducts();  
  }, []);

  // Add to cart function
  const addToCart = (productId, quantity = 1) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[productId]) {
        newCart[productId] += quantity;
      } else {
        newCart[productId] = quantity;
      }
      return newCart;
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  // Get cart count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // Get cart total
  const getCartTotal = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (product) {
        total += product.offerPrice * cartItems[productId];
      }
    }
    return total;
  };

  // Clear cart
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
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartCount,
    getCartTotal,
    clearCart,
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
    cart: cartItems // Alias for compatibility
  };

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
};

export const useAppContext = () => {
  return useContext(AppContext);
};