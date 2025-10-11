import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import SellerAddProduct from './SellerAddProduct'
import SellerStoreControl from './SellerStoreControl'
import SellerOrders from './SellerOrders'

const SellerControl = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { setIsSeller, user } = useAppContext()
    
    // Determine active page from URL
    const getActivePage = () => {
        if (location.pathname.includes('/seller/products')) return 'products'
        if (location.pathname.includes('/seller/orders')) return 'orders'
        return 'add-product'
    }
    
    const [activePage, setActivePage] = useState(getActivePage())

    const handleLogout = () => {
        setIsSeller(false)
        localStorage.removeItem('isSeller')
        navigate('/seller-login')
    }

    const handleNavigation = (page, path) => {
        setActivePage(page)
        navigate(path)
    }

    const sidebarLinks = [
        { name: "Add Product", key: "add-product", path: "/seller" },
        { name: "Product List", key: "products", path: "/seller/products" },
        { name: "Orders", key: "orders", path: "/seller/orders" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-4 bg-white shadow-sm">
                <div className="flex items-center gap-3">
                    <img 
                        src={assets.logoFruitHub3D} 
                        alt="GreenCart" 
                        className="h-12 w-auto object-contain drop-shadow-sm" 
                    />
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                    <p className="text-sm">Hi! <span className="font-medium">{user?.name || 'Admin'}</span></p>
                    <button 
                        onClick={handleLogout}
                        className='border border-gray-300 rounded-full text-sm px-5 py-1.5 hover:bg-gray-100 transition-colors font-medium'
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
                    <div className="py-6">
                        {sidebarLinks.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => handleNavigation(item.key, item.path)}
                                className={`w-full text-left py-3 px-6 transition-all ${
                                    activePage === item.key
                                        ? "bg-green-50 text-green-600 border-r-4 border-green-600 font-medium"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {activePage === 'add-product' && <SellerAddProduct />}
                    {activePage === 'products' && <SellerStoreControl />}
                    {activePage === 'orders' && <SellerOrders />}
                </div>
            </div>
        </div>
    )
}

export default SellerControl