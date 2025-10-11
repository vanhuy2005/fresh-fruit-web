import React, { useState, useContext, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const NavBar = () => {
    const [open, setOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const { user, getCartCount, searchQuery, setSearchQuery, logout } = useContext(AppContext)
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showDropdown])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate('/products')
            // Keep search query to show results
        }
    }

    return (
        <nav className="font-outfit flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-200/80 bg-white/96 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 shadow-sm hover:shadow-md">
            {/* Logo */}
            <NavLink to="/" onClick={() => setOpen(false)} className="group">
                <img 
                    src={assets.logoFruitHub3D} 
                    alt="FruitHub" 
                    className="h-14 w-auto max-w-40 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" 
                />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-5">
                <NavLink 
                    to="/" 
                    className="relative font-medium transition-all duration-300 px-4 py-3 group tracking-tight text-gray-700 hover:text-green-700 hover:font-bold hover:bg-gray-50"
                >
                    {({ isActive }) => (
                        <>
                            <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-green-700 font-bold' : ''}`}>
                                <svg className="w-4 h-4 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Trang Chủ
                            </span>
                            {/* Bottom line indicator */}
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 transition-all duration-300 ${
                                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}></div>
                        </>
                    )}
                </NavLink>
                
                <NavLink 
                    to="/products" 
                    className="relative font-medium transition-all duration-300 px-4 py-3 group tracking-tight text-gray-700 hover:text-green-700 hover:font-bold hover:bg-gray-50"
                >
                    {({ isActive }) => (
                        <>
                            <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-green-700 font-bold' : ''}`}>
                                <svg className="w-4 h-4 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Sản Phẩm
                            </span>
                            {/* Bottom line indicator */}
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 transition-all duration-300 ${
                                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}></div>
                        </>
                    )}
                </NavLink>
                
                <NavLink 
                    to="/about" 
                    className="relative font-medium transition-all duration-300 px-4 py-3 group tracking-tight text-gray-700 hover:text-green-700 hover:font-bold hover:bg-gray-50"
                >
                    {({ isActive }) => (
                        <>
                            <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-green-700 font-bold' : ''}`}>
                                <svg className="w-4 h-4 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Về Chúng Tôi
                            </span>
                            {/* Bottom line indicator */}
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 transition-all duration-300 ${
                                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}></div>
                        </>
                    )}
                </NavLink>

                {/* Search */}
                <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 border border-gray-200/80 px-4 py-2.5 rounded-full bg-gray-50/60 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300 focus-within:border-green-300 focus-within:bg-white focus-within:shadow-lg group">
                    <svg className="w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Nhập sản phẩm cần tìm..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="outline-none bg-transparent placeholder-gray-400 flex-1 min-w-[200px] font-medium"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                setSearchQuery('')
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-full"
                            title="Làm Mới Tìm Kiếm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </form>

                {/* Cart */}
                <div className="relative cursor-pointer group" onClick={() => navigate('/cart')}>
                    <div className="p-2 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-110">
                        <img src={assets.nav_cart_icon} alt="cart" className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        {getCartCount() > 0 && (
                            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse font-semibold">
                                {getCartCount()}
                            </div>
                        )}
                    </div>
                </div>

                {/* User Profile */}
                <div className="relative" ref={dropdownRef}>
                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group hover:scale-105"
                            >
                                <div className="w-9 h-9 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow border border-green-200/80 group-hover:border-green-300">
                                    <img 
                                        src={assets.profile_icon} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <svg className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {showDropdown && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/80 py-2 z-50">
                                    {/* User Info Header */}
                                    <div className="px-4 py-3 border-b border-gray-100/60">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden shadow-md border border-green-200/80">
                                                <img 
                                                    src={assets.profile_icon} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-gray-800 truncate tracking-tight">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Menu Items */}
                                    <div className="py-2">
                                        {/* Profile */}
                                        <button 
                                            onClick={() => {
                                                navigate('/profile')
                                                setShowDropdown(false)
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200 group"
                                        >
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-sm tracking-tight">Hồ Sơ</span>
                                        </button>

                                        {/* Orders */}
                                        <button 
                                            onClick={() => {
                                                navigate('/orders')
                                                setShowDropdown(false)
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200 group"
                                        >
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            <span className="text-sm tracking-tight">Sản Phẩm Của Tôi</span>
                                        </button>

                                        {/* Settings */}
                                        <button 
                                            onClick={() => {
                                                navigate('/settings')
                                                setShowDropdown(false)
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200 group"
                                        >
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm tracking-tight">Cài Đặt</span>
                                        </button>

                                        {/* Help & Support */}
                                        <button 
                                            onClick={() => {
                                                navigate('/support')
                                                setShowDropdown(false)
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all duration-200 group"
                                        >
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm tracking-tight">Trợ Giúp Và Hỗ Trợ</span>
                                        </button>

                                        {/* Divider */}
                                        <div className="border-t border-gray-100 my-2"></div>

                                        {/* Logout */}
                                        <button 
                                            onClick={() => {
                                                logout()
                                                setShowDropdown(false)
                                                navigate('/')
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-all duration-200 group"
                                        >
                                            <svg className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span className="text-sm tracking-tight">Đăng Xuất</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => {
                                navigate('/login')
                                setOpen(false)
                            }}
                            className="relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-6 py-2.5 rounded-full font-semibold tracking-tight transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/25 hover:-translate-y-1 transform group border border-green-400/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Đăng Nhập
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setOpen(!open)} 
                aria-label="Menu" 
                className="sm:hidden p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
            >
                <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-[70px] left-0 right-0 bg-white/98 backdrop-blur-md shadow-2xl border-t border-gray-100 md:hidden z-40 max-h-[calc(100vh-70px)] overflow-y-auto">
                    {/* Navigation Section */}
                    <div className="px-6 py-4 border-b border-gray-100">
                        <div className="space-y-2">
                            <NavLink 
                                to="/" 
                                onClick={() => setOpen(false)} 
                                className={({ isActive }) => 
                                    `relative block px-5 py-4 rounded-2xl font-medium transition-all duration-300 group ${
                                        isActive 
                                            ? 'text-green-700 font-bold bg-gray-50' 
                                            : 'text-gray-700 hover:text-green-700 hover:font-bold hover:bg-gray-50'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <svg className="w-5 h-5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span className="tracking-tight">Trang Chủ</span>
                                </div>
                            </NavLink>
                            
                            <NavLink 
                                to="/products" 
                                onClick={() => setOpen(false)} 
                                className={({ isActive }) => 
                                    `relative block px-5 py-4 rounded-2xl font-medium transition-all duration-300 group ${
                                        isActive 
                                            ? 'text-green-700 font-bold bg-gray-50' 
                                            : 'text-gray-700 hover:text-green-700 hover:font-bold hover:bg-gray-50'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <svg className="w-5 h-5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span className="tracking-tight">Sản Phẩm</span>
                                </div>
                            </NavLink>
                            
                            <NavLink 
                                to="/about" 
                                onClick={() => setOpen(false)} 
                                className={({ isActive }) => 
                                    `relative block px-5 py-4 rounded-2xl font-medium transition-all duration-300 group ${
                                        isActive 
                                            ? 'text-green-700 font-bold bg-gray-50' 
                                            : 'text-gray-700 hover:text-green-700 hover:font-bold hover:bg-gray-50'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <svg className="w-5 h-5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="tracking-tight">Về Chúng Tôi</span>
                                </div>
                            </NavLink>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="px-6 py-4 border-b border-gray-100 lg:hidden">
                        <form onSubmit={handleSearch} className="flex items-center gap-2 border border-gray-200 px-4 py-3 rounded-xl bg-gray-50 hover:bg-white hover:border-gray-300 transition-all duration-300 focus-within:border-green-300 focus-within:bg-white group">
                            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none bg-transparent placeholder-gray-400 flex-1 font-medium tracking-tight"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSearchQuery('')
                                    }}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-full"
                                    title="Clear search"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </form>
                    </div>

                    {/* User Section */}
                    <div className="px-6 py-4 pb-6">
                        {user ? (
                            <div className="space-y-3">
                                {/* User Info */}
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-md border border-green-200/80">
                                        <img 
                                            src={assets.profile_icon} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 tracking-tight">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="space-y-1">
                                    {/* Profile */}
                                    <button 
                                        onClick={() => {
                                            navigate('/profile')
                                            setOpen(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Hồ Sơ</span>
                                    </button>

                                    {/* Orders */}
                                    <button 
                                        onClick={() => {
                                            navigate('/orders')
                                            setOpen(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <span>Sản Phẩm Của Tôi</span>
                                    </button>

                                    {/* Settings */}
                                    <button 
                                        onClick={() => {
                                            navigate('/settings')
                                            setOpen(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Cài Đặt</span>
                                    </button>

                                    {/* Help & Support */}
                                    <button 
                                        onClick={() => {
                                            navigate('/support')
                                            setOpen(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Trợ Giúp Và Hỗ Trợ</span>
                                    </button>

                                    {/* Divider */}
                                    <div className="border-t border-gray-200 my-3"></div>

                                    {/* Logout - Now Easily Accessible */}
                                    <button 
                                        onClick={() => {
                                            logout()
                                            setOpen(false)
                                            navigate('/')
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl font-medium transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Đăng Xuất</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={() => {
                                    navigate('/login')
                                    setOpen(false)
                                }}
                                className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-6 py-4 rounded-full font-semibold tracking-tight transition-all duration-500 hover:shadow-xl hover:shadow-green-500/25 hover:scale-[1.02] transform group border border-green-400/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Đăng Nhập
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar