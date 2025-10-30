import React from 'react'

const SoldOut = () => {
  return (
<div className="absolute z-50 top-2 left-2 bg-gradient-to-r from-gray-600 to-gray-400 text-white px-4 py-2 rounded-xl shadow-lg font-subtitle font-bold text-sm tracking-wide flex flex-col items-center justify-center">
  <span>نفذت</span>
  <span>الكمية</span>
</div>
  )
}

export default SoldOut
