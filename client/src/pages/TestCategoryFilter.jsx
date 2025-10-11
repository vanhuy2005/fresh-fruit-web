import React from 'react'
import { dummyProducts } from '../assets/assets'

const TestCategoryFilter = () => {
  // Test filtering logic
  const testCategory = "vietnamese-fruits"
  
  const filtered = dummyProducts.filter((product) => {
    return product.categoryType && 
           product.categoryType.toLowerCase() === testCategory
  })
  
  // Count by category
  const byCategory = {
    'vietnamese-fruits': 0,
    'imported-fruits': 0,
    'gift-baskets': 0,
    'fresh-juices': 0,
    'processed-fruits': 0
  }
  
  dummyProducts.forEach(p => {
    if (p.categoryType) {
      const key = p.categoryType.toLowerCase()
      if (byCategory[key] !== undefined) {
        byCategory[key]++
      }
    }
  })
  
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Category Filter Test</h1>
      
      <div className='bg-gray-100 p-4 rounded mb-4'>
        <h2 className='font-bold mb-2'>Statistics:</h2>
        <p>Total Products: {dummyProducts.length}</p>
        <p>Vietnamese Fruits: {byCategory['vietnamese-fruits']}</p>
        <p>Imported Fruits: {byCategory['imported-fruits']}</p>
        <p>Gift Baskets: {byCategory['gift-baskets']}</p>
        <p>Fresh Juices: {byCategory['fresh-juices']}</p>
        <p>Processed Fruits: {byCategory['processed-fruits']}</p>
      </div>
      
      <div className='bg-blue-100 p-4 rounded mb-4'>
        <h2 className='font-bold mb-2'>Test Filter (vietnamese-fruits):</h2>
        <p>Found: {filtered.length} products</p>
      </div>
      
      <div className='grid grid-cols-3 gap-4'>
        {filtered.slice(0, 6).map((product, index) => (
          <div key={index} className='border p-3 rounded'>
            <p className='font-bold'>{product.name}</p>
            <p className='text-sm text-gray-600'>Type: {product.categoryType}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestCategoryFilter
