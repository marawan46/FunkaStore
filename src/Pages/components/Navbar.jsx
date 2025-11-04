// src/components/Navbar.jsx
import { ShoppingBasket } from "lucide-react";
import React from "react";
import { useCartState, useCart } from "../context/cartContext";
import { Button, Collapse, IconButton } from "@material-tailwind/react";

export default function Navbar({ onOpenCart = () => {} }) {
     const state = useCartState();
     const cart = useCart();
     const count = cart ? cart.itemCount() : 0;
     const [openNav, setOpenNav] = React.useState(false);
     const navlist = (
                         <nav className="hidden md:flex gap-12 text-pink-200">
                              <a className="hover:bg-pink-100 px-5 py-2 hover:text-pink-400 transition-all duration-150 rounded-full" href="#hot">
                                   الأكثر مبيعًا
                              </a>
                              <a className="hover:bg-pink-100 px-5 py-2 hover:text-pink-400 transition-all duration-150 rounded-full" href="#offers">
                                   عروض
                              </a>
                              <a
                                   className="hover:bg-pink-100 px-5 py-2 hover:text-pink-400 transition-all duration-150 rounded-full"
                                   href="#products"
                              >
                                   منتجات
                              </a>
                         </nav>
     );
     return (
          <header className=" flex justify-center w-screen  mt-5 fixed z-[100]">
               <div className="max-w-6xl mx-auto px-4 py-4 font-title  rounded-full shadow-lg border border-gray-200 bg-gray-100/10 filter backdrop-blur-md w-[85%] flex items-center justify-between">

                         <div className="text-xl font-extrabold font-title w-10 hover:scale-125 transition-transform duration-200 rounded-full p-2 bg-pink-100">
                                        <img src="/bow.svg" className=""/>
                         </div>

                         <nav className="hidden md:flex gap-12 text-pink-200">
                              <a className="hover:bg-pink-100 px-5 py-2 hover:text-pink-400 transition-all duration-150 rounded-full" href="#hot">
                                   الأكثر مبيعًا
                              </a>
                              <a className="hover:bg-pink-100 px-5 py-2 hover:text-pink-400 transition-all duration-150 rounded-full" href="#offers">
                                   عروض
                              </a>
                              <a
                                   className="hover:bg-pink-100 px-5 py-2 hover:text-pink-400 transition-all duration-150 rounded-full"
                                   href="#products"
                              >
                                   منتجات
                              </a>
                         </nav>
                    

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
