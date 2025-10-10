import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets"
import ProductCard from "../components/ProductCard";    
const ProductDetails = () => {

    const {products = [], navigate, currency = '$', addToCart, formatCurrency} = useAppContext();
     const {id} = useParams();
     const [relatedProducts, setRelatedProducts] = useState([]);
     const [thumbnail, setThumbnail] = useState(null);
     const product = Array.isArray(products) ? products.find((item) => item._id === id) : undefined;

     useEffect(() => {
         if (product) {
             // prepare related products from same category (exclude current product)
             const productsCopy = (Array.isArray(products) ? products : []).filter((item) => item._id !== product._id && item.category === product.category );
             setRelatedProducts(productsCopy.slice(0,5));
         } else {
             setRelatedProducts([]);
         }
     }, [products, product]);

        useEffect(() => {
                        setThumbnail(product?.image && product.image.length ? product.image[0] : null);
        }, [product]);
    return product && (
        <div className="mt-12">
            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3 w-full">
                    <div className="flex flex-col gap-3">
                        {(product.image || []).map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-[96px] border-gray-500/30 rounded overflow-hidden cursor-pointer p-1 flex items-center justify-center" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className="h-20 object-contain" />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-[520px] w-full rounded overflow-hidden flex items-center justify-center">
                        <img src={thumbnail} alt="Selected product" className="w-full h-80 object-contain" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                               <img
                                   key={i}
                                   src={i<4 ? assets.star_icon : assets.star_dull_icon}
                                   alt=""
                                   className="md:w-4 w-3.5"
                               />
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">Original price: {formatCurrency(product.price)}</p>
                        <p className="text-2xl font-medium">Promotional price: {formatCurrency(product.offerPrice)}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row items-center mt-10 gap-4 text-base">
                        <button type="button" onClick={() => addToCart(product._id)} className="w-full sm:w-1/2 py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            Add to Cart
                        </button>
                        <button type="button" onClick={() => { addToCart(product._id); navigate('/cart') }} className="w-full sm:w-1/2 py-3.5 cursor-pointer font-medium bg-green-600 text-white hover:bg-green-700 transition">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/* related products */}
             <div className ="flex flex-col items-center mt-20">
                <div className = "flex flex-col items-center w-max">
                <p className = "text-3xl font-medium"> Related Products</p>
                <div className="w-20 h-0.5 bg-primary rounded-full mt-1"></div>
                 </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 w-full max-w-6xl">
                          {relatedProducts.filter((product) => product.inStock).map((product, index) => (
                                <ProductCard key={index} product={product} />
                          ))}
                      </div>
                      <button onClick={() => { navigate('/products'); scrollTo(0, 0) }}
                          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-green-600 hover:bg-green-50 transition">See more</button>
             </div>
        </div>
    );
};
export default ProductDetails