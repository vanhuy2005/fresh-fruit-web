import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const SellerStoreControl = () => {
    const { products, formatPrice } = useAppContext()
    const [productStocks, setProductStocks] = useState({})

    // Map categoryType to display names
    const getCategoryDisplay = (categoryType) => {
        const categoryMap = {
            'Vietnamese-Fruits': 'Vietnamese Fruits',
            'Imported-Fruits': 'Imported Fruits',
            'Dried-Processed': 'Dried & Processed',
            'Gift-Baskets': 'Gift Baskets',
            'Fresh-Juices': 'Fresh Juices'
        }
        return categoryMap[categoryType] || categoryType || 'Fruits'
    }

    const toggleStock = (productId) => {
        setProductStocks(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }))
        toast.success('Stock status updated')
    }

    const handleDelete = (productId) => {
        // Delete product logic
        toast.success('Product deleted successfully')
    }

    return (
        <div className="py-8 px-6 md:px-12 bg-white min-h-[calc(100vh-73px)]">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">All Products</h2>
            
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Selling Price</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">In Stock</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                <img 
                                                    src={product.image[0]} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {getCategoryDisplay(product.categoryType)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                        {formatPrice(product.offerPrice)}đ
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer" 
                                                    checked={productStocks[product._id] !== false}
                                                    onChange={() => toggleStock(product._id)}
                                                />
                                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-200"></div>
                                                <span className="absolute left-1 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 shadow-sm"></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleDelete(product._id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg mb-4">No products yet</p>
                    <p className="text-gray-400">Start by adding your first product</p>
                </div>
            )}
        </div>
    )
}

export default SellerStoreControl