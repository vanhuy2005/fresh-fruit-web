import React from 'react'
import { useAppContext } from '../context/AppContext'
import { categories } from '../assets/assets'

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className='py-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30'>
      {/* Section Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight'>
          Browse Our 
          <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'> Categories</span>
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
          Discover fresh, quality products organized by type for your convenience
        </p>
      </div>

      {/* Categories Grid - 5 items in one row */}
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5'>
          {categories.map((category, index) => {
            return (
              <div 
                key={index}
                className='group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 bg-white shadow-md hover:shadow-xl'
                onClick={() => {
                  navigate(`/products/${category.path.toLowerCase()}`)
                  scrollTo(0, 0)
                }}
              >
                {/* Image Container - Clean design without icon */}
                <div className='relative h-48 overflow-hidden bg-gradient-to-br from-white to-gray-50'>
                  <img 
                    src={category.image} 
                    alt={category.text}
                    className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110'
                    style={{ transform: `scale(${category.scale || 1})` }}
                  />
                </div>

                {/* Thin Green Line */}
                <div className='h-0.5 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400'></div>

                {/* Text Content - More padding */}
                <div className='p-5 text-center bg-white'>
                  <h3 className='text-base font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300 leading-tight'>
                    {category.text}
                  </h3>
                  <p className='text-xs text-gray-500 leading-relaxed line-clamp-2'>
                    {category.description}
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

export default Categories