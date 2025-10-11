import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Đăng kí thành công!')
      setEmail('')
    } else {
      toast.error('Vui lòng nhập địa chỉ email hợp lệ')
    }
  }

  return (
    <div className='pt-6 pb-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50'>
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Đăng Kí 
            <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'> Ngay!</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Để lại gmail của bạn để nhận được những ưu đãi mới nhấtvà các chương trình giảm giá độc quyền
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 text-gray-700 bg-white border border-gray-200 rounded-full sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              placeholder="Nhập địa chỉ email của bạn"
              required  
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-full sm:rounded-l-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 whitespace-nowrap"
            >
              Đăng Kí
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Không Spam</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Hủy mọi lúc</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Khuyến mãi hàng tuần</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
