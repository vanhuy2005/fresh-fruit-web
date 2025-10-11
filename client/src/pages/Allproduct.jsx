import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const Allproduct = () => {
    const { searchQuery, setSearchQuery, products } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const source = products && products.length ? products : []
        
        // Define category order
        const categoryOrder = {
            'Vietnamese-Fruits': 1,
            'Imported-Fruits': 2,
            'Gift-Baskets': 3,
            'Fresh-Juices': 4,
            'Processed-Fruits': 5
        }
        
        let filtered = []
        
        if (searchQuery && searchQuery.trim().length > 0) {
            filtered = source.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        } else {
            filtered = [...source]
        }
        
        // Sort by category order first, then by name alphabetically
        const sorted = filtered.sort((a, b) => {
            const categoryA = categoryOrder[a.categoryType] || 999
            const categoryB = categoryOrder[b.categoryType] || 999
            
            if (categoryA !== categoryB) {
                return categoryA - categoryB
            }
            
            // Same category, sort by name alphabetically
            return a.name.localeCompare(b.name)
        })
        
        setFilteredProducts(sorted)
    }, [searchQuery, products])

    const clearSearch = () => {
        setSearchQuery('')
    }

    return (
        <div className="py-12 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30">
            {/* Header Section - Matching Home Page Style */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                    {searchQuery ? (
                        <>
                            Kết Quả Tìm Kiểm Cho 
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> "{searchQuery}"</span>
                        </>
                    ) : (
                        <>
                            Tất Cả
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Sản Phẩm</span>
                        </>
                    )}
                </h1>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {searchQuery 
                        ? `Tìm thấy ${filteredProducts.filter(p => p.inStock).length} sản phẩm phù hợp với từ khóa của bạn`
                        : 'Khám phá bộ sưu tập trái cây tươi, nước ép và giỏ quà đặc sắc của chúng tôi'
                    }
                </p>
                
                {/* Clear Search Button */}
                {searchQuery && (
                    <button 
                        onClick={clearSearch}
                        className="mt-4 inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Làm Mới Tìm Kiếm
                    </button>
                )}
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto">
                {filteredProducts && filteredProducts.filter(p => p.inStock).length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                        {filteredProducts.filter((p) => p.inStock).map((product, index) => (
                            <ProductCard key={product._id || index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-2xl font-bold text-gray-800 mb-2">
                            {searchQuery ? `Không tìm thấy sản phẩm nào cho "${searchQuery}"` : 'Hiện chưa có sản phẩm'}
                        </p>
                        <p className="text-gray-600 mb-6">
                            {searchQuery ? 'Hãy thử tìm với từ khóa khác' : 'Vui lòng quay lại sau'}
                        </p>
                        {searchQuery && (
                            <button 
                                onClick={clearSearch}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Làm Mới Tìm Kiếm & Xem Tất Cả Sản Phẩm
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Allproduct