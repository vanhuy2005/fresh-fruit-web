import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Login = () => {
    const [state, setState] = React.useState("login")
    const { login } = useAppContext()
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            if (state === "login") {
                // Login logic with test account validation
                if (formData.email && formData.password) {
                    // Test account credentials
                    const testAccount = {
                        email: 'abc123@gmail.com',
                        password: '12345678',
                        name: 'hẹ hẹ hẹ'
                    }
                    
                    // Check if credentials match test account
                    if (formData.email === testAccount.email && formData.password === testAccount.password) {
                        const userData = {
                            name: testAccount.name,
                            email: testAccount.email,
                            avatar: null
                        }
                        login(userData, 'demo-token')
                        toast.success(`🎉 Chúc mừng ${testAccount.name} đã đăng nhập thành công!`, {
                            duration: 5000,
                            style: {
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '14px',
                                borderRadius: '12px',
                                padding: '16px',
                                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minWidth: '300px',
                                maxWidth: '400px'
                            },
                        })
                        navigate('/')
                    } else {
                        // For any other credentials, use demo login
                        const userData = {
                            name: formData.email.split('@')[0],
                            email: formData.email,
                            avatar: null
                        }
                        login(userData, 'demo-token')
                        toast.success('🎉 Welcome back! Login successful!', {
                            duration: 4000,
                            style: {
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: 'white',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minWidth: '280px',
                                maxWidth: '380px'
                            },
                        })
                        navigate('/')
                    }
                } else {
                    toast.error('⚠️ Please fill in all fields')
                    return
                }
            } else {
                // Sign up logic
                if (formData.name && formData.email && formData.password) {
                    const userData = {
                        name: formData.name,
                        email: formData.email,
                        avatar: null
                    }
                    login(userData, 'demo-token')
                    toast.success('🌟 Account created successfully! Welcome aboard!', {
                        duration: 4000,
                        style: {
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minWidth: '320px',
                            maxWidth: '420px'
                        },
                    })
                    navigate('/')
                } else {
                    toast.error('⚠️ Please fill in all fields')
                    return
                }
            }
        } catch (error) {
            toast.error('❌ An error occurred. Please try again.')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">{/* Changed to center everything vertically */}
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-300/20 to-green-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-3xl"></div>
            </div>

            {/* Back to Home Button */}
            <Link 
                to="/" 
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium group"
            >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Trở Về Trang Chủ
            </Link>

            {/* Main Login Container */}
            <div className="relative z-10 w-full max-w-md">{/* Increased back to max-w-md to accommodate logo */}
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
                
                {/* Login Form */}
                <div className="relative">
                    {/* Background Glow - Reduced intensity */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-3xl blur-lg opacity-15"></div>
                    
                    {/* Glass Panel */}
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                        {/* Logo Section */}
                        <div className="flex justify-center pt-6 pb-0.5 border-b border-gray-100/50">
                            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent">Fruit</span>Hub
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            {/* Simple Header Section */}
                            <div className="px-8 pt-3 pb-3 text-center border-b border-gray-100">
                                <h1 className="text-gray-800 text-4xl font-bold tracking-tight">
                                    {state === "login" ? "Login Form" : "Sign Up Form"}
                                </h1>
                            </div>

                            {/* Form Fields Section */}
                            <div className="px-8 py-6 space-y-5">{/* Increased px to match larger width */}
                                {state !== "login" && (
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Họ Và Tên</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <svg className="w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                placeholder="Enter your full name" 
                                                className="w-full pl-10 pr-3 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm" 
                                                value={formData.name} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Địa Chỉ Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            placeholder="Enter your email address" 
                                            className="w-full pl-10 pr-3 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Mật Khẩu</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="Enter your password" 
                                            className="w-full pl-10 pr-3 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm" 
                                            value={formData.password} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>

                                {state === "login" && (
                                    <div className="text-left mt-2">
                                        <button 
                                            type="button" 
                                            className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline"
                                        >
                                            Quên Mật Khẩu?
                                        </button>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button 
                                    type="submit" 
                                    className="w-full py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/25 tracking-tight"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={state === "login" ? "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"} />
                                        </svg>
                                        <span className="text-sm">{state === "login" ? "Sign In" : "Create Account"}</span>
                                    </div>
                                </button>

                                {/* Toggle State */}
                                <div className="text-center pt-4 border-t border-gray-200/60">
                                    <p className="text-gray-600 text-sm mb-2">
                                        {state === "login" ? "New to FruitHub?" : "Already have an account?"} 
                                    </p>
                                    <button 
                                        type="button"
                                        onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
                                        className="text-green-600 hover:text-green-700 font-bold transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-green-50 text-sm"
                                    >
                                        {state === "login" ? "Create Account" : "Sign In Instead"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login