import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, dummyProducts } from '../assets/assets'
import toast from 'react-hot-toast'

const Bestseller = () => {
  const { cartItems, addToCart, removeFromCart, products, currency, navigate, formatPrice } = useAppContext()

  // Lấy top 5 sản phẩm bán chạy
  const bestsellerProducts = dummyProducts.slice(0, 5)

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
    <div className='py-12 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30'>
      {/* Section Header */}
      <div className='text-center mb-8'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight'>
          Our 
          <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'> Best Sellers</span>
        </h2>
        <p className='text-base md:text-lg text-gray-600 max-w-2xl mx-auto'>
          Top 5 products loved by thousands of customers
        </p>
      </div>

      {/* Products Grid - Single Row with 5 products */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bestsellerProducts.map((product, index) => {
            const itemCount = getCartItemCount(product._id)
            
            return (
              <div 
                key={product._id} 
                onClick={() => { navigate(`/product/${product._id}`); window.scrollTo(0, 0) }}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-green-100 hover:border-green-300 hover:-translate-y-1 cursor-pointer relative"
              >
                {/* Rank Badge */}
                <div className="absolute top-2 left-2 z-10 w-7 h-7 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <span className="text-white font-bold text-xs">#{index + 1}</span>
                </div>

                {/* Product Image */}
                <div className="relative overflow-hidden bg-white aspect-square">
                  <img 
                    src={product.image[0]} 
                    alt={product.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Bestseller Badge */}
                  <div className="absolute bottom-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                    🔥 Hot
                  </div>
                  {/* Discount Badge */}
                  {product.offerPrice < product.price && (
                    <div className="absolute bottom-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                      -{Math.round(((product.price - product.offerPrice) / product.price) * 100)}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <div className="mb-2">
                    <p className="text-green-600 text-[10px] font-semibold uppercase tracking-wide">{product.category}</p>
                    <h3 className="text-gray-800 font-semibold text-xs leading-tight line-clamp-2 group-hover:text-green-600 transition-colors mt-0.5">
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
                    <span className="text-gray-600 text-[10px] ml-0.5 font-medium">(4.0)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-sm font-bold text-green-600">
                      {formatPrice(product.offerPrice)} {currency}
                    </p>
                    {product.offerPrice < product.price && (
                      <span className="text-gray-400 text-[10px] line-through">
                        {formatPrice(product.price)} {currency}
                      </span>
                    )}
                  </div>

                  {/* Cart Controls */}
                  <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    {itemCount === 0 ? (
                      <button 
                        onClick={() => handleAddToCart(product._id)}
                        className="w-full flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1.5 rounded-md font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md text-[10px] border border-gray-200 hover:border-gray-300"
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
                        
                        <span className="flex-1 text-center font-semibold text-gray-800 text-[10px]">
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
    </div>
  )
}

export default Bestseller
