// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useFetch from "../customhooks/useFetch";

export default function Products({ onOpenCart = () => {} }) {
     const [products, setProducts] = useState([]);
     const [data, error] = useFetch({tableName:"Products"});

     useEffect(() => {
          //console.log(data);
          setProducts(data)
     }, [data]);

     return (
          <section id="products" className="mt-10 mb-10 max-w-6xl mx-auto px-4">
               <h2 className="text-2xl font-bold mb-4 text-right font-title">
                    كل المنتجات
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((p) => (
                         <ProductCard
                              key={p.id}
                              product={p}
                              onOpenCart={onOpenCart}
                         />
                    ))}
               </div>
          </section>
     );
}
