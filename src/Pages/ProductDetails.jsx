import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Tag, ShoppingBag } from "lucide-react";
import { useParams } from "react-router-dom";
import useFetch from "../customhooks/useFetch";
import { Rating } from "@material-tailwind/react";
import Navbar from "./components/Navbar";
import React from "react";
import CartModal from "./components/CartModal";
import { useCart } from "./context/cartContext";
import { Loading } from "../admin/components/Loading";

const ProductDetail = () => {
     const { id } = useParams();
     const [currentImage, setCurrentImage] = useState(0);
     const [product, setProduct] = useState({
          name: "",
          price: "",
          description: "",
          offer_price: "",
          imageURL: "",
          category: "",
          colors: [],
          sizes: [],
          isOffer: false,
          isHot: false,
          available: true,
     });

     const [productData, productError, loading] = useFetch({
          tableName: "Products",
          selectStatment: `
      id, name,description, imgURL, price, category:categories(id), offer_price,
      isOffer, available, isHot,
      product_size(Sizes:size(size, id)),
      products_colors(Colors:color_id(color, ColorName,id))
    `,
          filter: "id",
          condition: id,
     });
     useEffect(() => {
          if (productData?.[0]) {
               const p = productData[0];
               setProduct({
                    name: p.name || "",
                    description: p.description || "",
                    price: p.price || "",
                    offer_price: p.offer_price || "",
                    imageURL: p.imgURL || "",
                    category: p.category?.id || "",
                    colors:
                         p.products_colors?.map((pc) => ({
                              name: pc.Colors.ColorName,
                              hex: pc.Colors.color,
                         })) || [],
                    sizes: p.product_size?.map((ps) => ps.Sizes.size) || [],
                    isOffer: p.isOffer || false,
                    isHot: p.isHot || false,
                    available: p.available ?? true,
               });
          }
     }, [productData]);

     console.log(product);

     const [isCartOpen, setCartOpen] = useState(false);

     const cart = useCart();

     const addToCart = () => {
          cart.addItem(product,selectedColor,selectedSize);
     };

     const buyNow = () => {
          cart.addItem(product);
          setCartOpen(true) // open cart for checkout
     };
     const [selectedColor ,setSelectedColor] = useState(null)
     const [selectedSize,setSelectedSize] = useState(null)

     return (
          <div>
               {loading && <Loading/>}
               <CartModal
                    isOpen={isCartOpen}
                    onClose={() => setCartOpen(false)}
               />
               <Navbar onOpenCart={() => setCartOpen(true)} />
               <div className="flex items-center pt-20 justify-center min-h-screen bg-gray-50">
                    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10 w-[90%] md:w-[900px]">
                         {/* Left: Product Images */}
                         <div className="displayimg flex flex-col items-center md:w-1/2">
                              <img
                                   src={product.imageURL}
                                   alt="Product"
                                   className="rounded-xl bg-blue-gray-50 w-80 h-96 object-contain"
                              />
                              <div className="flex gap-3 mt-4">
                                   <img
                                        src="https://placehold.co/600x400/blue/white"
                                        alt="thumb1"
                                        className="w-16 h-16 rounded-lg cursor-pointer border border-gray-200 hover:border-secondary-500"
                                   />
                              </div>
                         </div>

                         {/* Right: Product Details */}
                         <div className="flex flex-col justify-between md:w-1/2">
                              <div>
                                   <h2 className="text-2xl font-title font-semibold text-primary-600 mb-2">
                                        {product.name}
                                   </h2>
                                   
                                   <div className="flex items-center gap-2 mb-3">
                                        <Rating
                                             unratedColor="amber"
                                             ratedColor="amber"
                                             value={3}
                                        />
                                        <span className="text-gray-500 text-sm">
                                             (48 reviews)
                                        </span>
                                   </div>

                                   <div className="flex items-center gap-3 mb-4">
                                        {product.isOffer ? (
                                             <>
                                                  <span className="text-2xl font-semibold text-secondary-600">
                                                       {product.offer_price}
                                                  </span>
                                                  <span className="text-secondary-400 line-through">
                                                       {product.price}
                                                  </span>
                                                  <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                                                       20% OFF
                                                  </span>
                                             </>
                                        ) : (
                                             <span className="text-2xl font-semibold text-secondary-600">
                                                  {product.price}
                                             </span>
                                        )}
                                   </div>

                                   <p className="text-gray-600 font-subtitle mb-5">
                                        {product.description}
                                   </p>

                                   {/* Sizes */}
                                   <div className="mb-4">
                                        <h3 className="font-semibold font-subtitle text-gray-800 mb-2">
                                             المقاس
                                        </h3>
                                        <div className="flex gap-3">
                                             {product.sizes.map((size) => (
                                                  <button
                                                       key={size}
                                                       type="button"
                                                       onClick={() =>
                                                            setSelectedSize(size)
                                                       }
                                                       className={`py-3 flex-1 max-w-fit px-4 rounded-xl font-bold text-lg transition-all ${
                                                            selectedSize == size
                                                                 ? "bg-primary-300 text-white scale-95"
                                                                 : "bg-primary-100 text-gray-700 hover:bg-gray-200"
                                                       }`}
                                                  >
                                                       {size}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>

                                   {/* Colors */}
                                   <div className="mb-4">
                                        <h3 className="font-semibold font-subtitle text-gray-800 mb-2">
                                             اللون
                                        </h3>
                                        <div className="flex gap-3">
                                             {product.colors.map(({name,hex})=>{
                                                   return <button onClick={()=>setSelectedColor({name,hex})} className={`w-10 h-10 border-4 transition-colors duration-200 rounded-full ${selectedColor?.name==name ? "border-blue-700":""}`} key={name} style={{backgroundColor:hex}}></button>
                                             })}
                                        </div>
                                   </div>
                              </div>

                              {/* Buttons */}
                              <div className="flex gap-4 mt-5">
                                   <button onClick={addToCart} className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700">
                                        Add to Cart
                                   </button>
                                   <button  className="flex-1 border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-green-50">
                                        Buy Now
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default ProductDetail;
