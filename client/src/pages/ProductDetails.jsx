import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets"
import ProductCard from "../components/ProductCard";
import toast from 'react-hot-toast'

const ProductDetails = () => {

    const {products = [], navigate, currency = '₫', addToCart, cartItems} = useAppContext();
     const {id} = useParams();
     const [relatedProducts, setRelatedProducts] = useState([]);
     const [displayCount, setDisplayCount] = useState(5);
     const [thumbnail, setThumbnail] = useState(null);
     const product = Array.isArray(products) ? products.find((item) => item._id === id) : undefined;

     // Format price with thousand separator
     const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
     }

     // Get cart item count
     const getCartItemCount = (itemId) => {
        return cartItems[itemId] || 0
     }

     const itemCount = getCartItemCount(product?._id)

     useEffect(() => {
         if (product) {
             // prepare related products from same category (exclude current product)
             const productsCopy = (Array.isArray(products) ? products : []).filter((item) => item._id !== product._id && item.category === product.category );
             setRelatedProducts(productsCopy);
             setDisplayCount(5); // Reset display count when product changes
         } else {
             setRelatedProducts([]);
         }
     }, [products, product]);

        useEffect(() => {
                        setThumbnail(product?.image && product.image.length ? product.image[0] : null);
        }, [product]);

     // Add to cart handler
     const handleAddToCart = () => {
        addToCart(product._id)
        toast.success("Added to cart!", {
            duration: 2000,
            style: {
                background: '#10b981',
                color: '#fff',
                fontWeight: '500'
            }
        })
     }

     // Buy now handler
     const handleBuyNow = () => {
        addToCart(product._id)
        navigate('/cart')
        window.scrollTo(0, 0)
     }

     // Load more related products
     const handleLoadMore = () => {
        setDisplayCount(prev => prev + 5)
     }

     // Get displayed products
     const displayedProducts = relatedProducts.filter(p => p.inStock).slice(0, displayCount)
     const hasMoreProducts = relatedProducts.filter(p => p.inStock).length > displayCount

    return product && (
        <div className="py-8 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600 mb-6 flex items-center gap-2">
                <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-green-600 transition-colors">Products</Link>
                <span>/</span>
                <span className="text-gray-400">{product.category}</span>
                <span>/</span>
                <span className="text-green-600 font-medium">{product.name}</span>
            </div>

            {/* Product Details Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Images Section */}
                    <div className="flex gap-4 lg:w-1/2">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-3">
                            {(product.image || []).map((image, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => setThumbnail(image)} 
                                    className={`border-2 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                                        thumbnail === image 
                                            ? 'border-green-500 shadow-md' 
                                            : 'border-gray-200 hover:border-green-300'
                                    }`}
                                >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 border-2 border-gray-200 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-6">
                            <img src={thumbnail} alt="Selected product" className="w-full h-full object-contain max-h-[500px]" />
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="lg:w-1/2 flex flex-col">
                        {/* Product Name */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-0.5">
                                {Array(5).fill('').map((_, i) => (
                                    <img
                                        key={i}
                                        src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                        alt="star"
                                        className="w-4 h-4"
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">(4)</span>
                        </div>

                        {/* Price Section */}
                        <div className="mb-6">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-sm text-gray-500">MRP:</span>
                                <span className="text-gray-400 line-through text-sm">{formatPrice(product.price)} VNĐ</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-medium text-gray-700">MRP:</span>
                                <span className="text-3xl font-bold text-green-600">{formatPrice(product.offerPrice)} VNĐ</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">(inclusive of all taxes)</p>
                        </div>

                        {/* About Product */}
                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-3">About Product</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1.5">
                                {product.description.map((desc, index) => (
                                    <li key={index} className="text-sm leading-relaxed">{desc}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                            <button 
                                type="button" 
                                onClick={handleAddToCart}
                                className="flex-1 py-3.5 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
                            >
                                Add to Cart
                            </button>
                            <button 
                                type="button" 
                                onClick={handleBuyNow}
                                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Buy now
                            </button>
                        </div>

                        {/* Cart Count Display */}
                        {itemCount > 0 && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                                <p className="text-sm text-green-700">
                                    <span className="font-bold">{itemCount}</span> {itemCount === 1 ? 'item' : 'items'} in cart
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Related Products</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
                    {relatedProducts.filter(p => p.inStock).length > 0 && (
                        <p className="text-gray-600 mt-3">
                            Showing {displayedProducts.length} of {relatedProducts.filter(p => p.inStock).length} products
                        </p>
                    )}
                </div>
                
                {displayedProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 max-w-7xl mx-auto">
                            {displayedProducts.map((product, index) => (
                                <ProductCard key={product._id || index} product={product} />
                            ))}
                        </div>

                        <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
                            {hasMoreProducts && (
                                <button 
                                    onClick={handleLoadMore}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-10 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Load More ({relatedProducts.filter(p => p.inStock).length - displayCount} remaining)
                                </button>
                            )}
                            <button 
                                onClick={() => { navigate('/products'); window.scrollTo(0, 0) }}
                                className="bg-white hover:bg-green-50 text-green-600 font-semibold px-10 py-3 rounded-lg border-2 border-green-500 hover:border-green-600 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                View All Products
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No related products found</p>
                        <button 
                            onClick={() => { navigate('/products'); window.scrollTo(0, 0) }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-10 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Browse All Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProductDetails