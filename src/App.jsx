import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import Allproduct from './pages/Allproduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAdress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProdcut'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'

function App() {
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<><NavBar /><Home /></>} />
        <Route path="/about" element={<><NavBar /><About /></>} />
        <Route path="/products" element={<><NavBar /><Allproduct /></>} />
        <Route path="/products/:category" element={<><NavBar /><ProductCategory /></>} />
        <Route path="/products/:category/:id" element={<><NavBar /><ProductDetails /></>} />
        <Route path="/cart" element={<><NavBar /><Cart /></>} />
        <Route path="/add-address" element={<><NavBar /><AddAddress /></>} />
        <Route path="/my-orders" element={<><NavBar /><MyOrders /></>} />
        
        {/* Seller Routes */}
        <Route path="/seller" element={<SellerLogin />} />
        <Route path="/seller/*" element={<SellerLayout />}>
          <Route path="dashboard" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App