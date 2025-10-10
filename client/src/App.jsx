import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Allproduct from './pages/Allproduct'
import ProductCategory from './pages/ProductCategory'
import TestCategoryFilter from './pages/TestCategoryFilter'
import ProductDetails from './pages/ProductDetails'
import Settings from './pages/Settings'
import Support from './pages/Support'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  const location = useLocation()
  const hideNavBarRoutes = ['/login']
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname)
  const shouldHideFooter = hideNavBarRoutes.includes(location.pathname)

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
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestCategoryFilter />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default App