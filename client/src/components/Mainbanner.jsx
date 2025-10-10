import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img 
        src={assets.main_banner_bg} 
        alt="banner" 
        className='w-full hidden md:block'
      />
      
      <img 
        src={assets.main_banner_bg_sm} 
        alt="banner" 
        className='w-full md:hidden'
      />
      
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-16 lg:pl-24 xl:pl-32'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
          Freshness You Can Trust, Savings You will Love!
        </h1>
        
        <div className='flex flex-col md:flex-row items-center gap-4 mt-8'>
          {/* Shop Now Button - Vibrant Primary Design */}
          <Link 
            to="/products"
            className='group relative flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-2xl text-white font-semibold text-lg cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-green-500/25 hover:-translate-y-1 active:translate-y-0 min-w-52 justify-center'
          >
            <span className='transition-transform duration-300 group-hover:translate-x-1'>Shop Now</span>
            <div className='flex items-center justify-center w-8 h-8 bg-white/20 rounded-full transition-all duration-300 group-hover:bg-white/30 group-hover:rotate-12'>
              <svg className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </div>
          </Link>

          {/* Explore Deals Button - Clean White Design */}
          <Link 
            to="/products"
            className='group relative flex items-center gap-3 px-10 py-4 bg-white border-2 border-white hover:bg-green-50 hover:border-green-500 transition-all duration-300 rounded-2xl text-gray-800 hover:text-green-700 font-semibold text-lg cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 min-w-52 justify-center'
          >
            <span className='transition-transform duration-300 group-hover:translate-x-1'>Explore Deals</span>
            <div className='flex items-center justify-center w-8 h-8 border border-gray-300 group-hover:border-green-500 group-hover:bg-green-100 rounded-full transition-all duration-300 group-hover:rotate-12'>
              <svg className='w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
