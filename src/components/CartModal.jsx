// src/components/CartModal.jsx
import React, { useEffect, useState } from "react";
import { useCartState, useCart } from "../Pages/context/cartContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CartModal({ isOpen, onClose }) {
     const MySwal = withReactContent(Swal);
     const state = useCartState();
     const cart = useCart();
     const [form, setForm] = useState({ name: "", phone: "", address: "" });
     console.log(state);
     
     useEffect(() => {
          if (!isOpen) {
               // reset form if closed
               setForm({ name: "", phone: "", address: "" });
          }
     }, [isOpen]);

     const handleRemove = (id) => {
          cart.removeItem(id);
     };

     const handleSendWhatsApp = () => {
          if (state.items.length === 0) {
          Swal.fire({
               title: "خطأ!",
               text:"سلة التسوق فارغة",
               icon: "error",
          });
               return;
          }
          if (!form.name || !form.phone || !form.address) {
          Swal.fire({
               title: "خطأ!",
               text:"املأ جميع البيانات قبل الارسال",
               icon: "error",
          });
               return;
          }

          const lines = [
               `مرحبًا، أود إنشاء طلب:`,
               ...state.items.map(
                    (i) =>
                         `- ${i.product.name} (الكمية: ${i.qty}) => ${
                              i.qty * (i.product.isOffer ? i.product.offer_price : i.product.price)
                         } ر.س`
               ),
               `الإجمالي: ${cart.total()}جنيه`,
               `الاسم: ${form.name}`,
               `رقم الهاتف: ${form.phone}`,
               `العنوان: ${form.address}`,
          ];

          const message = encodeURIComponent(lines.join("\n"));
          const url = `https://wa.me/966545728523?text=${message}`; // not specifying number so opens generic chat selection
          window.open(url, "_blank");
     };

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
               <div
                    className="absolute inset-0 bg-black/40"
                    onClick={onClose}
               />
               <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                         <h3 className="text-lg font-semibold">عربة التسوق</h3>
                         <button onClick={onClose} className="text-gray-600">
                              إغلاق
                         </button>
                    </div>

                    <div className="p-4 max-h-[60vh] overflow-auto">
                         {state.items.length === 0 ? (
                              <div className="text-center py-10 text-gray-500">
                                   سلة التسوق فارغة
                              </div>
                         ) : (
                              <div className="space-y-4">
                                   {state.items.map((it) => (
                                        <div
                                             key={it.id}
                                             className="flex items-center justify-between bg-gray-50 p-3 rounded"
                                        >
                                             <div className="flex items-center gap-3">
                                                  <img
                                                       src={it.product.imgURL}
                                                       alt={it.product.name}
                                                       className="w-16 h-16 object-cover rounded"
                                                  />
                                                  <div className="text-right">
                                                       <div className="font-medium">
                                                            {it.product.name}
                                                       </div>
                                                       <div className="text-sm text-gray-600">
                                                            {it.product.isOffer ? it.product.offer_price : it.product.price}{" "}
                                                            جنيه
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                  <input
                                                       type="number"
                                                       min="1"
                                                       value={it.qty}
                                                       onChange={(e) =>
                                                            cart.updateQty(
                                                                 it.id,
                                                                 Math.max(
                                                                      1,
                                                                      Number(
                                                                           e
                                                                                .target
                                                                                .value ||
                                                                                1
                                                                      )
                                                                 )
                                                            )
                                                       }
                                                       className="w-16 text-center border rounded"
                                                  />
                                                  <div className="font-semibold">
                                                            {it.product.isOffer ? it.qty * it.product.offer_price : it.qty * it.product.price}{" "}{" "}
                                                       جنيه
                                                  </div>
                                                  <button
                                                       onClick={() =>
                                                            handleRemove(it.id)
                                                       }
                                                       className="text-red-600"
                                                  >
                                                       حذف
                                                  </button>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         )}
                    </div>

                    <div className="p-4 border-t">
                         <div className="mb-4">
                              <h4 className="font-semibold mb-2 text-right">
                                   معلومات العميل
                              </h4>
                              <div className="grid grid-cols-1 gap-2">
                                   <input
                                        placeholder="الاسم"
                                        value={form.name}
                                        onChange={(e) =>
                                             setForm((f) => ({
                                                  ...f,
                                                  name: e.target.value,
                                             }))
                                        }
                                        className="p-2 border rounded"
                                   />
                                   <input
                                        placeholder="رقم الهاتف"
                                        value={form.phone}
                                        onChange={(e) =>
                                             setForm((f) => ({
                                                  ...f,
                                                  phone: e.target.value,
                                             }))
                                        }
                                        className="p-2 border rounded"
                                   />
                                   <input
                                        placeholder="العنوان"
                                        value={form.address}
                                        onChange={(e) =>
                                             setForm((f) => ({
                                                  ...f,
                                                  address: e.target.value,
                                             }))
                                        }
                                        className="p-2 border rounded"
                                   />
                              </div>
                         </div>

                         <div className="flex items-center justify-between">
                              <div className="text-right">
                                   <div className="text-sm text-gray-600">
                                        الإجمالي:
                                   </div>
                                   <div className="text-lg font-bold">
                                        {cart.total()} جنيه
                                   </div>
                              </div>
                              <div className="flex gap-3">
                                   <button
                                        onClick={() => {
                                             cart.clear();
                                        }}
                                        className="px-4 py-2 border rounded"
                                   >
                                        تفريغ السلة
                                   </button>
                                   <button
                                        onClick={handleSendWhatsApp}
                                        className="px-4 py-2 bg-green-600 text-white rounded"
                                   >
                                        إرسال الطلب عبر واتساب
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
