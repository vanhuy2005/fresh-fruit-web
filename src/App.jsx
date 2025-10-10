import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import Allproduct from './pages/Allproduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         <Route path="/products" element={<Allproduct />} />
         <Route path="/products/:category" element={<ProductCategory />} />
         <Route path="/products/:category/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App