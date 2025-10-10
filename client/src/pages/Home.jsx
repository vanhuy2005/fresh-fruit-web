import React from 'react'
import MainBanner from '../components/Mainbanner'
import Categories from '../components/Categories'
import Bestseller from '../components/Bestseller'
import Bottombanner from '../components/Bottombanner'
import { useAppContext } from '../context/AppContext'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function Home() {
  const { user } = useAppContext()
  
  return (
    <div className="min-h-screen font-outfit">
      {/* Main Banner Section */}
      <MainBanner />
      
      {/* Categories Section */}
      <div className="-mt-4">
        <Categories />
      </div>
      
      {/* Best Sellers Section */}
      <div className="-mt-4">
        <Bestseller />
      </div>
      
      {/* Bottom Banner Section */}
      <div className="-mt-4">
        <Bottombanner />
      </div>

      {/* Newsletter Section */}
      <div className="-mt-8">
        <Newsletter />
      </div>

      <Footer />
      
    </div>
  )
}

export default Home