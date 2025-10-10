import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, dummyProducts } from '../assets/assets'
import toast from 'react-hot-toast'

const Bestseller = () => {
  const { cartItems, addToCart, removeFromCart, products, currency } = useAppContext()

  // Lấy top 8 sản phẩm bán chạy (có thể dựa trên rating hoặc sales)
  const bestsellerProducts = dummyProducts.slice(0, 8)

  // Kiểm tra số lượng sản phẩm trong cart
  const getCartItemCount = (itemId) => {
    return cartItems[itemId] || 0
  }

  // Add product to cart
  const handleAddToCart = (productId) => {
    addToCart(productId)
    toast.success("Added to cart!", {
      duration: 2000,
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: '500'
      }
    })
  }

  // Remove product from cart
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId)
    toast.success("Removed from cart!", {
      duration: 2000,
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: '500'
      }
    })
  }

  return (
    <div className='py-12 px-6 md:px-16 lg:px-24 xl:px-32'>
      {/* Section Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight'>
          Our 
          <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'> Best Sellers</span>
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
          Discover the most popular products loved by our customers
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {bestsellerProducts.map((product) => {
          const itemCount = getCartItemCount(product._id)
          
          return (
            <div 
              key={product._id} 
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50 aspect-square">
                <img 
                  src={product.image[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Bestseller Badge */}
                <div className="absolute bottom-1.5 left-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold shadow-md">
                  Bestseller
                </div>
                {/* Discount Badge */}
                {product.offerPrice < product.price && (
                  <div className="absolute bottom-1.5 right-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold shadow-md">
                    -{Math.round(((product.price - product.offerPrice) / product.price) * 100)}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-medium">{product.category}</p>
                  <h3 className="text-gray-800 font-semibold text-sm leading-tight line-clamp-2 group-hover:text-green-700 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-2">
                  {Array(5).fill('').map((_, i) => (
                    <img 
                      key={i} 
                      src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                      alt="star" 
                      className="w-2.5 h-2.5"
                    />
                  ))}
                  <span className="text-gray-500 text-xs ml-1">(4.0)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <p className="text-base font-bold text-green-600">
                      {currency}{product.offerPrice}
                    </p>
                    {product.offerPrice < product.price && (
                      <span className="text-gray-400 text-xs line-through">
                        {currency}{product.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cart Controls */}
                <div className="flex items-center justify-center">
                  {itemCount === 0 ? (
                    <button 
                      onClick={() => handleAddToCart(product._id)}
                      className="w-full flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1.5 rounded-md font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md text-xs border border-gray-200 hover:border-gray-300"
                    >
                      <img src={assets.cart_icon} alt="cart" className="w-3 h-3" />
                      Add to Cart
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-between bg-gray-100 rounded-md p-0.5">
                      <button 
                        onClick={() => handleRemoveFromCart(product._id)}
                        className="flex items-center justify-center w-6 h-6 bg-white text-red-500 hover:bg-red-50 rounded shadow-sm transition-all duration-200 hover:scale-105"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="flex-1 text-center font-semibold text-gray-800 text-xs">
                        {itemCount}
                      </span>
                      
                      <button 
                        onClick={() => handleAddToCart(product._id)}
                        className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded shadow-sm transition-all duration-200 hover:scale-105"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Bestseller
