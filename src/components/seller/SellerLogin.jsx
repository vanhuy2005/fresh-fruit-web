import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {
    const { isSeller, setIsSeller } = useAppContext()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // Tài khoản seller mặc định
    const DEFAULT_SELLER = {
        email: "giahuy1711@gmail.com",
        password: "hahaha"
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setError("")
        
        // Check tài khoản mặc định
        if (email === DEFAULT_SELLER.email && password === DEFAULT_SELLER.password) {
            setIsSeller(true)
            navigate("/seller/dashboard")
        } else {
            setError("Email hoặc mật khẩu không đúng!")
        }
    }

    useEffect(() => {
        if (isSeller) {
            navigate("/seller/dashboard")
        }
    }, [isSeller, navigate])

    // If already logged in, redirect
    if (isSeller) {
        return null
    }

    return (
       <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center text-sm text-gray-600 bg-gray-50">
        <div className='flex flex-col gap-5 items-start p-8 py-12 min-w-80 sm:min-w-96 rounded-lg shadow-xl border border-gray-200 bg-white'>
            <p className='text-2xl font-medium m-auto'>
                <span className="text-primary">Seller </span>Login
            </p>
            
            {/* Thông tin tài khoản demo */}
            <div className="w-full bg-blue-50 border border-blue-200 rounded p-3 text-xs">
                <p className="font-medium text-blue-800 mb-1">🔑 Tài khoản demo:</p>
                <p className="text-blue-700">Email: <span className="font-mono">giahuy1711@gmail.com</span></p>
                <p className="text-blue-700">Password: <span className="font-mono">hahaha</span></p>
            </div>

            {/* Thông báo lỗi */}
            {error && (
                <div className="w-full bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
                    {error}
                </div>
            )}
            
            <div className="w-full">
                <p>Email</p>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary" 
                    required
                />
            </div>
            <div className="w-full">
                <p>Password</p>
                <input 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary" 
                    required
                />
            </div>
            <button 
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-md cursor-pointer font-medium transition-colors shadow-md"
            >
                Login
            </button>
        </div>
       </form>
    )
}

export default SellerLogin