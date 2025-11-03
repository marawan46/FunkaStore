// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/cartContext"
import SoldOut from "./SoldOut";
import SpecialOfferBadge from "./SpecialOfferBadge"
import { Link } from "react-router-dom";

export default function ProductCard({ product, onOpenCart = () => {} }) {
     const cart = useCart();

     const addToCart = () => {
          cart.addItem(product);
     };

     const buyNow = () => {
          cart.addItem(product);
          onOpenCart(); // open cart for checkout
     };

     return (
<Link to={`product/${product.id}`}>
<div
  dir="rtl"
  className="bg-white border-2 border-transparent hover:!border-amber-200 hover:cursor-pointer relative rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition h-[480px] md:h-[500px]"
>
  {!product.available && <SoldOut />}
  {product.isOffer && <SpecialOfferBadge />}

  {/* image section */}
  <div className="relative w-full h-[65%] bg-gray-50 overflow-hidden">
    <img
      src={product.imgURL}
      alt={product.name}
      className={
        product.available
          ? "absolute inset-0 w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
          : "absolute inset-0 filter saturate-0 w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
      }
      loading="lazy"
    />
  </div>

  {/* content section */}
  <div className="p-3 flex-1 flex flex-col justify-between">
    <div>
      <h3 className="text-start font-semibold text-gray-900 line-clamp-1 font-title">
        {product.name}
      </h3>

      {product.isOffer ? (
        <div className="offer flex gap-2 mt-1">
          <div className="text-gray-700 font-bold whitespace-nowrap font-subtitle">
            {product.offer_price} ر.س
          </div>
          <div className="text-gray-500 line-through font-subtitle text-sm">
            {product.price} ر.س
          </div>
        </div>
      ) : (
        <div className="text-gray-700 font-bold font-subtitle mt-1">
          {product.price} ر.س
        </div>
      )}

      <p className="text-xs text-gray-500 text-right mt-2 line-clamp-2 font-subtitle">
        {product.description}
      </p>
    </div>

    <div className="mt-3 flex gap-2">
      <button
        onClick={buyNow}
        disabled={!product.available}
        className="flex-1 px-2 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
      >
        اشترِ الآن
      </button>
      <button
        onClick={addToCart}
        disabled={!product.available}
        className="flex-1 px-2 py-1.5 border border-gray-300 text-sm rounded-md hover:bg-gray-100 transition"
      >
        أضف للعربة
      </button>
    </div>
  </div>
</div>
</Link>



     );
}
