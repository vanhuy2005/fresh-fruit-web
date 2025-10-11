import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Cart = () => {
    const navigate = useNavigate()
    const { 
        cartItems, 
        products, 
        currency, 
        updateCartQuantity, 
        removeFromCart, 
        getCartTotal, 
        formatPrice,
        placeOrder,
        getDefaultAddress,
        user
    } = useAppContext()

    // Get default address from settings
    const defaultAddress = getDefaultAddress()
    const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery')
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    // Check if user is logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Vui lòng đăng nhập</h2>
                    <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem giỏ hàng và đặt hàng</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Đăng nhập ngay
                    </button>
                </div>
            </div>
        )
    }

    // Get cart products with full details
    const getCartProducts = () => {
        const cartProducts = []
        for (const productId in cartItems) {
            const product = products.find(p => p._id === productId)
            if (product) {
                cartProducts.push({
                    ...product,
                    quantity: cartItems[productId]
                })
            }
        }
        return cartProducts
    }

    const cartProducts = getCartProducts()
    
    // Calculate totals
    const subtotal = getCartTotal()
    const shippingFee = 0 // Free shipping
    const taxRate = 0.02 // 2%
    const tax = Math.floor(subtotal * taxRate)
    const totalAmount = subtotal + shippingFee + tax

    // Handle quantity change - giảm từng sản phẩm một
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            // Không cho phép giảm xuống dưới 1
            toast.error('Số lượng tối thiểu là 1. Dùng nút xóa để xóa sản phẩm.')
            return
        }
        updateCartQuantity(productId, newQuantity)
    }

    // Handle remove item - chỉ xóa toàn bộ sản phẩm
    const handleRemoveItem = (productId) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            removeFromCart(productId)
            toast.success('Đã xóa sản phẩm khỏi giỏ hàng')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Shopping Cart
                        {cartProducts.length > 0 && (
                            <span className="text-lg text-gray-500 font-normal ml-3">
                                {cartProducts.length} Items
                            </span>
                        )}
                    </h1>
                </div>

                {cartProducts.length === 0 ? (
                    /* Empty Cart State */
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <div className="text-7xl mb-6">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Add some fresh fruits & vegetables to get started!</p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            <span>←</span> Continue Shopping
                        </button>
                    </div>
                ) : (
                    /* Cart with Items */
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Product List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                {/* Table Header - Desktop Only */}
                                <div className="hidden md:grid grid-cols-12 gap-6 px-8 py-5 bg-gray-50 border-b border-gray-200">
                                    <div className="col-span-5 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                        Product Details
                                    </div>
                                    <div className="col-span-3 text-center text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                        Subtotal
                                    </div>
                                    <div className="col-span-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                        Action
                                    </div>
                                </div>

                                {/* Product Rows */}
                                <div className="divide-y divide-gray-100">
                                    {cartProducts.map((product) => (
                                        <div key={product._id} className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
                                            <div className="grid md:grid-cols-12 gap-6 items-center">
                                                {/* Product Info - 5 columns */}
                                                <div className="col-span-12 md:col-span-5">
                                                    <div className="flex gap-5">
                                                        {/* Product Image */}
                                                        <div 
                                                            className="w-28 h-28 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
                                                            onClick={() => navigate(`/product/${product._id}`)}
                                                        >
                                                            <img 
                                                                src={product.image[0]} 
                                                                alt={product.name}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        
                                                        {/* Product Details */}
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-gray-800 text-lg mb-2">
                                                                {product.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 mb-3">
                                                                Weight: N/A
                                                            </p>
                                                            
                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-sm text-gray-600">Qty:</span>
                                                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                                    <button 
                                                                        onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                                                                        className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                                                    >
                                                                        <span className="text-gray-600">-</span>
                                                                    </button>
                                                                    <span className="px-4 py-1.5 bg-white font-medium text-gray-800 min-w-[40px] text-center">
                                                                        {product.quantity}
                                                                    </span>
                                                                    <button 
                                                                        onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                                                                        className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                                                    >
                                                                        <span className="text-gray-600">+</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Subtotal - 3 columns */}
                                                <div className="col-span-6 md:col-span-3 text-left md:text-center">
                                                    <span className="text-xl font-bold text-gray-800">
                                                        {formatPrice(product.offerPrice * product.quantity)}
                                                    </span>
                                                </div>

                                                {/* Action Button - 4 columns */}
                                                <div className="col-span-6 md:col-span-4 text-left md:text-center">
                                                    <button 
                                                        onClick={() => handleRemoveItem(product._id)}
                                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                                                        title="Xóa toàn bộ sản phẩm này"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span className="hidden md:inline text-sm font-medium">Xóa</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Continue Shopping Link */}
                            <button 
                                onClick={() => navigate('/products')}
                                className="mt-6 inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                            >
                                <span>←</span> Continue Shopping
                            </button>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                                    Order Summary
                                </h2>

                                {/* Delivery Address Section */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Delivery Address
                                        </h3>
                                        <button 
                                            onClick={() => navigate('/settings')}
                                            className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors"
                                        >
                                            Change
                                        </button>
                                    </div>
                                    {defaultAddress ? (
                                        <div className="text-sm text-gray-600 leading-relaxed">
                                            <p className="font-semibold text-gray-800">{defaultAddress.fullName}</p>
                                            <p>{defaultAddress.phone}</p>
                                            <p className="mt-1">
                                                {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state}, {defaultAddress.country}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                                            <p>Chưa có địa chỉ giao hàng!</p>
                                            <button 
                                                onClick={() => navigate('/settings')}
                                                className="text-green-600 hover:text-green-700 font-semibold mt-1"
                                            >
                                                Thêm địa chỉ →
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Payment Method Section */}
                                <div className="mb-8">
                                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                                        Payment Method
                                    </h3>
                                    <select 
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 font-medium"
                                    >
                                        <option value="Cash On Delivery">Cash On Delivery</option>
                                        <option value="Online">Online Payment</option>
                                    </select>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Price</span>
                                        <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Shipping Fee</span>
                                        <span className="text-green-600 font-semibold">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Tax (2%)</span>
                                        <span className="font-semibold text-gray-800">{formatPrice(tax)}</span>
                                    </div>
                                </div>

                                {/* Total Amount */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                                    <span className="text-2xl font-bold text-gray-800">
                                        {formatPrice(totalAmount)}
                                    </span>
                                </div>

                                {/* Place Order Button */}
                                <button 
                                    onClick={async () => {
                                        if (isPlacingOrder) return
                                        
                                        if (!defaultAddress) {
                                            toast.error('Vui lòng thêm địa chỉ giao hàng trong Settings!')
                                            setTimeout(() => navigate('/settings'), 1500)
                                            return
                                        }
                                        
                                        setIsPlacingOrder(true)
                                        
                                        const orderData = {
                                            products: cartProducts.map(p => ({
                                                _id: p._id,
                                                name: p.name,
                                                image: p.image[0],
                                                quantity: p.quantity,
                                                price: p.offerPrice,
                                                total: p.offerPrice * p.quantity
                                            })),
                                            address: defaultAddress,
                                            paymentMethod,
                                            subtotal,
                                            shippingFee,
                                            tax,
                                            totalAmount
                                        }
                                        
                                        placeOrder(orderData)
                                        toast.success('Đặt hàng thành công!')
                                        
                                        setTimeout(() => {
                                            setIsPlacingOrder(false)
                                            navigate('/orders')
                                        }, 1500)
                                    }}
                                    disabled={isPlacingOrder}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isPlacingOrder ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang xử lý...
                                        </span>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
