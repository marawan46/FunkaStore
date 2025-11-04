import React, { useState } from "react";
import Hero from "./sections/Hero";
import HotSelling from "./sections/HotSelling";
import Offers from "./sections/Offers";
import Products from "./sections/Products";
import Footer from "../Pages/components/Footer"
import CartModal from "./components/CartModal";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
export default function Home() {
     const [isCartOpen, setCartOpen] = useState(false);

     return (
          <div className="min-h-screen relative flex flex-col">
               <Navbar onOpenCart={() => setCartOpen(true)} />
               <main className="flex-1">
                    <Hero
                         title={"اكتشف احدث صيحات الموضة مع"}
                         strong={"فيونكه ستور 🎀"}
                         subtitle={
                              "تسوق الآن تشكيلتنا من الملابس والعبايات. توصيل سريع وضمان جودة"
                         }
                         img1={"https://i.postimg.cc/8kWGJv78/0E1A0426jpg.jpg"}
                         img2={"https://i.postimg.cc/2jvYbWVg/0E1A0037.jpg"}
                         img3={"https://i.postimg.cc/1Xp1Lkkp/0E1A0415.jpg"}
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
