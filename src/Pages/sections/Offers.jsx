// src/components/Offers.jsx
import React, { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import SectionBanner from "./SectionBanner";
import useFetch from "../../customhooks/useFetch";

export default function Offers({ onOpenCart = () => {} }) {
     const [offers, setOffers] = useFetch({
          tableName: "Products",
          filter: "isOffer",
          condition: true,
     });
     const [products, setProducts] = useState([]);

     useEffect(() => {
          //console.log(offers);
          setProducts(offers);
     }, [offers]);

     if (!offers.length) return null;

     return (
          <section id="offers" className="mt-10">
               <SectionBanner
                    title={"🔥افضل العروض"}
                    subtitle={"اشتري بافضل الاسعار"}
                    imgURL={
                         "banner/forwebsitebanner12.png"
                    }
               />
               <ProductCarousel
                    title={"عروض خاصة"}
                    products={offers}
                    id={"c2"}
                    cardClass="border-2 border-amber-400"
                    onOpenCart={onOpenCart}
               />
          </section>
     );
}
