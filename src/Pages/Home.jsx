import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HotSelling from "../components/HotSelling";
import Offers from "../components/Offers";
import Products from "../components/Products";
import Footer from "../components/Footer";
import CartModal from "../components/CartModal";
import Cart from "../components/Cart";
export default function Home() {
     const [isCartOpen, setCartOpen] = useState(false);

     return (
          <div className="min-h-screen relative flex flex-col">
               <Navbar onOpenCart={() => setCartOpen(true)} />
               <main className="flex-1">
                    <Hero
                         title={"اكتشف احدث صحيات الموضة مع"}
                         strong={"رمز ليالي"}
                         subtitle={
                              "تسوق الآن تشكيلتنا من الملابس والعبايات. توصيل سريع وضمان جودة"
                         }
                         imgURL={
                              "https://i.postimg.cc/y6wjc9V6/forwebsitebanner2-1.png"
                         }
                    />
                    <div className="">
                         <HotSelling onOpenCart={() => setCartOpen(true)} />
                         <Offers onOpenCart={() => setCartOpen(true)} />
                         <Products onOpenCart={() => setCartOpen(true)} />
                    </div>
               </main>
               <Footer />
               <Cart onOpenCart={() => setCartOpen(true)} />
               <CartModal
                    isOpen={isCartOpen}
                    onClose={() => setCartOpen(false)}
               />
          </div>
     );
}
