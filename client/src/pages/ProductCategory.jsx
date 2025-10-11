import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const { products, setSearchQuery } = useAppContext()
    const { category } = useParams()
    
    // Clear search query when entering category page
    useEffect(() => {
        setSearchQuery('')
    }, [category, setSearchQuery])
    
    // Find category info
    const searchCategory = categories.find((item) => 
        item.path.toLowerCase() === category?.toLowerCase()
    )
    
    // Filter products by categoryType with exact matching
    const filteredProducts = products.filter((product) => {
        if (!product.categoryType || !category) return false
        return product.categoryType.toLowerCase() === category.toLowerCase()
    }).sort((a, b) => a.name.localeCompare(b.name))
    
    return (
        <div className='mt-16 px-6 md:px-16 lg:px-24 xl:px-32 pb-12'>
          {searchCategory && (
            <div className='mb-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <img 
                        src={searchCategory.image} 
                        alt={searchCategory.text}
                        className='w-24 h-24 object-contain rounded-xl shadow-md bg-gradient-to-br from-white to-gray-50 p-3'
                    />
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800'>
                            {searchCategory.text}
                        </h1>
                        <p className='text-gray-600 mt-1'>{searchCategory.description}</p>
                        <p className='text-sm text-gray-500 mt-2'>
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} còn lại
                        </p>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400"></div>
            </div>
          )}
          
          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 mt-6'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
          ) : (
            <div className='flex items-center justify-center h-[60vh]'>
                <div className='text-center'>
                    <div className='text-6xl mb-4'>🔍</div>
                    <p className='text-2xl font-bold text-gray-800 mb-2'>No products found</p>
                    <p className='text-gray-600 mb-6'>We couldn't find any products in this category</p>
                    <button 
                        onClick={() => { window.history.back() }}
                        className='bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl'
                    >
                        Go Back
                    </button>
                </div>
            </div>
          )}
        </div>
    )
}

export default ProductCategory