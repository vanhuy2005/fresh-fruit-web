import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Cart = () => {
    const navigate = useNavigate()
    const { cartItems, products, currency, updateCartQuantity, removeFromCart, getCartTotal, getCartCount } = useAppContext()
    const [showAddress, setShowAddress] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)

    // Get cart products with details
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

    useEffect(() => {
        // Load addresses from localStorage
        const savedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]')
        setAddresses(savedAddresses)
        if (savedAddresses.length > 0) {
            setSelectedAddress(savedAddresses[0])
        }
    }, [])

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId)
            return
        }
        updateCartQuantity(productId, newQuantity)
    }

    const handleRemoveClick = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            // Nếu quantity > 1, giảm 1
            updateCartQuantity(productId, currentQuantity - 1)
        } else {
            // Nếu quantity = 1, xóa khỏi giỏ
            removeFromCart(productId)
        }
    }

    const calculateSubtotal = () => {
        return getCartTotal()
    }

    const calculateTax = () => {
        return Math.round(getCartTotal() * 0.02)
    }

    const calculateTotal = () => {
        return getCartTotal() + calculateTax()
    }

    const handleAddressSelect = (address) => {
        setSelectedAddress(address)
        setShowAddress(false)
    }

    const handleCheckout = () => {
        if (!selectedAddress) {
            alert('Please select a delivery address')
            return
        }
        if (paymentMethod === 'Online') {
            alert('Processing to checkout...')
        } else {
            alert('Order placed successfully!')
        }
    }

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        <div className='flex-1 max-w-4xl'>
            <h1 className="text-3xl font-medium mb-6">
                Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()} Items</span>
            </h1>

            {cartProducts.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                    <button 
                        onClick={() => navigate('/products')}
                        className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                        <p className="text-left">Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartProducts.map((product) => (
                        <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            <div className="flex items-center md:gap-6 gap-3">
                                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                    <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.name}</p>
                                    <div className="font-normal text-gray-500/70">
                                        <p>Category: <span>{product.category || "N/A"}</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <select 
                                                className='outline-none ml-2'
                                                value={product.quantity}
                                                onChange={(e) => handleUpdateQuantity(product._id, parseInt(e.target.value))}
                                            >
                                                <option value={0}>0 (Remove)</option>
                                                {Array(10).fill('').map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                            <button 
                                className="cursor-pointer mx-auto hover:scale-110 transition-transform"
                                onClick={() => handleRemoveClick(product._id, product.quantity)}
                                title={product.quantity > 1 ? "Giảm 1 sản phẩm" : "Xóa khỏi giỏ hàng"}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    <button 
                        onClick={() => navigate('/products')}
                        className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
                    >
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Continue Shopping
                    </button>
                </>
            )}
        </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        {selectedAddress ? (
                            <div className="text-sm text-gray-700">
                                <p className="font-medium">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                                <p>{selectedAddress.street}</p>
                                <p>{selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipcode}</p>
                                <p>{selectedAddress.country}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500">No address found</p>
                        )}
                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                                {addresses.map((address, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => handleAddressSelect(address)} 
                                        className="text-gray-700 p-2 hover:bg-gray-100 cursor-pointer border-b"
                                    >
                                        <p className="font-medium">{address.firstName} {address.lastName}</p>
                                        <p className="text-xs">{address.street}, {address.city}</p>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => navigate('/add-address')} 
                                    className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10 w-full"
                                >
                                    Add New Address
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select 
                        className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{calculateSubtotal()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{calculateTax()}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{calculateTotal()}</span>
                    </p>
                </div>

                <button 
                    onClick={handleCheckout}
                    className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition disabled:bg-gray-400"
                    disabled={cartProducts.length === 0}
                >
                    {paymentMethod === 'Online' ? 'Process to Checkout' : 'Place Order'}
                </button>
            </div>
        </div>
    )
}

export default Cart