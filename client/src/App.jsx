import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Allproduct from './pages/Allproduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Settings from './pages/Settings'
import Support from './pages/Support'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import SellerLogin from './pages/SellerLogin'
import SellerControl from './pages/SellerControl'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  const location = useLocation()
  const hideNavBarRoutes = ['/login', '/seller-login', '/seller', '/seller/products', '/seller/orders']
  const shouldHideNavBar = hideNavBarRoutes.some(route => location.pathname.startsWith(route))
  const shouldHideFooter = hideNavBarRoutes.some(route => location.pathname.startsWith(route))

  return (
    <div className="min-h-screen bg-gray-50">
      {!shouldHideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Allproduct />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller" element={<SellerControl />} />
        <Route path="/seller/products" element={<SellerControl />} />
        <Route path="/seller/orders" element={<SellerControl />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default App