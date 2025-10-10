import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const Allproduct = () => {
    const { searchQuery, products } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const source = products && products.length ? products : []
        if (searchQuery && searchQuery.trim().length > 0) {
            setFilteredProducts(
                source.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        } else {
            setFilteredProducts(source)
        }
    }, [searchQuery, products])

    return (
        <div className="mt-16 flex flex-col items-center px-4">
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium uppercase">All products</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="w-full max-w-6xl mt-6">
                {filteredProducts && filteredProducts.filter(p => p.inStock).length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-4">
                        {filteredProducts.filter((p) => p.inStock).map((product, index) => (
                            <ProductCard key={product._id || index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center text-gray-500">
                        <p className="text-lg font-medium">Không có sản phẩm nào để hiển thị</p>
                        <p className="mt-2">Hãy thử thay đổi bộ lọc hoặc quay lại sau.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Allproduct