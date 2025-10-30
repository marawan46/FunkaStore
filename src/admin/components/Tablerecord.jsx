import React from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Tablerecord = ({ product, idx, onDelete}) => {
     const {
          id,
          name,
          description,
          imgURL,
          category,
          product_size,
          products_colors,
          isOffer,
          offer_price,
          price,
          isHot,
          available,
     } = product;

     return (
          <tr
               key={id}
               className="hover:bg-gray-50 transition-colors duration-150"
          >
               <td className="px-4 py-3">{idx + 1}</td>
               <td className="px-4 py-3 flex items-center gap-3 justify-between">
                    <img
                         src={imgURL}
                         alt={name}
                         className="w-12 h-12 rounded-md object-cover border border-gray-200"
                    />
                    <span className="font-medium">{name}</span>
               </td>
               <td className="px-4 py-3">{price} ر.س</td>
               <td className="px-4 py-3">
                    {isOffer ? `${offer_price} ر.س` : "-"}
               </td>
               <td className="px-4 py-3">{category}</td>
               <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                         {products_colors.map(
                              ({ Colors: { color, ColorName } }, idx) => (
                                   <span
                                        key={ColorName}
                                        className="w-5 h-5 rounded-full border border-blue-600"
                                        style={{ backgroundColor: color }}
                                   ></span>
                              )
                         )}
                    </div>
               </td>

               <td className="px-4 py-3">{product_size.map(({Sizes:{size}})=>`${size}, `)}</td>

               <td className="px-4 py-3">
                    {available ? (
                         <span className="text-green-600 font-medium">
                              متاح
                         </span>
                    ) : (
                         <span className="text-red-500 font-medium">
                              غير متاح
                         </span>
                    )}
               </td>
               <td className="px-4 py-3 flex items-center justify-end gap-2">
                    <Link to={`productform/${id}`}>
                    <button
                         className="p-2 hover:bg-blue-100 text-blue-600 rounded-md"
                         title="تعديل"
                    >
                         <Pencil size={18} />
                    </button>
                    </Link>
                    <button
                         onClick={() => onDelete(id)}
                         className="p-2 hover:bg-red-100 text-red-600 rounded-md"
                         title="حذف"
                    >
                         <Trash2 size={18} />
                    </button>
               </td>
          </tr>
     );
};

export default Tablerecord;
