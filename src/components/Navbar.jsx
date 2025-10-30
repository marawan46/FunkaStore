// src/components/Navbar.jsx
import { ShoppingBasket } from "lucide-react";
import React from "react";
import { useCartState, useCart } from "../Pages/context/cartContext";

export default function Navbar({ onOpenCart = () => {} }) {
     const state = useCartState();
     const cart = useCart();
     const count = cart ? cart.itemCount() : 0;

     return (
          <header className="bg-white shadow-lg fixed w-[100vw] z-[100]">
               <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                         <div className="text-xl font-extrabold font-title">
رمز ليالي
                         </div>
                         <nav className="hidden md:flex gap-6 text-gray-600">
                              <a className="hover:text-gray-900" href="#hot">
                                   الأكثر مبيعًا
                              </a>
                              <a className="hover:text-gray-900" href="#offers">
                                   عروض
                              </a>
                              <a
                                   className="hover:text-gray-900"
                                   href="#products"
                              >
                                   منتجات
                              </a>
                         </nav>
                    </div>

                    <div className="flex items-center gap-4">
                         <button
                              onClick={onOpenCart}
                              className="relative p-2 rounded-md hover:bg-gray-100"
                              aria-label="cart"
                         >
                              <ShoppingBasket className="w-6 h-6 text-gray-700" />
                              {count > 0 && (
                                   <span className="absolute -top-1 -left-1 rtl:left-auto rtl:-right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
                                        {count}
                                   </span>
                              )}
                         </button>
                    </div>
               </div>
          </header>
     );
}
