import React from 'react'
import { features } from '../assets/assets'

const Bottombanner = () => {
  return (
    <div className='pt-12 pb-6 px-6 md:px-16 lg:px-24 xl:px-32'>
      {/* Features Section */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight'>
          Tại Sao Chúng Tôi Là  
          <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'> Tốt Nhất?</span>
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8'>
          Lý do tại sao chúng tôi là lựa chọn hàng đầu cho các sản phẩm tươi ngon, chất lượng
        </p>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            // Define color combinations that match content meaning
            const gradientStyles = [
              'from-blue-500 to-indigo-500',     // Delivery - Speed & Movement (Blue)
              'from-green-500 to-emerald-500',   // Freshness - Nature & Fresh (Green)
              'from-amber-500 to-orange-500',    // Affordable - Gold/Money (Amber/Orange)
              'from-purple-500 to-violet-500'    // Trusted - Premium & Trust (Purple)
            ];
            
            const shadowStyles = [
              'shadow-blue-500/30 group-hover:shadow-blue-500/50',
              'shadow-green-500/30 group-hover:shadow-green-500/50', 
              'shadow-amber-500/30 group-hover:shadow-amber-500/50',
              'shadow-purple-500/30 group-hover:shadow-purple-500/50'
            ];

            const hoverTextColors = [
              'group-hover:text-blue-700',
              'group-hover:text-green-700',
              'group-hover:text-amber-700', 
              'group-hover:text-purple-700'
            ];

            const borderHoverColors = [
              'hover:border-blue-200',
              'hover:border-green-200',
              'hover:border-amber-200',
              'hover:border-purple-200'
            ];

            // Custom SVG icons for each feature
            const customIcons = [
              // Delivery Truck Icon
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>,
              
              // Leaf/Fresh Icon
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>,
              
              // Money/Coin Icon
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
              </svg>,
              
              // Users/People Icon
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4.5c0-1.1.9-2 2-2s2 .9 2 2V18h4v-2.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4.5c0-2.21-1.79-4-4-4-1.2 0-2.27.53-3 1.36-.73-.83-1.8-1.36-3-1.36-2.21 0-4 1.79-4 4V18h2z"/>
                <circle cx="6" cy="6" r="2"/>
                <circle cx="12" cy="6" r="2"/>
              </svg>
            ];

            return (
              <div key={index} className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${borderHoverColors[index]} hover:-translate-y-2 p-6`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradientStyles[index]} rounded-full flex items-center justify-center shadow-lg ${shadowStyles[index]} mb-4 group-hover:scale-110 transition-all duration-300`}>
                    {customIcons[index]}
                  </div>
                  <h3 className={`font-semibold text-gray-800 text-lg mb-2 ${hoverTextColors[index]} transition-colors`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Bottombanner
