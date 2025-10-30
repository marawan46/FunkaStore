// src/components/ProductTable.jsx
import useFetch from "../customhooks/useFetch";
import { useEffect, useState } from "react";
import Tablerecord from "./components/Tablerecord";
const ProductTable = ({ products, onDelete }) => {
     return (
          <div className="overflow-x-auto w-full mt-6 pt-16 rounded-xl shadow-md border border-gray-100">
               <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-gray-900 text-xs uppercase font-semibold font-title">
                         <tr>
                              <th className="px-4 py-3 text-right">#</th>
                              <th className="px-4 py-3 text-right">المنتج</th>
                              <th className="px-4 py-3 text-right">السعر</th>
                              <th className="px-4 py-3 text-right">العرض</th>
                              <th className="px-4 py-3 text-right">التصنيف</th>
                              <th className="px-4 py-3 text-right">الالوان</th>
                              <th className="px-4 py-3 text-right">المقاسات</th>
                              <th className="px-4 py-3 text-right">متاح</th>
                              <th className="px-4 py-3 text-right">التحكم</th>
                         </tr>
                    </thead>
                    <tbody className="divide-y font-subtitle divide-gray-100 bg-white">
                         {products.map((p, index) => (
                              <Tablerecord
                                   key={p.id}
                                   product={p}
                                   idx={index}
                                   onDelete={onDelete}
                              />
                         ))}
                    </tbody>
               </table>
          </div>
     );
};

export default ProductTable;
