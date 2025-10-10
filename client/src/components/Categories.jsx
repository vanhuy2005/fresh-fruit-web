import React from 'react'
import { useAppContext } from '../context/AppContext'
import organic_vegitable_image from '../assets/organic_vegitable_image.png'
import fresh_fruits_image from '../assets/fresh_fruits_image.png'
import bottles_image from '../assets/bottles_image.png'
import maggi_image from '../assets/maggi_image.png'
import dairy_product_image from '../assets/dairy_product_image.png'
import bakery_image from '../assets/bakery_image.png'
import grain_image from '../assets/grain_image.png'

const Categories = () => {
  const { navigate } = useAppContext()

  // Categories dựa trên sản phẩm thực tế trong assets
  const categories = [
    {
      text: "Fresh Vegetables",
      path: "Vegetables", 
      image: organic_vegitable_image,
      bgColor: "#FEF6DA",
    },
    {
      text: "Fresh Fruits",
      path: "Fruits",
      image: fresh_fruits_image, 
      bgColor: "#FEE0E0",
    },
    {
      text: "Beverages",
      path: "Drinks",
      image: bottles_image,
      bgColor: "#F0F5DE", 
    },
    {
      text: "Instant Food",
      path: "Instant",
      image: maggi_image,
      bgColor: "#E1F5EC",
    },
    {
      text: "Dairy Products", 
      path: "Dairy",
      image: dairy_product_image,
      bgColor: "#FEE6CD",
    },
    {
      text: "Bakery Items",
      path: "Bakery", 
      image: bakery_image,
      bgColor: "#E0F6FE",
    },
    {
      text: "Grains & Rice",
      path: "Grains",
      image: grain_image,
      bgColor: "#F1E3F9",
    },
  ]

  return (
    <div className='py-12 px-6 md:px-16 lg:px-24 xl:px-32'>
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

      {/* Categories Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 max-w-7xl mx-auto'>
        {categories.map((category, index) => {
          return (
            <div 
              key={index} 
              className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center transition-all duration-300 hover:scale-105 hover:shadow-lg'
              style={{backgroundColor: category.bgColor}}
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`)
                scrollTo(0, 0)
              }}
            >
              <img 
                src={category.image} 
                alt={category.text}
                className='group-hover:scale-108 transition max-w-28'
              />
              <p className='text-sm font-medium text-center'>{category.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Categories