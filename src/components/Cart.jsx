import React, { useState } from "react";
import { useCartState, useCart } from "../Pages/context/cartContext";
import { ShoppingBasket } from "lucide-react";
const Cart = ({ onOpenCart = () => {} }) => {
     const state = useCartState();
     const cart = useCart();
     const count = cart ? cart.itemCount() : 0;
     return (
          <div
               className={`fixed z-50 bottom-9 right-9 items-center justify-end gap-4 ${
                    count > 0 ? "animate-bounce" : ""
               }`}
          >
               <button
                    onClick={onOpenCart}
                    className="relative p-3  rounded-full bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow-xl transition duration-300 ease-in-out group"
                    aria-label="cart"
               >
                    <ShoppingBasket className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    {count > 0 && (
                         <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-white text-red-600 border border-red-600 rounded-full shadow-sm">
                              {count}
                         </span>
                    )}
               </button>
          </div>
     );
};

export default Cart;
