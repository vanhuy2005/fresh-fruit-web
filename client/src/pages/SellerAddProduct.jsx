import React, { useState } from 'react'
import toast from 'react-hot-toast'

const SellerAddProduct = () => {
    const [images, setImages] = useState([null, null, null, null])
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')

    const handleImageChange = (index, e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const newImages = [...images]
                newImages[index] = reader.result
                setImages(newImages)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Add product logic here
        toast.success('Product added successfully!')
        // Reset form
        setImages([null, null, null, null])
        setProductName('')
        setDescription('')
        setCategory('')
        setPrice('')
        setOfferPrice('')
    }

    const categories = [
        'Vietnamese Fruits',
        'Imported Fruits',
        'Dried & Processed',
        'Gift Baskets',
        'Fresh Juices'
    ]

    return (
        <div className="py-8 px-6 md:px-12 bg-white min-h-[calc(100vh-73px)]">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Add New Product</h2>
            
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                {/* Product Images */}
                <div>
                    <label className="text-base font-semibold text-gray-700 mb-3 block">
                        Product Images
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                        {images.map((image, index) => (
                            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                <input 
                                    accept="image/*" 
                                    type="file" 
                                    id={`image${index}`} 
                                    hidden 
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-green-500 transition-colors overflow-hidden bg-gray-50">
                                    {image ? (
                                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl text-gray-400">+</span>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Product Name */}
                <div>
                    <label htmlFor="product-name" className="text-base font-semibold text-gray-700 mb-2 block">
                        Product Name
                    </label>
                    <input 
                        id="product-name" 
                        type="text" 
                        placeholder="Enter product name" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                        required 
                    />
                </div>

                {/* Product Description */}
                <div>
                    <label htmlFor="product-description" className="text-base font-semibold text-gray-700 mb-2 block">
                        Product Description
                    </label>
                    <textarea 
                        id="product-description" 
                        rows={4} 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none transition-all" 
                        placeholder="Enter product description"
                    />
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="text-base font-semibold text-gray-700 mb-2 block">
                        Category
                    </label>
                    <select 
                        id="category" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Price Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="product-price" className="text-base font-semibold text-gray-700 mb-2 block">
                            Original Price
                        </label>
                        <input 
                            id="product-price" 
                            type="number" 
                            placeholder="0" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="offer-price" className="text-base font-semibold text-gray-700 mb-2 block">
                            Selling Price
                        </label>
                        <input 
                            id="offer-price" 
                            type="number" 
                            placeholder="0" 
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="w-full outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button 
                        type="submit"
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                    >
                        ADD PRODUCT
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SellerAddProduct