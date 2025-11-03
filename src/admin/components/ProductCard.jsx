import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({
     product: {
          id,
          name,
          imgURL,
          Categories,
          category,
          product_size,
          products_colors,
          isOffer,
          offer_price,
          price,
          isHot,
          available,
     },
     onDelete,
}) => {
     return (
          <div
               className={`flex items-center min-w-[500px] gap-3 p-3 border-b border-gray-100 rounded-md ${
                    !available ? "bg-gray-200 hover:!bg-gray-200" : ""
               } hover:bg-gray-50 transition-colors`}
          >
               {/* Product Image */}
               <img
                    src={imgURL}
                    alt={name}
                    className={`w-12 h-12 object-cover rounded-lg flex-shrink-0 ${
                    !available ? "filter saturate-0" : ""
               }`}
               />

               {/* Product Info */}
               <div className="flex-1 min-w-0">
                    <h3 className="flex  gap-4 text-sm font-semibold font-title text-gray-900 truncate">
                         {name}
                    <div className="Colors flex gap-2">
                         {products_colors.map(({Colors:{color,colorName}},idx)=>{return <div key={colorName} style={{backgroundColor:color}} className={`p-2 border-gray-500 rounded-full`}></div>})}
                    </div>
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-1">
                         <span className="text-xs text-gray-600">
                              {category?.name}
                         </span>
                         {isOffer && (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                                   عرض
                              </span>
                         )}
                         {isHot && (
                              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                                   الاكثر مبيعا
                              </span>
                         )}
                         {!available && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                              غير متاح
                              </span>
                         )}
                    <div className="sizes flex gap-2 font-subtitle text-sm">
                         {product_size.map(({Sizes:{size}},idx)=>{return <div key={size} className="p-1 border rounded-md">{size}</div>})}
                    </div>
                    </div>

               </div>

               {/* Price */}
               <div className="text-left flex-shrink-0">
                    {isOffer && offer_price ? (
                         <div>
                              <p className="text-sm font-bold text-green-600">
                                   {offer_price} ج.م
                              </p>
                              <p className="text-xs text-gray-400 line-through">
                                   {price} ج.م
                              </p>
                         </div>
                    ) : (
                         <p className="text-sm font-bold text-gray-900">
                              {price} ج.م
                         </p>
                    )}
               </div>

               {/* Actions */}
               <div className="flex items-center gap-2 flex-shrink-0">
                    <Link to={`productform/${id}`}>
                         <button
                              onClick={() => {
                                   /* navigate to edit */
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                         >
                              <Pencil size={16} />
                         </button>
                    </Link>
                    <button
                         onClick={() => onDelete(id)}
                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                         <Trash2 size={16} />
                    </button>
               </div>
          </div>
     );
};

export default ProductCard;
