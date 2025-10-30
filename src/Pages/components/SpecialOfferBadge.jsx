import React from 'react'
import { Percent } from 'lucide-react';


const SpecialOfferBadge = () => {
  return (
<div className="absolute top-5 right-[-40px] z-50 rotate-45">
  <div className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 
              text-white font-bold text-xs sm:text-sm md:text-base 
              px-10 py-1.5 shadow-lg ring-2 ring-white/30 select-none text-center">
    🔥 عرض خاص
  </div>
</div>
  )
}

export default SpecialOfferBadge
