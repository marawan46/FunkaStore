// src/components/HotSelling.jsx
import React, { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import SectionBanner from "./SectionBanner";
import useFetch from "../../customhooks/useFetch";

export default function HotSelling({ onOpenCart = () => {} }) {
     const [hot, setHot] = useState([]);
     const [data, error] = useFetch({
          tableName: "Products",
          filter: "isHot",
          condition: true,
     });

     useEffect(() => {
          // console.log(data);
          setHot(data);
     }, [data]);

     if (!hot.length) return null;

     return (
          <section id="hot">
               <SectionBanner
                    title={" اكثر منتجاتنا مبيعا"}
                    icon={
                         <i className="fa-solid text-red-400 animate-bounce fa-arrow-trend-up"></i>
                    }
                    subtitle={"اكثر منتجاتنا مبيعا الان"}
                    imgURL={
                         "banner/forwebsitebanner1.png"
                    }
               />
               <ProductCarousel
                    title={"الاكثر مبيعا"}
                    products={hot}
                    id={"c1"}
                    onOpenCart={onOpenCart}
               />
          </section>
     );
}
