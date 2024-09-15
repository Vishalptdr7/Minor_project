import React from 'react'
import { categories } from '../utils/constants'
const Category = () => {
  return (
    <div className='bg-white shadow-2xl rounded-lg p-3 max-w-screen-lg mx-auto flex items-center mt-4 mb-2 border border-gray-300'>
  <div className='mx-auto'>
    {
      categories.map((ele, index) => (
        <button 
          key={index} 
          className='bg-gray-200 text-black m-1 p-2 rounded-lg font-sans text-sm font-bold hover:bg-gray-300'
        >
          {ele}
        </button>
      ))
    }
  </div>
</div>

  )
}

export default Category
